function setupTimeMechanic() {
}

function getTimeMechanicValue(ripple) {
  const age = millis() - ripple.createdAt;
  const lifetime = 2600;

  return {
    radius: age * 0.12,
    alpha: map(age, 0, lifetime, 255, 0, true)
  };
}
