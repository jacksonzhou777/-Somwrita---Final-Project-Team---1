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
  background(8, 12, 18);

  const inputValue = getInputMechanicValue();
  const audioValue = getAudioMechanicValue();
  const randomValue = getRandomRippleValue();

  if (inputValue.shouldCreateRipple) {
    createRipple(inputValue.x, inputValue.y, "input");
  }

  if (randomValue.shouldCreateRipple) {
    for (const position of randomValue.positions) {
      createRipple(position.x, position.y, "random");
    }
  }

  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i];
    const timeValue = getTimeMechanicValue(ripple);
    const noiseValue = getNoiseMechanicValue(ripple, audioValue);

    ripple.update(timeValue, noiseValue);
    ripple.display();

    if (ripple.isFinished()) {
      ripples.splice(i, 1);
    }
  }
}

function createRipple(x, y, source) {
  const randomProfile = getRandomRippleProfile(source);
  ripples.push(new Ripple(x, y, source, randomProfile));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
