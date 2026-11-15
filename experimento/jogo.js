// Pinta Chão — experimento do Movimento 3 (tema 15: o navegador como console).
// Um jogo 3D multiplayer que é só um link: three.js (WebGPU, com volta automática
// para WebGL) e conexão direta entre navegadores via WebRTC (Trystero, sinalização
// pela rede Nostr). Não existe servidor de jogo.
//
// Parâmetros de URL:
//   ?sala=nome   escolhe a sala (padrão: "aula")
//   ?painel      abre como observador: não joga, vê o painel de dados e inicia rodadas
//   ?webgl       força o modo antigo (WebGL), para comparação
//   ?segundos=60 duração da rodada (só vale no painel; padrão 120)

import * as THREE from 'three';
import { joinRoom, selfId, getRelaySockets } from 'trystero';

const T0 = performance.now();                      // página começou a rodar
const params = new URLSearchParams(location.search);
const SALA = (params.get('sala') || 'aula').toLowerCase();
const OBSERVADOR = params.has('painel');
const N = 20;                                      // arena N x N ladrilhos
const VELOCIDADE = 6;                              // ladrilhos por segundo
const DURACAO_RODADA = (Number(params.get('segundos')) || 120) * 1000;

const $ = id => document.getElementById(id);
const agora = () => Math.round(performance.now() - T0);

// ---------- aparelho ----------
function descreverAparelho() {
  const ua = navigator.userAgent;
  let so = /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) ? 'iPad'
    : /Android/.test(ua) ? 'Android' : /Windows/.test(ua) ? 'Windows'
    : /Mac OS X/.test(ua) ? (navigator.maxTouchPoints > 1 ? 'iPad' : 'Mac')
    : /CrOS/.test(ua) ? 'ChromeOS' : /Linux/.test(ua) ? 'Linux' : 'outro';
  let nav = /SamsungBrowser/.test(ua) ? 'Samsung' : /Edg\//.test(ua) ? 'Edge'
    : /OPR\//.test(ua) ? 'Opera' : /Firefox|FxiOS/.test(ua) ? 'Firefox'
    : /CriOS|Chrome/.test(ua) ? 'Chrome' : /Safari/.test(ua) ? 'Safari' : 'outro';
  const velocidadeEstimada = navigator.connection?.effectiveType || null;   // estimativa do Chrome, não é o tipo de rede
  return { so, nav, velocidadeEstimada, tela: `${screen.width}x${screen.height}`, toque: navigator.maxTouchPoints > 0 };
}
const aparelho = descreverAparelho();

// ---------- cor e nome ----------
function corDe(id) {
  let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return new THREE.Color().setHSL((h % 360) / 360, 0.75, 0.55);
}

// ---------- cena 3D ----------
const renderer = new THREE.WebGPURenderer({ antialias: true, forceWebGL: params.has('webgl') });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
$('cena').appendChild(renderer.domElement);
let backend = 'carregando';
try {
  await renderer.init();
  backend = renderer.backend.isWebGPUBackend ? 'WebGPU' : 'WebGL';
} catch (e) {
  backend = 'falhou';
  console.error(e);
}
let gpu = null;
try { const a = await navigator.gpu?.requestAdapter(); if (a) gpu = a.info?.vendor || 'sim'; } catch {}

const cena = new THREE.Scene();
cena.background = new THREE.Color(0x0e1116);
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 200);
cena.add(new THREE.HemisphereLight(0xffffff, 0x223344, 1.6));
const sol = new THREE.DirectionalLight(0xffffff, 2.2); sol.position.set(6, 14, 8); cena.add(sol);

