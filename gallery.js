import * as THREE from 'three';
import { PAINTINGS } from './paintings.js?v=11';

// ═══════════════════════════════════════════════════════════════════════════
//  THE GRAND GALLERY — a first-person walkable 3D art museum
// ═══════════════════════════════════════════════════════════════════════════

const canvas = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2efe9);          // bright warm-white
scene.fog = new THREE.Fog(0xf2efe9, 35, 80);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
const EYE = 1.65;            // eye height (m)
camera.position.set(0, EYE, 16);

// ── Gallery dimensions ─────────────────────────────────────────────────────
// A long central hall. Paintings line both long walls, 5 per side.
const HALL_W = 12;          // width (x)
const HALL_H = 6;           // height (y)
const SLOT = 8;             // spacing between paintings along the hall
const PER_SIDE = 5;
const HALL_L = SLOT * PER_SIDE;   // length (z) = 40
const HALF_L = HALL_L / 2;

// ───────────────────────────────────────────────────────────────────────────
//  MATERIALS & TEXTURES
// ───────────────────────────────────────────────────────────────────────────
function makeFloorTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 512;
  const x = c.getContext('2d');
  x.fillStyle = '#e6e2da'; x.fillRect(0, 0, 512, 512);
  // marble-ish veining
  for (let i = 0; i < 40; i++) {
    x.strokeStyle = `rgba(${150 + Math.random()*40},${145 + Math.random()*30},${135 + Math.random()*25},0.25)`;
    x.lineWidth = Math.random() * 2;
    x.beginPath();
    let px = Math.random() * 512, py = Math.random() * 512;
    x.moveTo(px, py);
    for (let j = 0; j < 6; j++) { px += (Math.random()-0.5)*180; py += (Math.random()-0.5)*180; x.lineTo(px, py); }
    x.stroke();
  }
  // tile grout
  x.strokeStyle = 'rgba(120,115,105,0.4)'; x.lineWidth = 3;
  x.strokeRect(2, 2, 508, 508);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeWallTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#faf8f4'); g.addColorStop(1, '#ece8e0');   // gallery white
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 1200; i++) {
    x.fillStyle = `rgba(0,0,0,${Math.random()*0.02})`;
    x.fillRect(Math.random()*256, Math.random()*256, 2, 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const floorTex = makeFloorTexture();
floorTex.repeat.set(8, 24);
const wallTex = makeWallTexture();
wallTex.repeat.set(4, 2);

const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.25, metalness: 0.1 });
const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.92, metalness: 0.0 });
const ceilMat = new THREE.MeshStandardMaterial({ color: 0xf6f3ee, roughness: 1.0 });
const trimMat = new THREE.MeshStandardMaterial({ color: 0xb89a55, roughness: 0.4, metalness: 0.6 });

// ── Floor ──
const floor = new THREE.Mesh(new THREE.PlaneGeometry(HALL_W, HALL_L), floorMat);
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
scene.add(floor);

// ── Ceiling ──
const ceil = new THREE.Mesh(new THREE.PlaneGeometry(HALL_W, HALL_L), ceilMat);
ceil.rotation.x = Math.PI / 2; ceil.position.y = HALL_H;
scene.add(ceil);

// ── Walls (long sides + two ends) ──
function addWall(w, h, x, y, z, ry) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
  m.position.set(x, y, z); m.rotation.y = ry; m.receiveShadow = true;
  scene.add(m);
  return m;
}
addWall(HALL_L, HALL_H, -HALL_W/2, HALL_H/2, 0,  Math.PI/2);   // left wall
addWall(HALL_L, HALL_H,  HALL_W/2, HALL_H/2, 0, -Math.PI/2);   // right wall
addWall(HALL_W, HALL_H, 0, HALL_H/2, -HALF_L, 0);              // far end
addWall(HALL_W, HALL_H, 0, HALL_H/2,  HALF_L, Math.PI);        // near end (behind start)

// ── Baseboard + crown trim along long walls ──
function addTrimStrip(x, ry) {
  for (const yy of [0.12, HALL_H - 0.12]) {
    const t = new THREE.Mesh(new THREE.BoxGeometry(HALL_L, 0.22, 0.08), trimMat);
    t.position.set(x, yy, 0); t.rotation.y = ry; scene.add(t);
  }
}
addTrimStrip(-HALL_W/2 + 0.04, 0);
addTrimStrip( HALL_W/2 - 0.04, 0);

