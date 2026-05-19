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

setInterval(createIntenseSpark, 60); // interval time between spawning particles

function createFlareSmoke() {
  const container = document.getElementById('smoke-container');
  if (!container) return;

  const smoke = document.createElement('div');
  smoke.className = 'smoke-puff';
  
  // Choose a base position (e.g., center of screen, or modify to cover full width)
  // To make it look like a single localized hand-held flare, lock this to a specific spot like '50vw'
  smoke.style.left = (Math.random() * 40 + 30) + 'vw'; // Concentrated around the center 30%-70%
  
  // Massive, irregular puff sizes
  const baseSize = Math.random() * 60 + 60 + 'px'; // 60px to 120px base widths
  smoke.style.width = baseSize;
  smoke.style.height = baseSize;
  
  // Slow, heavy physics parameters
  const riseDistance = -(Math.random() * 50 + 40) + 'vh'; // Rises halfway up the screen
  const driftDistance = (Math.random() * 300 - 150) + 'px'; // Billows wide left or right
  const rotation = (Math.random() * 180 - 90) + 'deg'; // Simulates churning gas
  const duration = (Math.random() * 2.5 + 3.5) + 's'; // Slow burn (3.5 to 6 seconds)
  
  smoke.style.setProperty('--rise-dist', riseDistance);
  smoke.style.setProperty('--drift-dist', driftDistance);
  smoke.style.setProperty('--rot', rotation);
  smoke.style.animationDuration = duration;
  
  container.appendChild(smoke);
  
  // Matches the longer animation lifetime
  setTimeout(() => {
    smoke.remove();
  }, 6000);
}

// Spawns a steady, rolling stream of thick smoke
setInterval(createFlareSmoke, 60);

