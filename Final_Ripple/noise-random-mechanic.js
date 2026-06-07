let nextRandomRippleTime = 0;

function setupNoiseRandomMechanic() {
  scheduleNextRandomRipple();
}

function scheduleNextRandomRipple() {
  nextRandomRippleTime = millis() + random(5000, 12000);
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
  const rippleCount = floor(random(1, 3));

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

function getRandomRippleProfile(source, colorOverride) {
  const rippleColor = colorOverride || getRippleColor(source);

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

function getSecondaryRippleValue(ripple) {
  if (ripple.source !== "input" || ripple.hasCreatedSecondary) {
    return {
      shouldCreateRipple: false,
      positions: []
    };
  }

  const age = millis() - ripple.createdAt;
  if (age < 650) {
    return {
      shouldCreateRipple: false,
      positions: []
    };
  }

  ripple.hasCreatedSecondary = true;

  const positions = [];
  const secondaryCount = floor(random(0, 3));

  if (secondaryCount === 0) {
    return {
      shouldCreateRipple: false,
      positions: []
    };
  }

  for (let i = 0; i < secondaryCount; i++) {
    const angle = random(TWO_PI);
    const distanceFromMainRipple = random(35, 95);

    positions.push({
      x: ripple.x + cos(angle) * distanceFromMainRipple,
      y: ripple.y + sin(angle) * distanceFromMainRipple * 0.65,
      intensity: random(0.35, 0.75),
      color: {
        r: ripple.r,
        g: ripple.g,
        b: ripple.b
      }
    });
  }

  return {
    shouldCreateRipple: true,
    positions: positions
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
    g: 210,
    b: 200,
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