// ───────────────────────────────────────────────────────────────────────────
//  LIGHTING
// ───────────────────────────────────────────────────────────────────────────
scene.add(new THREE.AmbientLight(0xffffff, 0.85));
const hemi = new THREE.HemisphereLight(0xffffff, 0xdedad2, 0.9);
scene.add(hemi);

// Even ceiling fill — a row of soft overhead lights down the hall
for (let i = 0; i < PER_SIDE; i++) {
  const z = HALF_L - SLOT/2 - i * SLOT;
  const fill = new THREE.PointLight(0xfff6e8, 0.55, 26, 1.4);
  fill.position.set(0, HALL_H - 0.5, z);
  scene.add(fill);
  // visible recessed light fixture
  const fixture = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 24),
    new THREE.MeshStandardMaterial({ color: 0xfff8ee, emissive: 0xfff2dc, emissiveIntensity: 0.8, roughness: 1 })
  );
  fixture.rotation.x = Math.PI / 2; fixture.position.set(0, HALL_H - 0.02, z);
  scene.add(fixture);
}
// gentle directional key for soft shadows / depth
const key = new THREE.DirectionalLight(0xffffff, 0.4);
key.position.set(4, HALL_H + 4, HALF_L);
scene.add(key);

// ───────────────────────────────────────────────────────────────────────────
//  PAINTINGS — placement + framed canvases + spotlights
// ───────────────────────────────────────────────────────────────────────────
const loader = new THREE.TextureLoader();
loader.setCrossOrigin('anonymous');
const interactables = [];     // meshes the raycaster can hit
const loadedImages = {};      // id -> HTMLImageElement (for closeups)

// progress tracking
let toLoad = PAINTINGS.length, loaded = 0;
const loadbar = document.getElementById('loadbar');
const loadpct = document.getElementById('loadpct');
const enterBtn = document.getElementById('enter-btn');
function bumpProgress() {
  loaded++;
  const pct = Math.round((loaded / toLoad) * 100);
  loadbar.style.width = pct + '%';
  loadpct.textContent = `Loading the collection… ${pct}%`;
  if (loaded >= toLoad) {
    loadpct.textContent = 'The gallery awaits.';
    enterBtn.classList.add('ready');
  }
}

function placeholderTexture(p) {
  // Elegant fallback if a Wikimedia image fails to load.
  const c = document.createElement('canvas'); c.width = 600; c.height = 800;
  const x = c.getContext('2d');
  x.fillStyle = p.color || '#3a332a'; x.fillRect(0, 0, 600, 800);
  const g = x.createRadialGradient(300, 360, 60, 300, 360, 520);
  g.addColorStop(0, 'rgba(255,255,255,0.10)'); g.addColorStop(1, 'rgba(0,0,0,0.45)');
  x.fillStyle = g; x.fillRect(0, 0, 600, 800);
  x.fillStyle = '#e8dcc0'; x.textAlign = 'center';
  x.font = 'italic 40px Georgia';
  wrapText(x, p.title, 300, 360, 500, 48);
  x.font = '24px Georgia'; x.fillStyle = '#cabfa0';
  x.fillText(p.artist, 300, 470);
  x.strokeStyle = 'rgba(232,220,192,0.4)'; x.lineWidth = 4;
  x.strokeRect(40, 40, 520, 720);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter;
  return t;
}
function wrapText(ctx, text, cx, cy, maxW, lh) {
  const words = text.split(' '); let line = '', lines = [];
  for (const w of words) {
    const test = line + w + ' ';
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w + ' '; }
    else line = test;
  }
  lines.push(line);
  const startY = cy - (lines.length - 1) * lh / 2;
  lines.forEach((l, i) => ctx.fillText(l.trim(), cx, startY + i * lh));
}

