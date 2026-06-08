let ripples = [];
let canvasPressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  setupInputMechanic();
  setupAudioMechanic();
  setupTimeMechanic();
  setupNoiseRandomMechanic();
}

function draw() {
  background(22, 38, 32);

  const inputValue = getInputMechanicValue();
  const audioValue = getAudioMechanicValue();
  const randomValue = getRandomRippleValue();
  const pulseValue = getTimePulseValue();

  if (audioValue.shouldCreateRipple) {
    createRipple(random(width),random(height),"audio");
  }

  if (inputValue.shouldCreateRipple) {
    createRipple(inputValue.x,inputValue.y,"input",inputValue.intensity);
  }

  if (randomValue.shouldCreateRipple) {
    for (const position of randomValue.positions) {
      createRipple(position.x,position.y,"random");
    }
  }

  if (pulseValue.shouldPulse) {
    createRipple(pulseValue.x,pulseValue.y,"time",pulseValue.intensity);
  }


  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i];
    const timeValue = getTimeMechanicValue(ripple);
    const noiseValue = getNoiseMechanicValue(ripple,audioValue);

    ripple.update(timeValue,noiseValue,audioValue);
    ripple.display(ripples);

    if (ripple.isFinished()) {
      ripples.splice(i, 1);
    }
  }

}

function createRipple(x, y, source, intensity = 1) {

  const randomProfile = getRandomRippleProfile(source);

  if (source === "input" || source === "time") {
    randomProfile.baseNoiseStrength *= intensity;
  }

  let newRipple = new Ripple(x, y, source, randomProfile);
  newRipple.intensity = intensity;
  ripples.push(newRipple);
}

function mousePressed() {

  if (!canvasPressed) {
    userStartAudio();

    if (soundFile && !soundFile.isPlaying()) {
      soundFile.loop();
    }

    canvasPressed = true;
  }
  onInputMousePressed();
}
function mouseReleased() {
  onInputMouseReleased();
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}
