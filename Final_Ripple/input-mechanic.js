let pressStartTime = 0;
let pendingRipple = false;
let rippleX = 0;
let rippleY = 0;
let rippleIntensity = 1;

function setupInputMechanic() {
}

function onInputMousePressed() {
  pressStartTime = millis();
}

function onInputMouseReleased() {
  let pressDuration = millis() - pressStartTime;
  
  pressDuration = constrain(pressDuration, 0, 3000); 
  rippleIntensity = map(pressDuration, 0, 3000, 0.05, 8.0);

  rippleX = mouseX;
  rippleY = mouseY;
  pendingRipple = true; 
}

function getInputMechanicValue() {
  if (pendingRipple) {
    pendingRipple = false;
    
    return {
      shouldCreateRipple: true,
      x: rippleX,
      y: rippleY,
      intensity: rippleIntensity 
    };
  }

  return {
    shouldCreateRipple: false
  };
}