function buildPainting(p, index) {
  // Side & slot: first 5 on left wall, next 5 on right wall.
  const side = index < PER_SIDE ? -1 : 1;          // -1 left, +1 right
  const slotIdx = index % PER_SIDE;
  const z = HALF_L - SLOT/2 - slotIdx * SLOT;       // walk from near to far
  const wallX = side * (HALL_W/2 - 0.06);
  const facing = side === -1 ? Math.PI/2 : -Math.PI/2;  // normal points inward

  const group = new THREE.Group();
  group.position.set(wallX, 0, z);
  group.rotation.y = facing;
  scene.add(group);

  // Aspect handled after texture loads; start with a default frame.
  const maxH = 3.0, defaultAspect = 0.75; // w/h
  const ph = maxH, pw = maxH * defaultAspect;
  const centerY = EYE + 0.7;

  // Frame (gold) — sits BEHIND the painting. Front face must be behind the art
  // plane or it will occlude it. Frame depth 0.18 centered at z=-0.10 → front at -0.01.
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x9a7b3a, roughness: 0.35, metalness: 0.75 });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(pw + 0.45, ph + 0.45, 0.18), frameMat);
  frame.position.set(0, centerY, -0.10); frame.castShadow = true; group.add(frame);
  // inner dark mat — thin, also behind the art plane (front face at +0.02, art at +0.12)
  const bevel = new THREE.Mesh(new THREE.BoxGeometry(pw + 0.18, ph + 0.18, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x14110c, roughness: 0.9 }));
  bevel.position.set(0, centerY, -0.01); group.add(bevel);

  // Canvas plane (the painting) — sits clearly in FRONT of frame & bevel.
  const canvasMat = new THREE.MeshBasicMaterial({ color: 0xeeeae2 });
  const art = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), canvasMat);
  art.position.set(0, centerY, 0.12);
  art.userData = { painting: p, index };
  group.add(art);
  interactables.push(art);

  // Picture spotlight aimed at the canvas (accent on top of the bright fill)
  const spot = new THREE.SpotLight(0xfff6e6, 9, 12, Math.PI/6, 0.6, 1.1);
  spot.position.set(0, HALL_H - 0.4, 1.6);
  spot.target = art;
  spot.castShadow = true;
  spot.shadow.mapSize.set(1024, 1024);
  spot.shadow.bias = -0.0004;
  group.add(spot);
  group.add(spot.target);

  // little brass nameplate below (repositioned once true height is known)
  let plate = null;
  makeNameplate(p).then(tex => {
    plate = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.42),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    plate.position.set(0, centerY - ph/2 - 0.55, 0.14);
    group.add(plate);
  });
  const placePlate = (realH) => { if (plate) plate.position.y = centerY - realH/2 - 0.45; };

  // Load the real image and wrap it in a Texture by hand.
  // CRITICAL: these images are non-power-of-two. Mipmapping NPOT textures
  // renders BLACK on many GPUs/WebGL — so mipmaps OFF + LinearFilter on both.
  // EXACT pattern proven to work by diag.html — no async, no decode().
  const imgEl = new Image();
  imgEl.onload = () => {
    try {
      loadedImages[p.id] = imgEl;
      const tex = new THREE.Texture(imgEl);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;

      // Fit the painting to its TRUE aspect ratio inside a bounding box,
      // so nothing is ever stretched. Box = max 4.4 wide × 3.2 tall.
      const aspect = imgEl.naturalWidth / imgEl.naturalHeight;   // w/h
      const MAXW = 4.4, MAXH = 3.2;
      let w, h;
      if (aspect >= 1) {                 // landscape: width-limited
        w = MAXW; h = w / aspect;
        if (h > MAXH) { h = MAXH; w = h * aspect; }
      } else {                           // portrait: height-limited
        h = MAXH; w = h * aspect;
        if (w > MAXW) { w = MAXW; h = w / aspect; }
      }
      art.geometry.dispose();
      art.geometry = new THREE.PlaneGeometry(w, h);
      art.material = new THREE.MeshBasicMaterial({ map: tex });
      frame.geometry.dispose(); frame.geometry = new THREE.BoxGeometry(w + 0.45, h + 0.45, 0.18);
      bevel.geometry.dispose(); bevel.geometry = new THREE.BoxGeometry(w + 0.18, h + 0.18, 0.06);
      placePlate(h);
    } catch (err) {
      console.error('texture build failed for', p.id, err);
      art.material = new THREE.MeshBasicMaterial({ map: placeholderTexture(p) });
    }
    bumpProgress();
  };
  imgEl.onerror = () => {
    console.warn('image failed to load:', p.img);
    art.material = new THREE.MeshBasicMaterial({ map: placeholderTexture(p) });
    bumpProgress();
  };
  imgEl.src = p.img;
}

