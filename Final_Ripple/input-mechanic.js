let inputClickPosition = null;

function setupInputMechanic() {
}

function mousePressed() {
  inputClickPosition = {
    x: mouseX,
    y: mouseY
  };
}

function getInputMechanicValue() {
  if (inputClickPosition === null) {
    return {
      shouldCreateRipple: false
    };
  }

  const value = {
    shouldCreateRipple: true,
    x: inputClickPosition.x,
    y: inputClickPosition.y
  };

  inputClickPosition = null;
  return value;
}
