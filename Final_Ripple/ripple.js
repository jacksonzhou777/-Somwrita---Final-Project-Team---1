class Ripple {
  constructor(x, y, source, randomProfile) {
    this.x = x;
    this.y = y;
    this.source = source;
    this.createdAt = millis();
    this.radius = 0;
    this.alpha = 255;
    this.seed = randomProfile.seed;
    this.noiseScale = randomProfile.noiseScale;
    this.baseNoiseStrength = randomProfile.baseNoiseStrength;
    this.strokeWeight = randomProfile.strokeWeight;
    this.r = randomProfile.r;
    this.g = randomProfile.g;
    this.b = randomProfile.b;
  }

  update(timeValue, noiseValue) {
    this.radius = timeValue.radius;
    this.alpha = timeValue.alpha;
    this.noiseStrength = noiseValue.strength;
    this.noiseScale = noiseValue.scale;
    this.noiseSpeed = noiseValue.speed;
  }

  display() {
    const sourceAlpha = this.source === "random" ? 0.38 : 1;

    this.displayLayer(1, 1 * sourceAlpha, 1);
    this.displayLayer(0.72, 0.7 * sourceAlpha, 0.85);
    this.displayLayer(0.44, 0.45 * sourceAlpha, 0.65);
  }

  displayLayer(radiusMultiplier, alphaMultiplier, noiseMultiplier) {
    stroke(this.r, this.g, this.b, this.alpha * alphaMultiplier);
    strokeWeight(this.strokeWeight);
    beginShape();

    for (let angle = 0; angle < TWO_PI; angle += 0.08) {
      const noiseX = cos(angle) * this.noiseScale + this.seed;
      const noiseY = sin(angle) * this.noiseScale + this.seed;
      const n = noise(noiseX, noiseY, this.noiseSpeed);
      const strength = this.noiseStrength * noiseMultiplier;
      const offset = map(n, 0, 1, -strength, strength);
      const noisyRadius = this.radius * radiusMultiplier + offset;
      const x = this.x + cos(angle) * noisyRadius;
      const y = this.y + sin(angle) * noisyRadius;
      vertex(x, y);
    }

    endShape(CLOSE);
  }

  isFinished() {
    return this.alpha <= 0;
  }
}
