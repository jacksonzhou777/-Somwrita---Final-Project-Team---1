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

  display(allRipples) {
    const rings = [
      { rMult: 1.00, aMult: 1.0  },
      { rMult: 0.76, aMult: 0.7  },
      { rMult: 0.52, aMult: 0.45 },
      { rMult: 0.30, aMult: 0.25 },
    ];
    for (const ring of rings) {
      this.displayRing(ring.rMult, ring.aMult, allRipples);
    }
  }

  displayRing(radiusMultiplier, alphaMultiplier, allRipples) {
    stroke(this.r, this.g, this.b, this.alpha * alphaMultiplier); 
    strokeWeight(this.strokeWeight);
    noFill();
    beginShape();

    for (let angle = 0; angle < TWO_PI; angle += 0.06) {
      const noiseX = cos(angle) * this.noiseScale + this.seed;
      const noiseY = sin(angle) * this.noiseScale + this.seed;
      const n = noise(noiseX, noiseY, this.noiseSpeed);
      const offset = map(n, 0, 1, -this.noiseStrength * 0.25, this.noiseStrength * 0.25);

      let r = this.radius * radiusMultiplier + offset;

      // Wave interference: deform this ring based on every other ripple's wave
      for (const other of allRipples) {
        if (other === this) continue;
        const px = this.x + cos(angle) * r;
        const py = this.y + sin(angle) * r * 0.42;
        const d = dist(px, py, other.x, other.y);
        const otherAge = millis() - other.createdAt;
        // Sine wave from the other ripple at this point
        const wave = sin(d * 0.06 - otherAge * 0.003) * (other.alpha / 255);
        r += wave * 4; // 4px max deformation
      }

      // Y compressed for 3D perspective ellipse
      vertex(this.x + cos(angle) * r, this.y + sin(angle) * r * 0.42);
    }

    endShape(CLOSE);
  }

  isFinished() {
    return this.alpha <= 0;
  }
}
