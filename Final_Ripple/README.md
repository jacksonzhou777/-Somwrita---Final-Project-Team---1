# Liquid Resonance

## Inspiration

Our project, **Liquid Resonance**, is inspired by the movement of water ripples and the way one small action can spread outward into a larger shared space. Natural ripple photography shaped our visual direction: expanding rings, soft fading edges, overlapping waves, and subtle distortion on the water surface.

Conceptually, the project explores connection and presence. A single click, sound, timed pulse, or random event becomes a visible wave that affects the whole canvas. Instead of making perfectly clean geometric circles, we wanted the work to feel more organic, meditative, and alive.

## Techniques

This project was built with **p5.js** using a shared `Ripple` class. The class stores each ripple's position, source, radius, alpha, color, and noise profile. In `sketch.js`, the program gathers values from each mechanic, creates new `Ripple` objects when needed, then updates and displays every active ripple each frame.

Key p5.js techniques include:

- `createCanvas(windowWidth, windowHeight)` to create a responsive full-screen canvas.
- `millis()` to track ripple age, input press duration, and timed pulse events.
- `random()` to create autonomous ripples, varied ripple profiles, secondary ripple positions, and organic timing.
- `noise()` to deform ripple edges with Perlin noise so the rings feel more like water.
- `sin()`, `cos()`, and `vertex()` to draw custom distorted elliptical rings.
- `blendMode(SCREEN)` to make overlapping rings glow like light reflecting on water.
- `mousePressed()` and `mouseReleased()` to turn user input into ripple energy.
- `p5.FFT() to analyse bass and treble frequency content from the audio track and drive ripple behaviour.
- `loadSound() and p5.Amplitude() to load audio files and measure sound intensity for audio-reactive interactions.

The project is structured so that each mechanic returns values or events, while `sketch.js` stays responsible for combining them and creating ripples. This keeps the mechanics separate but allows them to act on the same visual system.

## Mechanic Ownership

**Ruitong Zhou - User Input**

The user input mechanic turns mouse interaction into ripple events. A longer press creates a stronger ripple by mapping press duration to intensity. This makes user interaction feel like physical energy being placed into the water.

**Shan Jin - Audio**

The audio mechanic is designed to connect sound with the ripple system. Its value can be used to increase ripple deformation, allowing music to influence the movement of the water surface. (Ripples are a particle state, distinct from random)

**Huginn Xing - Noise and Randomness**

The noise and randomness mechanic adds organic variation to the piece. It creates random autonomous ripples, gives each ripple a different noise profile, uses Perlin noise to distort ripple edges, and adds short-lived secondary ripples around input-generated ripples. Secondary ripples use the same color as their parent input ripple, only show two rings, and fade faster so they feel like smaller chain reactions.

**Ruidong Xu - Time-Based System**

The time-based mechanic controls ripple lifecycle and autonomous pulse events. It uses easing functions to expand and fade ripples over time, keeping the canvas balanced while still maintaining a continuous breathing rhythm.

## AI Acknowledgement

ChatGPT was used to help review the project structure, explain how the four mechanics connect, and assist with writing some logic sturcuture like secondary ripple generation.

ChatGPT was also used to check grammar and sentence sturcture to enhance readibility.

## External References

- [p5.js](https://p5js.org/) was used as the main creative coding library for drawing, timing, randomness, noise, and interaction.
- [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) was included for the audio mechanic.
- [p5.js noise reference](https://p5js.org/reference/#/p5/noise) influenced the Perlin noise technique used to distort the ripple edges.

## Interaction Instructions

Open `index.html` in the `Final_Ripple` folder.

- Wait without interacting to see timed pulse ripples and random autonomous ripples.
- Click anywhere on the canvas to create a ripple.
- Click anywhere on the canvas to play the music.
- Hold the mouse button longer before releasing to create a stronger input ripple.
- Watch for smaller secondary ripples that may appear near input-generated ripples.
- Also canvas will adapt to the screen size.