async function makeNameplate(p) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = 'rgba(0,0,0,0)'; x.clearRect(0, 0, 512, 128);
  x.fillStyle = '#b8964f'; x.textAlign = 'center';
  x.font = 'bold 30px Georgia';
  x.fillText(p.title, 256, 50);
  x.font = 'italic 24px Georgia'; x.fillStyle = '#d8c9a8';
  x.fillText(p.artist, 256, 88);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

PAINTINGS.forEach(buildPainting);

// A couple of decorative benches down the middle
function addBench(z) {
  const m = new THREE.MeshStandardMaterial({ color: 0x2a221a, roughness: 0.6, metalness: 0.2 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 0.9), m);
  top.position.set(0, 0.55, z); top.castShadow = true; top.receiveShadow = true; scene.add(top);
  for (const dx of [-1, 1]) for (const dz of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.55, 0.16), m);
    leg.position.set(dx*1.0, 0.27, z + dz*0.32); scene.add(leg);
  }
}
addBench(SLOT*0.5);
addBench(-SLOT*1.5);

// ───────────────────────────────────────────────────────────────────────────
//  FIRST-PERSON CONTROLS (pointer lock + WASD)
// ───────────────────────────────────────────────────────────────────────────
const keys = {};
let yaw = Math.PI, pitch = 0;     // start looking down the hall (-z)
let locked = false;
const move = new THREE.Vector3();

window.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'Escape') closePanel();
});
window.addEventListener('keyup', e => { keys[e.code] = false; });

canvas.addEventListener('click', () => {
  if (!panelOpen && !zoomOpen) canvas.requestPointerLock();
});
document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === canvas;
  crosshair.classList.toggle('show', locked);
});
document.addEventListener('mousemove', e => {
  if (!locked) return;
  yaw   -= e.movementX * 0.0022;
  pitch -= e.movementY * 0.0022;
  pitch = Math.max(-Math.PI/2.2, Math.min(Math.PI/2.2, pitch));
});

// Click to inspect (separate from pointer-lock click that locks the cursor)
document.addEventListener('mousedown', e => {
  if (!locked) return;
  if (hotPainting) { openPanel(hotPainting); }
});

// ───────────────────────────────────────────────────────────────────────────
//  MOBILE / TOUCH CONTROLS  (desktop path above is untouched)
//  - left joystick → walk      - drag elsewhere → look      - tap art → inspect
// ───────────────────────────────────────────────────────────────────────────
const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
const joystick = { x: 0, y: 0 };   // -1..1; consumed by updateMovement()

