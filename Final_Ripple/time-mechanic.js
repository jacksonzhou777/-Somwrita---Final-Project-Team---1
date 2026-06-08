// Time-based mechanic — Ruidong Xu
// Controls ripple lifecycles with non-linear easing,
// and generates autonomous pulse events from the canvas centre.
//
// Timing is handled via millis() rather than setInterval() because
// setInterval() is a native JS function that runs asynchronously on a
// separate timeline from p5's draw() loop. This means its callback can
// fire mid-frame while the canvas is in an intermediate state, risking
// data conflicts and visual glitches. millis() is checked once per frame
// inside draw(), keeping all state changes synchronised with the render cycle.

let lastPulseTime = 0;
let nextPulseDelay = 4000;
let pulseCount = 0;
let pulsePhase = 0; // tracks sinusoidal intensity cycle

function setupTimeMechanic() {
  lastPulseTime = millis();
  nextPulseDelay = random(3000, 5000);
}

// Called every frame for each active ripple.
// Returns the ripple's current radius and alpha based on elapsed time.
function getTimeMechanicValue(ripple) {
  // Different sources get different lifetimes for visual variety
  const lifetime = ripple.source === 'time'  ? 7000 :
                   ripple.source === 'input' ? 5000 : 6000;
  const age = millis() - ripple.createdAt;
  const t = constrain(age / lifetime, 0, 1);

  // easeInQuad: slow start, faster expansion — mimics real water physics
  const maxRadius = max(windowWidth, windowHeight) * 0.65;
  const radius = maxRadius * easeInQuad(t);

  // easeOutCubic: quick initial fade that lingers — more natural dissipation
  const alpha = 255 * easeOutCubic(1 - t);

  return { radius, alpha };
}

// Called every frame. Returns a pulse event when the internal timer fires.
// Pulses originate from the canvas centre at varying intensities.
function getTimePulseValue() {
  const now = millis();
  if (now - lastPulseTime < nextPulseDelay) {
    return { shouldPulse: false };
  }

  lastPulseTime = now;
  pulseCount++;
  pulsePhase += 0.7;

  // Every 4th pulse triggers a rapid burst to break the regular rhythm
  nextPulseDelay = (pulseCount % 4 === 0)
    ? random(800, 1500)
    : random(3000, 6000);

  // Sinusoidal intensity gives the piece a breathing, organic quality
  const intensity = map(sin(pulsePhase), -1, 1, 0.6, 1.8);

  return {
    shouldPulse: true,
    x: windowWidth / 2,
    y: windowHeight / 2,
    intensity: intensity
  };
}

// Quadratic ease-in: gradual acceleration from zero
function easeInQuad(t) {
  return t * t;
}

// Cubic ease-out: fast start that decelerates to a stop
function easeOutCubic(t) {
  return 1 - pow(1 - t, 3);
}
