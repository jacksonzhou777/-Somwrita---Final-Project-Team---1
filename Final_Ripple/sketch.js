let ripples = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  setupInputMechanic();
  setupAudioMechanic();
  setupTimeMechanic();
  setupNoiseRandomMechanic();
}

function draw() {
  background(22, 38, 32); // dark pond green

  const inputValue  = getInputMechanicValue();
  const audioValue  = getAudioMechanicValue();
  const randomValue = getRandomRippleValue();
  const pulseValue  = getTimePulseValue();

  if (inputValue.shouldCreateRipple) {
    createRipple(inputValue.x, inputValue.y, "input", inputValue.intensity); 
  }

  if (randomValue.shouldCreateRipple) {
    for (const position of randomValue.positions) {
      createRipple(position.x, position.y, "random");
    }
  }

  if (pulseValue.shouldPulse) {
    createRipple(pulseValue.x, pulseValue.y, "time", pulseValue.intensity);
  }

  // SCREEN lightens where ripple rings overlap — light glinting on dark water
  blendMode(SCREEN);
  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i];
    const secondaryValue = getSecondaryRippleValue(ripple);

    if (secondaryValue.shouldCreateRipple) {
      for (const position of secondaryValue.positions) {
        createRipple(position.x, position.y, "secondary", position.intensity, position.color);
      }
    }

    const timeValue = getTimeMechanicValue(ripple);
    const noiseValue = getNoiseMechanicValue(ripple, audioValue);

    ripple.update(timeValue, noiseValue);
    ripple.display(ripples);

    if (ripple.isFinished()) {
      ripples.splice(i, 1);
    }
  }
  blendMode(BLEND);
}

function createRipple(x, y, source, intensity = 1, colorOverride) { 
  const randomProfile = getRandomRippleProfile(source, colorOverride);
  
  if (source === "input" || source === "time" || source === "secondary") {
    randomProfile.baseNoiseStrength *= intensity;
  }
  
  ripples.push(new Ripple(x, y, source, randomProfile)); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
