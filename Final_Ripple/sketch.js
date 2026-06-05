let ripples = [];
let bgImage;

function preload() {
  bgImage = loadImage('../Images/bottom picture.png');
}

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
  // cover fit: scale to fill canvas, crop excess top/bottom
  const scale = max(width / bgImage.width, height / bgImage.height);
  const drawW = bgImage.width * scale;
  const drawH = bgImage.height * scale;
  image(bgImage, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);

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

function createRipple(x, y, source, intensity = 1) { 
  const randomProfile = getRandomRippleProfile(source);
  
  if (source === "input" || source === "time") {
    randomProfile.baseNoiseStrength *= intensity;
  }
  
  ripples.push(new Ripple(x, y, source, randomProfile)); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
