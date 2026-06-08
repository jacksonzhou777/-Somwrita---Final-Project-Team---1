// Noise and randomness mechanic - Huginn Xing
// Adds organic variation through Perlin noise,
// autonomous random ripples, and random-triggered secondary ripples.

let nextRandomRippleTime = 0;

function setupNoiseRandomMechanic() {
  scheduleNextRandomRipple();
}

// Sets the next autonomous ripple event at an irregular interval.
function scheduleNextRandomRipple() {
  nextRandomRippleTime = millis() + random(5000, 12000);
}

// Called every frame. Returns random ripple positions when the timer fires.
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

// Creates a unique visual profile for each ripple.
// Random seeds and noise settings make every ripple deform differently.
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

// Called every frame for each active ripple.
// ChatGPT helped generate this secondary ripple logic: only random ripples
// can trigger nearby chain reactions with inherited color.
function getSecondaryRippleValue(ripple) {
  if (ripple.source !== "random" || ripple.hasCreatedSecondary) {
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

// Chooses the base color for new ripples.
// Secondary ripples inherit their random ripple color through colorOverride.
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

// Returns Perlin noise values used to distort each ripple edge.
// Audio can increase the deformation strength when sound input is active.
function getNoiseMechanicValue(ripple, audioValue) {
  const audioBoost = map(audioValue.level, 0, 1, 0, 42, true);

  return {
    strength: ripple.baseNoiseStrength + audioBoost,
    scale: ripple.noiseScale,
    speed: frameCount * 0.012
  };
}