const COR_VAZIA = new THREE.Color(0x2a313b);
const ladrilhos = new THREE.InstancedMesh(
  new THREE.BoxGeometry(0.94, 0.25, 0.94),
  new THREE.MeshStandardMaterial({ roughness: 0.6 }),
  N * N
);
const tmp = new THREE.Object3D();
for (let i = 0; i < N * N; i++) {
  tmp.position.set((i % N) - N / 2 + 0.5, -0.125, Math.floor(i / N) - N / 2 + 0.5);
  tmp.updateMatrix();
  ladrilhos.setMatrixAt(i, tmp.matrix);
  ladrilhos.setColorAt(i, COR_VAZIA);
}
cena.add(ladrilhos);
const dono = new Array(N * N).fill(null);           // peerId de quem pintou cada ladrilho

function enquadrar() {
  camera.aspect = innerWidth / innerHeight;
  // afasta a câmera em telas estreitas (celular em pé) para caber a arena inteira
  const d = N * (camera.aspect < 1 ? 1.55 / camera.aspect : 1.25);
  camera.position.set(0, d * 0.85, d * 0.55);
  camera.lookAt(0, 0, 0.8);
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
enquadrar();
addEventListener('resize', enquadrar);

// ---------- jogadores ----------
const jogadores = new Map();   // id -> {nome, cor, mesh, etiqueta, x, z, vx, vz, info}
const geoBola = new THREE.SphereGeometry(0.42, 24, 16);

function criarJogador(id, nome) {
  if (jogadores.has(id)) { const j = jogadores.get(id); if (nome) { j.nome = nome; j.etiqueta.textContent = nome; } return j; }
  const cor = corDe(id);
  const mesh = new THREE.Mesh(geoBola, new THREE.MeshStandardMaterial({ color: cor, roughness: 0.3 }));
  mesh.position.y = 0.42;
  mesh.visible = false;
  cena.add(mesh);
  const etiqueta = document.createElement('div');
  etiqueta.className = 'nome';
  etiqueta.style.color = '#' + cor.getHexString();
  etiqueta.textContent = nome || '…';
  document.body.appendChild(etiqueta);
  const j = { id, nome: nome || '…', cor, mesh, etiqueta, x: 0, z: 0, vx: 0, vz: 0, info: null };
  jogadores.set(id, j);
  return j;
}
function removerJogador(id) {
  const j = jogadores.get(id); if (!j) return;
  cena.remove(j.mesh); j.etiqueta.remove(); jogadores.delete(id);
}

function pintar(id, x, z) {
  const cx = Math.floor(x + N / 2), cz = Math.floor(z + N / 2);
  if (cx < 0 || cz < 0 || cx >= N || cz >= N) return;
  const i = cz * N + cx;
  if (dono[i] === id) return;
  dono[i] = id;
  const j = jogadores.get(id);
  ladrilhos.setColorAt(i, j ? j.cor : corDe(id));
  ladrilhos.instanceColor.needsUpdate = true;
}
function limparArena() {
  dono.fill(null);
  for (let i = 0; i < N * N; i++) ladrilhos.setColorAt(i, COR_VAZIA);
  ladrilhos.instanceColor.needsUpdate = true;
}
function copiarChao(donos) {
  donos.forEach((id, i) => { dono[i] = id; ladrilhos.setColorAt(i, id ? corDe(id) : COR_VAZIA); });
  ladrilhos.instanceColor.needsUpdate = true;
}
function contagem() {
  const c = new Map();
  for (const d of dono) if (d) c.set(d, (c.get(d) || 0) + 1);
  return [...c.entries()].sort((a, b) => b[1] - a[1]);
}

// ---------- rede ----------
let sala = null, acoes = null;
const falhas = [];                 // erros de conexão vistos por este navegador
let tPrimeiroPar = null;           // ms até ver o primeiro outro navegador
let tClicouEntrar = null;

function conectar() {
  sala = joinRoom({ appId: 'tmi-ufpe-jcsc-pinta-chao' }, SALA, {
    onJoinError: d => {
      falhas.push({ t: agora(), par: d.peerId, erro: String(d.error).slice(0, 120) });
      registrar(`falha de conexão com ${nomeDe(d.peerId)}: ${String(d.error).slice(0, 80)}`, 'ruim');
    }
  });
  const quem = sala.makeAction('quem');     // {nome, obs, aparelho, backend, gpu, tEntrar}
  const pos = sala.makeAction('pos');       // [x, z]
  const rodada = sala.makeAction('rodada'); // {fimEm, donos?}
  const diag = sala.makeAction('diag');     // {pares, falhas, fps, relays}
  const chao = sala.makeAction('chao');     // {donos, final?} — o observador é o árbitro do placar
  acoes = { quem, pos, rodada, diag, chao };
  chao.onMessage = (d) => {
    if (OBSERVADOR) return;
    copiarChao(d.donos);
    if (d.final) { fimRodada = null; mostrarFim(); }
  };

  sala.onPeerJoin = id => {
    if (tPrimeiroPar === null) tPrimeiroPar = agora();
    if (eu || OBSERVADOR) quem.send(meuQuem(), { target: id });   // quem ainda está na tela do apelido se anuncia ao clicar Entrar
    if (OBSERVADOR && fimRodada) {
      rodada.send({ fimEm: fimRodada - Date.now(), donos: dono }, { target: id });
    }
    atualizarStatus();
  };
  sala.onPeerLeave = id => {
    const j = jogadores.get(id);
    registrar(`${j ? j.nome : id.slice(0, 5)} saiu`);
    if (OBSERVADOR && j?.info) j.info.saiu = agora();
    if (!OBSERVADOR) removerJogador(id); else { j && (j.mesh.visible = false); }
    atualizarStatus(); atualizarPainel();
  };
  quem.onMessage = (d, { peerId }) => {
    if (d.obs) { observadores.add(peerId); atualizarStatus(); return; }
    const j = criarJogador(peerId, d.nome);
    j.info = { ...d, chegouAqui: agora(), saiu: null };
    registrar(`${d.nome} entrou · ${d.aparelho.so}/${d.aparelho.nav} · ${d.backend} · ${seg(d.tEntrar)} até ver alguém`, 'bom');
    atualizarStatus(); atualizarPainel();
  };
  pos.onMessage = ([x, z], { peerId }) => {
    const j = jogadores.get(peerId) || criarJogador(peerId);
    j.x = x; j.z = z; j.mesh.visible = true;
    if (rodadaAtiva() || fimRodada === null) pintar(peerId, x, z);   // fora de rodada: pintura livre
  };
  rodada.onMessage = (d) => {
    fimRodada = Date.now() + d.fimEm;
    if (d.donos) copiarChao(d.donos);   // chegou no meio: copia o chão
    else limparArena();
    $('fim').style.display = 'none';
  };
  diag.onMessage = (d, { peerId }) => {
    const j = jogadores.get(peerId); if (j?.info) j.info.diag = d;
  };
}
const observadores = new Set();
function nomeDe(id) { return jogadores.get(id)?.nome || (id ? id.slice(0, 5) : '?'); }

let meuNome = '';
function meuQuem() {
  return { nome: meuNome, obs: OBSERVADOR, aparelho, backend, gpu,
           tEntrar: tPrimeiroPar, tClicou: tClicouEntrar };
}

// ---------- rodada ----------
let fimRodada = null;
const rodadaAtiva = () => fimRodada !== null && Date.now() < fimRodada;

function iniciarRodada() {
  fimRodada = Date.now() + DURACAO_RODADA;
  limparArena();
  acoes.rodada.send({ fimEm: DURACAO_RODADA });
  registrar('▶ rodada iniciada');
}

// ---------- controles ----------
const teclas = new Set();
addEventListener('keydown', e => teclas.add(e.key.toLowerCase()));
addEventListener('keyup', e => teclas.delete(e.key.toLowerCase()));
let toque = null;   // {x0, y0, dx, dy}
const manche = $('manche');
addEventListener('pointerdown', e => {
  if (e.pointerType === 'mouse' || OBSERVADOR || !eu) return;
  toque = { x0: e.clientX, y0: e.clientY, dx: 0, dy: 0, id: e.pointerId };
  manche.style.display = 'block'; manche.style.left = e.clientX + 'px'; manche.style.top = e.clientY + 'px';
});
addEventListener('pointermove', e => {
  if (!toque || e.pointerId !== toque.id) return;
  toque.dx = e.clientX - toque.x0; toque.dy = e.clientY - toque.y0;
  const m = Math.min(1, Math.hypot(toque.dx, toque.dy) / 50), a = Math.atan2(toque.dy, toque.dx);
  manche.firstElementChild.style.transform = `translate(calc(-50% + ${Math.cos(a) * m * 34}px), calc(-50% + ${Math.sin(a) * m * 34}px))`;
});
const soltar = e => { if (toque && e.pointerId === toque.id) { toque = null; manche.style.display = 'none'; } };
addEventListener('pointerup', soltar); addEventListener('pointercancel', soltar);

function direcao() {
  let x = 0, z = 0;
  if (teclas.has('arrowleft') || teclas.has('a')) x -= 1;
  if (teclas.has('arrowright') || teclas.has('d')) x += 1;
  if (teclas.has('arrowup') || teclas.has('w')) z -= 1;
  if (teclas.has('arrowdown') || teclas.has('s')) z += 1;
  if (toque) { const m = Math.hypot(toque.dx, toque.dy); if (m > 8) { x = toque.dx / Math.max(m, 50); z = toque.dy / Math.max(m, 50); } }
  const m = Math.hypot(x, z); if (m > 1) { x /= m; z /= m; }
  return [x, z];
}

// ---------- laço principal ----------
let eu = null, ultimoEnvio = 0, ultimo = performance.now(), quadros = 0, fps = 0, tFps = performance.now();
const v = new THREE.Vector3();

renderer.setAnimationLoop(() => {
  const t = performance.now(), dt = Math.min(0.05, (t - ultimo) / 1000); ultimo = t;
  quadros++; if (t - tFps > 1000) { fps = Math.round(quadros * 1000 / (t - tFps)); quadros = 0; tFps = t; }

  if (eu) {
    const [dx, dz] = direcao();
    const lim = N / 2 - 0.45;
    eu.x = Math.max(-lim, Math.min(lim, eu.x + dx * VELOCIDADE * dt));
    eu.z = Math.max(-lim, Math.min(lim, eu.z + dz * VELOCIDADE * dt));
    if (rodadaAtiva() || fimRodada === null) pintar(eu.id, eu.x, eu.z);
    if (t - ultimoEnvio > 66) { acoes.pos.send([+eu.x.toFixed(2), +eu.z.toFixed(2)]); ultimoEnvio = t; }
  }
  for (const j of jogadores.values()) {
    // remotos: suaviza o movimento entre as mensagens; local: posição exata
    const k = j === eu ? 1 : Math.min(1, dt * 12);
    j.mesh.position.x += (j.x - j.mesh.position.x) * k;
    j.mesh.position.z += (j.z - j.mesh.position.z) * k;
    v.set(j.mesh.position.x, 1.05, j.mesh.position.z).project(camera);
    j.etiqueta.style.display = j.mesh.visible ? 'block' : 'none';
    j.etiqueta.style.left = ((v.x + 1) / 2 * innerWidth) + 'px';
    j.etiqueta.style.top = ((1 - v.y) / 2 * innerHeight) + 'px';
  }

  if (fimRodada !== null) {
    const r = fimRodada - Date.now();
    $('relogio').textContent = r > 0 ? `${Math.floor(r / 60000)}:${String(Math.floor(r / 1000) % 60).padStart(2, '0')}` : '';
    // quem decide o fim é o observador (manda o chão final); jogadores só esperam, com 3s de folga
    if (OBSERVADOR && r <= 0) { fimRodada = null; acoes.chao.send({ donos: dono, final: true }); mostrarFim(); }
    else if (!OBSERVADOR && r <= -3000) { fimRodada = null; mostrarFim(); }
  }
  renderer.render(cena, camera);
});

setInterval(() => {
  atualizarPlacar();
  if (!acoes) return;
  const pares = Object.keys(sala.getPeers());
  let relays = 0; try { relays = Object.values(getRelaySockets()).filter(s => s.readyState === 1).length; } catch {}
  acoes.diag.send({ pares, falhas: falhas.length, fps, relays, backend });
  if (!OBSERVADOR && pares.length === 0 && agora() > 25_000) {
    mostrarAviso(relays === 0
      ? 'Não consegui falar com a rede de sinalização. Avise no chat da chamada: seu aparelho e se está no Wi-Fi ou 4G.'
      : 'Ainda sozinho aqui… se ninguém aparecer, avise no chat da chamada: seu aparelho e se está no Wi-Fi ou 4G.');
  } else mostrarAviso(null);
  atualizarStatus();
  if (OBSERVADOR) {
    if (rodadaAtiva()) acoes.chao.send({ donos: dono });   // corrige diferenças de ordem das mensagens
    for (const id of pares) sala.ping(id).then(ms => { const j = jogadores.get(id); if (j?.info) j.info.ping = ms; }).catch(() => {});
    atualizarPainel();
  }
}, 2000);

// ---------- interface ----------
function mostrarAviso(txt) { $('aviso').style.display = txt ? 'block' : 'none'; if (txt) $('aviso').textContent = txt; }
function atualizarStatus() {
  if (!sala) return;
  const n = Object.keys(sala.getPeers()).length;
  $('status').textContent = `sala "${SALA}" · ${n} conectado${n === 1 ? '' : 's'} · 3D em ${backend}`;
}
function atualizarPlacar() {
  $('placar').innerHTML = contagem().slice(0, 6).map(([id, n]) =>
    `<div><span style="color:#${corDe(id).getHexString()}">${esc(nomeDe(id))}</span><b>${n}</b></div>`).join('');
}
function mostrarFim() {
  const c = contagem();
  registrar('■ fim da rodada: ' + c.map(([id, n]) => `${nomeDe(id)} ${n}`).join(', '));
  $('ranking').innerHTML = c.map(([id, n]) => `<li><span style="color:#${corDe(id).getHexString()}">${esc(nomeDe(id))}</span> — ${n} ladrilho${n === 1 ? "" : "s"}</li>`).join('') || '<li>ninguém pintou nada</li>';
  if (!OBSERVADOR) $('fim').style.display = 'flex';
  if (OBSERVADOR) dados.rodadas.push({ fim: new Date().toISOString(), placar: c.map(([id, n]) => ({ nome: nomeDe(id), ladrilhos: n })) });
}
$('fecharFim').onclick = () => { $('fim').style.display = 'none'; };
const seg = ms => ms == null ? '–' : (ms / 1000).toFixed(1) + 's';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------- painel do observador ----------
const dados = { sala: SALA, inicio: new Date().toISOString(), eventos: [], rodadas: [] };
function registrar(txt, cls) {
  const hora = new Date().toLocaleTimeString('pt-BR');
  dados.eventos.push({ hora: new Date().toISOString(), txt });
  if (!OBSERVADOR) return;
  const el = document.createElement('div'); el.textContent = `${hora}  ${txt}`; if (cls) el.className = cls;
  $('log').prepend(el);
  try { localStorage.setItem('pinta-chao-' + SALA, JSON.stringify(exportar())); } catch {}
}
function exportar() {
  return { ...dados, fim: new Date().toISOString(),
    jogadores: [...jogadores.values()].map(j => ({ nome: j.nome, ...j.info })),
    falhasVistasPeloObservador: falhas };
}
function atualizarPainel() {
  const js = [...jogadores.values()].filter(j => j.info);
  const ativos = js.filter(j => !j.info.saiu);
  $('rConectados').textContent = ativos.length;
  const wg = js.filter(j => j.info.backend === 'WebGPU').length;
  $('rWebgpu').textContent = js.length ? `${wg}/${js.length}` : '–';
  const nFalhas = falhas.length + js.reduce((s, j) => s + (j.info.diag?.falhas || 0), 0);
  $('rFalhas').textContent = nFalhas;
  const total = ativos.length + observadores.size;   // todos os outros navegadores que o observador vê
  $('tabela').innerHTML = js.map(j => {
    const i = j.info, d = i.diag || {};
    const ve = d.pares ? d.pares.length : '?';
    return `<tr${i.saiu ? ' style="opacity:.45"' : ''}>
      <td style="color:#${j.cor.getHexString()}">${esc(j.nome)}</td>
      <td>${esc(i.aparelho.so)} / ${esc(i.aparelho.nav)}</td>
      <td class="${i.backend === 'WebGPU' ? 'bom' : 'ruim'}">${esc(i.backend)}</td>
      <td>${seg(i.tEntrar)}</td>
      <td class="${ve !== '?' && ve < total ? 'ruim' : ''}">${ve}/${total}</td>
      <td>${i.ping != null ? Math.round(i.ping) + 'ms' : '–'}</td>
      <td>${d.fps ?? '–'}</td></tr>`;
  }).join('');
}

// ---------- início ----------
$('dica').textContent = aparelho.toque ? 'arraste o dedo para andar' : 'setas ou WASD para andar';
if (OBSERVADOR) {
  $('entrada').style.display = 'none';
  $('painel').style.display = 'block';
  document.body.classList.add('observando');
  $('nomeSala').textContent = SALA;
  $('dica').textContent = 'modo observador · tecla P mostra/oculta o painel';
  $('iniciar').onclick = iniciarRodada;
  $('iniciar').textContent = `Iniciar rodada (${DURACAO_RODADA / 1000}s)`;
  const painelVisivel = v => { $('painel').style.display = v ? 'block' : 'none'; $('mostrarPainel').style.display = v ? 'none' : 'block'; document.body.classList.toggle('observando', v); };
  $('mostrarPainel').onclick = () => painelVisivel(true);
  $('ocultar').onclick = () => painelVisivel(false);
  addEventListener('keydown', e => { if (e.key === 'p') painelVisivel($('painel').style.display === 'none'); });
  $('baixar').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(exportar(), null, 2)], { type: 'application/json' }));
    a.download = `pinta-chao-${SALA}-${new Date().toISOString().slice(0, 16).replace(':', 'h')}.json`;
    a.click();
  };
  registrar(`observador abriu a sala "${SALA}" · 3D em ${backend}`);
  conectar();
} else {
  // o jogador já entra na rede enquanto digita o apelido: o tempo até conectar começa no carregamento
  conectar();
  try { $('apelido').value = localStorage.getItem('pinta-chao-apelido') || ''; } catch {}
  const entrar = () => {
    meuNome = ($('apelido').value.trim() || 'anônimo').slice(0, 14);
    try { localStorage.setItem('pinta-chao-apelido', meuNome); } catch {}
    tClicouEntrar = agora();
    eu = criarJogador(selfId, meuNome);
    eu.mesh.visible = true;
    eu.x = (Math.random() - 0.5) * (N - 4); eu.z = (Math.random() - 0.5) * (N - 4);
    $('entrada').style.display = 'none';
    acoes.quem.send(meuQuem());   // avisa quem já está conectado
  };
  $('entrar').onclick = entrar;
  $('entrar').disabled = false;
  $('entrar').textContent = 'Entrar';
  $('apelido').addEventListener('keydown', e => { if (e.key === 'Enter') entrar(); });
}
atualizarStatus();
