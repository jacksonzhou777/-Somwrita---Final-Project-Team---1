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
    this.audioScale = 1;
  }

  update(timeValue,noiseValue,audioValue) {

    if (this.source === "audio") {
      this.audioScale = map(
        audioValue.level,0,0.3,1,2.2,true);
    } else {
      this.audioScale = 1;
    }

    if (this.source === "audio") {
  this.radius = timeValue.radius * 0.4;
} else {
  this.radius = timeValue.radius;
}

    this.alpha = timeValue.alpha;
    this.noiseStrength = noiseValue.strength;
    this.noiseScale = noiseValue.scale;
    this.noiseSpeed = noiseValue.speed;
  }

  display(allRipples) {

    if (this.source === "audio") {
      this.displayParticles();
      return;
    }

    const rings = [
      { rMult: 1.00, aMult: 1.0 },
      { rMult: 0.76, aMult: 0.7 },
      { rMult: 0.52, aMult: 0.45 },
      { rMult: 0.30, aMult: 0.25 }
    ];

    for (const ring of rings) {
      this.displayRing(ring.rMult,ring.aMult,allRipples);
    }
  }

  displayParticles() {

    noStroke();

    const rings = [
      { rMult: 1.00, aMult: 1.0 },
      { rMult: 0.76, aMult: 0.7 },
      { rMult: 0.52, aMult: 0.45 },
      { rMult: 0.30, aMult: 0.25 }
    ];

    for (const ring of rings) {

      const ringRadius = this.radius * ring.rMult;
      const particleCount = floor(map(this.noiseStrength,0,50,30,80,true));

      for (let i = 0; i < particleCount; i++) {

        const angle =(TWO_PI * i) / particleCount;
        const waveOffset = sin(frameCount * 0.05 + i * 0.3) * 4;
        const r = ringRadius + waveOffset;
        const x = this.x + cos(angle) * r;
        const y =this.y + sin(angle) * r * 0.42;
        const size = map(this.noiseStrength,0,50,2,3,true);

        fill(220,240,255,this.alpha * ring.aMult);

        circle(x,y,size);
      }
    }
  }

  displayRing(radiusMultiplier,alphaMultiplier,allRipples) {

    stroke(180,210,200,this.alpha * alphaMultiplier);
    strokeWeight(1.2);
    noFill();
    beginShape();

    for (let angle = 0;
      angle < TWO_PI;
      angle += 0.06) {

      const noiseX = cos(angle) * this.noiseScale + this.seed;
      const noiseY = sin(angle) * this.noiseScale + this.seed;
      const n = noise(noiseX,noiseY,this.noiseSpeed);
      const offset = map(n,0,1,-this.noiseStrength * 0.25,this.noiseStrength * 0.25);

      let r =this.radius *radiusMultiplier +offset;

      for (const other of allRipples) {

  if (other === this)
    continue;

  if (other.source === "audio")
    continue;

  const px = this.x + cos(angle) * r;
  const py = this.y + sin(angle) * r * 0.42;
  const d = dist(px,py,other.x,other.y);
  const otherAge = millis() - other.createdAt;
  const wave = sin(d * 0.06 - otherAge * 0.003) * (other.alpha / 255);

  r += wave * 4;
}

      vertex(this.x + cos(angle) * r,this.y + sin(angle) * r * 0.42);
    }

    endShape(CLOSE);
  }

  isFinished() {
    return this.alpha <= 0;
  }
}

function getNoiseMechanicValue(ripple,audioValue) {

  let audioBoost = 0;

  if (ripple.source === "audio") {

    audioBoost = map(audioValue.treble,0,255,0,40,true);
  }

  return {

    strength:
      ripple.baseNoiseStrength + audioBoost,

    scale:
      ripple.noiseScale,

    speed:
      frameCount * 0.012
  };
}