if (isTouch) {
  document.body.classList.add('touch');

  // -- Joystick (walk) --
  const joyEl = document.getElementById('joystick');
  const knob = document.getElementById('joy-knob');
  let joyId = null, joyCx = 0, joyCy = 0;
  const JOY_R = 46;
  const setKnob = (dx, dy) => { knob.style.transform = `translate(${dx}px, ${dy}px)`; };

  joyEl.addEventListener('touchstart', e => {
    e.preventDefault();
    const t = e.changedTouches[0];
    joyId = t.identifier;
    const r = joyEl.getBoundingClientRect();
    joyCx = r.left + r.width / 2; joyCy = r.top + r.height / 2;
    knob.style.background = 'rgba(212,175,89,1)';
  }, { passive: false });

  window.addEventListener('touchmove', e => {
    if (joyId === null) return;
    for (const t of e.changedTouches) {
      if (t.identifier !== joyId) continue;
      let dx = t.clientX - joyCx, dy = t.clientY - joyCy;
      const dist = Math.hypot(dx, dy);
      if (dist > JOY_R) { dx = dx / dist * JOY_R; dy = dy / dist * JOY_R; }
      setKnob(dx, dy);
      joystick.x = dx / JOY_R;       // strafe
      joystick.y = -dy / JOY_R;      // up on screen = forward
    }
  }, { passive: false });

  const endJoy = e => {
    for (const t of e.changedTouches) {
      if (t.identifier === joyId) {
        joyId = null; joystick.x = joystick.y = 0; setKnob(0, 0);
        knob.style.background = 'rgba(184,150,79,0.85)';
      }
    }
  };
  window.addEventListener('touchend', endJoy);
  window.addEventListener('touchcancel', endJoy);

  // -- Drag to look (anywhere not on the joystick / UI) + tap to inspect --
  let lookId = null, lastX = 0, lastY = 0, moved = 0, downX = 0, downY = 0;
  const onUI = el => el.closest && el.closest('#joystick, #panel, #zoom, #hud, #touch-controls, #loader');

  canvas.addEventListener('touchstart', e => {
    if (panelOpen || zoomOpen) return;
    const t = e.changedTouches[0];
    if (onUI(t.target)) return;
    lookId = t.identifier; lastX = downX = t.clientX; lastY = downY = t.clientY; moved = 0;
  }, { passive: true });

  canvas.addEventListener('touchmove', e => {
    if (lookId === null) return;
    for (const t of e.changedTouches) {
      if (t.identifier !== lookId) continue;
      const dx = t.clientX - lastX, dy = t.clientY - lastY;
      lastX = t.clientX; lastY = t.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      yaw   -= dx * 0.005;
      pitch -= dy * 0.005;
      pitch = Math.max(-Math.PI/2.2, Math.min(Math.PI/2.2, pitch));
    }
  }, { passive: true });

  canvas.addEventListener('touchend', e => {
    for (const t of e.changedTouches) {
      if (t.identifier !== lookId) continue;
      lookId = null;
      // a tap (little movement) = inspect the painting in the center of view
      if (moved < 12) {
        raycaster.setFromCamera({ x: 0, y: 0 }, camera);
        const hits = raycaster.intersectObjects(interactables, false);
        if (hits.length && hits[0].distance < 12) openPanel(hits[0].object.userData.painting);
      }
    }
  }, { passive: true });
}

// ───────────────────────────────────────────────────────────────────────────
//  RAYCAST — highlight the painting under the crosshair
// ───────────────────────────────────────────────────────────────────────────
const raycaster = new THREE.Raycaster();
const crosshair = document.getElementById('crosshair');
let hotPainting = null;

function updateHover() {
  if (!locked) { hotPainting = null; crosshair.classList.remove('hot'); return; }
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  const hits = raycaster.intersectObjects(interactables, false);
  if (hits.length && hits[0].distance < 9) {
    hotPainting = hits[0].object.userData.painting;
    crosshair.classList.add('hot');
  } else {
    hotPainting = null;
    crosshair.classList.remove('hot');
  }
}

// ───────────────────────────────────────────────────────────────────────────
//  MOVEMENT + COLLISION (keep inside the hall)
// ───────────────────────────────────────────────────────────────────────────
const SPEED = 5.2;
const clock = new THREE.Clock();
function updateMovement(dt) {
  move.set(0, 0, 0);
  const fwd = (keys['KeyW'] || keys['ArrowUp']) ? 1 : 0;
  const back = (keys['KeyS'] || keys['ArrowDown']) ? 1 : 0;
  const left = (keys['KeyA'] || keys['ArrowLeft']) ? 1 : 0;
  const right = (keys['KeyD'] || keys['ArrowRight']) ? 1 : 0;
  // keyboard + joystick combine (joystick.y forward, joystick.x strafe)
  const f = (fwd - back) + joystick.y, s = (right - left) + joystick.x;
  if (Math.abs(f) > 0.01 || Math.abs(s) > 0.01) {
    // forward direction from yaw (xz-plane only)
    const sinY = Math.sin(yaw), cosY = Math.cos(yaw);
    move.x += (-sinY * f) + (cosY * s);
    move.z += (-cosY * f) + (-sinY * s);
    move.normalize().multiplyScalar(SPEED * dt);
    camera.position.x += move.x;
    camera.position.z += move.z;
  }
  // collision: clamp to hall interior with margin
  const m = 0.6;
  camera.position.x = Math.max(-HALL_W/2 + m, Math.min(HALL_W/2 - m, camera.position.x));
  camera.position.z = Math.max(-HALF_L + m, Math.min(HALF_L - m, camera.position.z));
  camera.position.y = EYE;
}

