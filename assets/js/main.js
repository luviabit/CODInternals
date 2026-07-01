window.addEventListener("load", () => {
  const loader = document.getElementById("loader-wrapper");
  const content = document.getElementById("content");

  loader.style.display = "none"; // hide
  content.style.display = "block"; // show main page content
});

function createIntenseSpark() { // Spark function for creating the COD Vanguard "fire" effect
  const container = document.getElementById('spark-container');
  if (!container) return;

  const spark = document.createElement('div');
  spark.className = 'spark';
  
  spark.style.left = Math.random() * 100 + 'vw';
  
  const size = Math.random() * 4 + 3 + 'px';
  spark.style.width = size;
  spark.style.height = size;
  
  const riseDistance = -(Math.random() * 70 + 30) + 'vh'; // height up the screen
  const driftDistance = (Math.random() * 240 - 120) + 'px'; // wider erratic sway
  const duration = (Math.random() * 1.2 + 0.8) + 's';
  
  spark.style.setProperty('--rise-dist', riseDistance);
  spark.style.setProperty('--drift-dist', driftDistance);
  spark.style.animationDuration = duration;
  
  container.appendChild(spark);
  
  setTimeout(() => {
    spark.remove();
  }, 2000);
}

let sparkIntervalId = null;
let smokeIntervalId = null;
let effectsEnabled = true;
const EFFECTS_PREF_KEY = 'codinternalsPageEffects';
const effectsToggleLabelOn = 'Effects: On';
const effectsToggleLabelOff = 'Effects: Off';

function startPageEffects() {
  if (sparkIntervalId !== null || smokeIntervalId !== null) return;
  sparkIntervalId = setInterval(createIntenseSpark, 60);
  smokeIntervalId = setInterval(createFlareSmoke, 60);
}

function stopPageEffects() {
  if (sparkIntervalId !== null) {
    clearInterval(sparkIntervalId);
    sparkIntervalId = null;
  }
  if (smokeIntervalId !== null) {
    clearInterval(smokeIntervalId);
    smokeIntervalId = null;
  }

  document.querySelectorAll('#spark-container .spark').forEach((el) => el.remove());
  document.querySelectorAll('#smoke-container .smoke-puff').forEach((el) => el.remove());
}

function readEffectsPreference() {
  try {
    const stored = localStorage.getItem(EFFECTS_PREF_KEY);
    return stored === null ? true : stored === '1';
  } catch {
    return true;
  }
}

function updateEffectsButton(element, enabled) {
  if (!element) return;
  element.classList.toggle('is-on', enabled);
  const checkbox = element.querySelector('input[type="checkbox"]');
  if (checkbox) {
    checkbox.checked = enabled;
  }
}

function setEffectsEnabled(enabled, save = true) {
  effectsEnabled = enabled;
  if (save) {
    try {
      localStorage.setItem(EFFECTS_PREF_KEY, enabled ? '1' : '0');
    } catch {
      // ignore storage errors
    }
  }

  if (enabled) {
    startPageEffects();
    document.body.classList.remove('effects-disabled');
  } else {
    stopPageEffects();
    document.body.classList.add('effects-disabled');
  }

  updateEffectsButton(document.querySelector('.effects-toggle-switch'), enabled);
}

function createEffectsToggleButton() {
  const container = document.querySelector('.nav-cta');
  if (!container) return;

  const label = document.createElement('label');
  label.className = 'effects-toggle-switch';
  label.innerHTML = `
    <span class="effects-toggle-copy">Effects</span>
    <span class="effects-toggle-track" aria-hidden="true">
      <span class="effects-toggle-thumb"></span>
    </span>
    <input type="checkbox" class="effects-toggle-input" aria-label="Toggle page effects" />
  `;

  const checkbox = label.querySelector('input');
  checkbox.addEventListener('change', () => setEffectsEnabled(checkbox.checked));

  container.appendChild(label);
  return label;
}

function createFlareSmoke() {
  const container = document.getElementById('smoke-container');
  if (!container) return;

  const smoke = document.createElement('div');
  smoke.className = 'smoke-puff';

  const sourceX = (Math.random() * 80 + 10) + 'vw';
  const sourceY = (Math.random() * 8 + 2) + 'vh';
  smoke.style.left = sourceX;
  smoke.style.bottom = sourceY;

  const baseSize = Math.random() * 70 + 80 + 'px';
  smoke.style.width = baseSize;
  smoke.style.height = baseSize;

  const riseDistance = -(Math.random() * 70 + 50) + 'vh';
  const driftDistance = (Math.random() * 260 - 130) + 'px';
  const startX = (Math.random() * 80 - 40) + 'px';
  const rotation = (Math.random() * 220 - 110) + 'deg';
  const duration = (Math.random() * 2.7 + 3.8) + 's';

  smoke.style.setProperty('--rise-dist', riseDistance);
  smoke.style.setProperty('--drift-x', driftDistance);
  smoke.style.setProperty('--start-x', startX);
  smoke.style.setProperty('--rot', rotation);
  smoke.style.animationDuration = duration;

  container.appendChild(smoke);

  setTimeout(() => {
    smoke.remove();
  }, 7000);
}

function openMapImageViewer(imageSrc, imageAlt) {
  const overlay = document.createElement('div');
  overlay.className = 'image-viewer-overlay';
  overlay.tabIndex = -1;
  overlay.innerHTML = `
    <div class="image-viewer-panel">
      <img class="image-viewer-img" src="${imageSrc}" alt="${imageAlt}">
      <button class="image-viewer-close" aria-label="Close image viewer">×</button>
    </div>
  `;

  function closeViewer() {
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      closeViewer();
    }
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target.closest('.image-viewer-close')) {
      closeViewer();
    }
  });

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeyDown);
  overlay.focus();
}

function initMapImageViewer() {
  const mapImages = document.querySelectorAll('.wiki-table .map-thumb img');
  mapImages.forEach((img) => {
    img.addEventListener('click', () => {
      openMapImageViewer(img.src, img.alt || 'Map image');
    });
  });
}

window.addEventListener('load', () => {
  const toggle = createEffectsToggleButton();
  setEffectsEnabled(readEffectsPreference(), false);
  updateEffectsButton(toggle, effectsEnabled);
  initMapImageViewer();
});

