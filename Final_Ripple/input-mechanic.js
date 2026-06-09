let pressStartTime = 0;
let skipQueue = []; 

function setupInputMechanic() {
}

function onInputMousePressed() {
  pressStartTime = millis();
}

function onInputMouseReleased() {
  let pressDuration = millis() - pressStartTime;
  
  pressDuration = constrain(pressDuration, 0, 1800); 

  let initialIntensity = map(pressDuration, 0, 1800, 0.5, 2);
  
  let skipCount = floor(map(pressDuration, 0, 1800, 3, 12));
  
  let skipDistance = map(pressDuration, 0, 1800, 40, 180);

  let targetX = width / 2;
  let targetY = height / 2;
  
  // Calculate the exact angle pointing from the mouse click towards the center of the canvas
  let baseAngle = atan2(targetY - mouseY, targetX - mouseX);
  
  let angle = baseAngle + random(-PI/6, PI/6);

  let currentX = mouseX;
  let currentY = mouseY;
  let currentTime = millis();

  for (let i = 0; i < skipCount; i++) {
    
    let currentIntensity = initialIntensity * pow(0.6, i);

    skipQueue.push({
      x: currentX,
      y: currentY,
      intensity: currentIntensity,
      triggerTime: currentTime + i * 300 
    });

    currentX += cos(angle) * skipDistance;
    currentY += sin(angle) * skipDistance;
  }
}

function getInputMechanicValue() {
  if (skipQueue.length > 0) {
    let currentTime = millis();

    if (currentTime >= skipQueue[0].triggerTime) {
      
      let skip = skipQueue.shift(); 

      return {
        shouldCreateRipple: true,
        x: skip.x,
        y: skip.y,
        intensity: skip.intensity
      };
    }
  }

  return {
    shouldCreateRipple: false
  };
}