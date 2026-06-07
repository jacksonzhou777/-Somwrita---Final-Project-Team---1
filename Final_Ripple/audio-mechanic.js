let soundFile;
let fft;
let amplitude;
let lastBassTrigger = 0;

function setupAudioMechanic() {

  soundFile = loadSound("music1.mp3");
  fft = new p5.FFT(0.8, 1024);
  amplitude = new p5.Amplitude();
}

function getAudioMechanicValue() {

  if (!soundFile || !soundFile.isLoaded()) {
    return {level: 0,bass: 0,treble: 0,shouldCreateRipple: false};
  }

  const level = amplitude.getLevel();
  fft.analyze();
  const bass = fft.getEnergy("bass");
  const treble = fft.getEnergy("treble");

  let shouldCreateRipple = false;

  if (bass > 220 && millis() - lastBassTrigger > 200) {
    shouldCreateRipple = true;
    lastBassTrigger = millis();
  }

  return {level,bass,treble,shouldCreateRipple};
}
