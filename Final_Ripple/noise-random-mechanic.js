let nextRandomRippleTime = 0;

function setupNoiseRandomMechanic() {
  scheduleNextRandomRipple();
}

function scheduleNextRandomRipple() {
  nextRandomRippleTime = millis() + random(3000, 7000);
}

function getRandomRippleValue() {
  if (millis() < nextRandomRippleTime) {
    return {
      shouldCreateRipple: false,
      positions: []
    };
  }

  scheduleNextRandomRipple();

  const positions = [];
  const rippleCount = floor(random(1, 6));

  for (let i = 0; i < rippleCount; i++) {
    positions.push({
      x: random(width),
      y: random(height)
    });
  }

  return {
    shouldCreateRipple: true,
    positions: positions
  };
}

function getRandomRippleProfile(source) {
  const rippleColor = getRippleColor(source);

  return {
    seed: random(10000),
    noiseScale: random(0.7, 1.6),
    baseNoiseStrength: random(6, 18),
    strokeWeight: random(1, 3),
    r: rippleColor.r,
    g: rippleColor.g,
    b: rippleColor.b
  };
}

function getRippleColor(source) {
  if (source === "input") {
    return {
      r: random(120, 255),
      g: random(120, 255),
      b: random(120, 255)
    };
  }

  return {
    r: 180,
    g: 220,
    b: 255
  };
}

function getNoiseMechanicValue(ripple, audioValue) {
  const audioBoost = map(audioValue.level, 0, 1, 0, 42, true);

  return {
    strength: ripple.baseNoiseStrength + audioBoost,
    scale: ripple.noiseScale,
    speed: frameCount * 0.012
  };
}
