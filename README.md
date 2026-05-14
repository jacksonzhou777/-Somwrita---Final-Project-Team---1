# -Somwrita---Final-Project-Team---1
[Somwrita] - Final Project Team - 1
# Quiz 9: Project Pitch - Team Somwrita

## Part 1: Project Direction

*   **Project Path:** We have chosen to **create an original piece**.
*   **Vision and Inspiration:** Our vision is to develop an interactive installation titled **"Liquid Resonance."** Inspired by the natural physics of **water ripples**, we aim to explore how individual actions create collective impact through wave propagation. We draw inspiration from the way ripples expand and decay, symbolizing human connection and the "echo" of our presence in a digital space. Our direction is shaped by meditative interactive art that uses fluid motion to visualize abstract data.

#### Inspiration Sources
![Natural ripple expansion 1](Images/ripple_1.jpg)
![Natural ripple expansion 2](Images/ripple_2.jpg)

---

## Part 2: Mechanics

Our team will implement four distinct mechanics to drive the "Liquid Resonance" experience:

### [Ruitong Zhou] - User Input: The Kinetic Catalyst

**Description:** 
This mechanic transforms user interactions into physical energy within the digital environment. Beyond simple coordinate capture, I have implemented a **Temporal-to-Kinetic Mapping** system:
1. **Pressure Simulation:** By utilizing `millis()` within the `mousePressed()` and `mouseReleased()` events, the system calculates the duration of each click. A longer press duration directly correlates to a higher "Initial Energy" value, resulting in a ripple with a larger maximum radius and a more intense stroke weight.
2. **Reactive Displacement:** The propagation speed ($v$) is not constant. It is dynamically calculated based on the vector distance from the click point $(x, y)$ to the canvas center. This creates a "Reactive Displacement" effect—clicks further from the center generate faster, more aggressive waves, simulating the tension of a physical water surface.
3. **Performance Logic:** To maintain a smooth 60fps experience, I implemented an automated lifecycle manager that prunes the ripple array as soon as an object's energy (alpha) dissipates.

**Connection:** 
This mechanic serves as the **Spatial and Intentional Anchor** for a multi-layered generative ecosystem. Rather than acting in isolation, my input system is designed to trigger and harmonize with the team's other active forces:
* **Synergy with Audio:** My ripples provide the canvas for **Member 2’s (Shan Jin)** audio input to act upon, where real-time sound levels dynamically scale the intensity of the user’s existing waves.
* **Synergy with Noise:** The ripples I generate are immediately influenced by **Member 3’s (Huginn Xing)** Perlin noise, which introduces organic "wind-like" deformations and secondary chain reactions, making a simple click feel like a complex natural event.
* **Synergy with Time:** The lifecycle of my "Kinetic Catalyst" is governed by **Member 4’s (Ruidong Xu)** time-based system, which manages the non-linear decay of the energy I inject, while his autonomous "pulse" events ensure the system remains alive even in the absence of user input.

**Interaction Logic Diagram:**
![Energy Mapping Logic](https://p5js.org/assets/learn/coordinate-system-and-shapes/coords-offset.png)

*   **[Shan Jin] - Audio**
    *   **Description:** Using real-time audio input to generate ripple patterns. Amplitude (volume) controls ripple size and intensity, while frequency content affects spatial placement: low frequencies appear near the center and higher frequencies toward the edges. Ripples expand, overlap, and gradually fade, creating a continuous visual flow.
    *   **Connection:** Users interact through voice or music, directly shaping the visuals in real time. This creates an intuitive feedback loop between sound and image. The expanding circular forms reflect water ripple diffusion, translating the original inspiration into an interactive, time-based generative experience.

*   **[Huginn Xing] - Perlin Noise and Randomness**
    *   **Description:** 1.Ripple edge deformation - Perlin noise distorts the edge of each of each ripple, create irregular forms that more like real water movement. 2.Ripple speed variation - Random numbers make speed variable, make motion more alive.
 ![random sketech 1](Images/Random1.PNG)
  
   * 3.Random ripple generation - Instead of just user input to generate ripples, they will show up as random sizes and positions based on time-based. 4.Secondary ripples - User-input- generated ripples will creates chain reactions, secondary ripples will appear belong main ripples.
![random sketech 2](Images/Random2.PNG)

 *   **Connection:** It enhances the visual "depth" and realism, making the canva more real and alive.

*   **[Ruidong Xu] - Time-based**
    *   **Description:** This mechanic governs the complete lifecycle of every ripple on the canvas using 'frameCount' and interval-based timers. When a ripple is born — whether triggered by user input, audio, or random generation — the time-based system immediately begins tracking its age. As frames accumulate, the ripple's radius expands outward at a controlled rate, while its 'alpha' value follows a non-linear decay curve: fading slowly at first, then accelerating toward full transparency. Beyond individual ripple decay, this mechanic also schedules periodic "pulse" events — autonomous ripples that emerge at timed intervals independent of user action, ensuring the canvas never falls completely silent. The timing intervals themselves shift subtly over time, creating a breathing rhythm that feels organic rather than mechanical. Together, these temporal controls maintain visual balance: preventing ripple accumulation from overwhelming the canvas while preserving a continuous, meditative flow.
    *   **Connection:** By simulating the natural energy dissipation of physical waves, the time-based system ensures the piece remains calm and balanced even during intense interaction. It is the invisible force that keeps "Liquid Resonance" in equilibrium — every impact eventually fades, making space for the next.

---

## Part 3: Putting It Together

The mechanics will converge on a shared p5.js canvas where **User Input** and **Audio** serve as the primary triggers for creating ripple objects. **Perlin Noise** will then distort these objects in real-time to add texture, while the **Time-based** decay system ensures a constant, flowing turnover of visuals. Conceptually, the project is unified by the theme of "impact and connection," using code to translate physical presence into a coherent, liquid visual language.