function applyLook() {
  const dir = new THREE.Vector3(
    Math.sin(yaw) * Math.cos(pitch),
    Math.sin(pitch),
    Math.cos(yaw) * Math.cos(pitch)
  );
  camera.lookAt(camera.position.clone().add(dir));
}

// ───────────────────────────────────────────────────────────────────────────
//  INFO PANEL + CLOSE-UPS + ZOOM
// ───────────────────────────────────────────────────────────────────────────
const panel = document.getElementById('panel');
let panelOpen = false, zoomOpen = false;

function openPanel(p) {
  document.getElementById('panel-hero').style.backgroundImage = `url('${p.img}')`;
  document.getElementById('panel-title').textContent = p.title;
  document.getElementById('panel-artist').textContent = p.artist;
  document.getElementById('panel-meta').textContent = p.meta;
  document.getElementById('panel-desc').textContent = p.desc;
  const facts = document.getElementById('panel-facts');
  facts.innerHTML = '';
  p.facts.forEach(f => { const li = document.createElement('li'); li.textContent = f; facts.appendChild(li); });

  const wrap = document.getElementById('panel-closeups');
  wrap.innerHTML = '';
  p.closeups.forEach(cu => {
    const div = document.createElement('div'); div.className = 'closeup';
    // crop via background: zoom in 2.6x and center on the focus point (fx,fy)
    div.style.backgroundImage = `url('${p.img}')`;
    div.style.backgroundSize = '260%';
    div.style.backgroundPosition = `${cu.fx * 100}% ${cu.fy * 100}%`;
    const cap = document.createElement('div'); cap.className = 'cap'; cap.textContent = cu.cap;
    div.appendChild(cap);
    div.addEventListener('click', () => openZoom(p, cu));
    wrap.appendChild(div);
  });

  panel.classList.add('open');
  panelOpen = true;
  if (document.pointerLockElement) document.exitPointerLock();
}

function closePanel() {
  panel.classList.remove('open'); panelOpen = false;
  closeZoom();
}
document.getElementById('panel-close').addEventListener('click', closePanel);

const zoom = document.getElementById('zoom');
const zoomImg = document.getElementById('zoom-img');
const zoomCap = document.getElementById('zoom-cap');
function openZoom(p, cu) {
  zoomImg.src = p.img;
  zoomImg.style.objectFit = 'cover';
  zoomCap.textContent = `${p.title} — ${cu.cap}`;
  zoom.classList.add('open'); zoomOpen = true;
  // pan/scale the full image toward the focus point
  zoomImg.style.transform = `scale(2.4)`;
  zoomImg.style.transformOrigin = `${cu.fx*100}% ${cu.fy*100}%`;
}
function closeZoom() { zoom.classList.remove('open'); zoomOpen = false; }
zoom.addEventListener('click', closeZoom);

// ───────────────────────────────────────────────────────────────────────────
//  ENTER FLOW
// ───────────────────────────────────────────────────────────────────────────
const loaderEl = document.getElementById('loader');
const hud = document.getElementById('hud');
const titleTag = document.getElementById('title-tag');
enterBtn.addEventListener('click', () => {
  loaderEl.style.opacity = '0';
  setTimeout(() => { loaderEl.style.display = 'none'; }, 1000);
  titleTag.classList.add('show');
  if (isTouch) {
    // touch: no pointer lock; the joystick + drag-to-look take over.
    document.getElementById('touch-controls').style.display = 'block';
  } else {
    hud.classList.add('show');
    canvas.requestPointerLock();
  }
});

// ───────────────────────────────────────────────────────────────────────────
//  RESIZE + RENDER LOOP
// ───────────────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  if (!panelOpen && !zoomOpen) updateMovement(dt);
  applyLook();
  updateHover();
  renderer.render(scene, camera);
}
animate();

// Fallback: if images hang, allow entry after 6s
setTimeout(() => { if (loaded < toLoad) { enterBtn.classList.add('ready'); loadpct.textContent = 'Ready (some works still loading)…'; } }, 6000);
