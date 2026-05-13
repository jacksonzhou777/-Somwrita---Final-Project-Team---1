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

*   **[Ruitong Zhou] - User Input**
    *   **Description:** This mechanic captures mouse clicks or touch events to define the $(x, y)$ coordinates for new ripple instances. Each click acts as a "drop" in the water, triggering the radial expansion of a `Ripple` object.
    *   **Connection:** It provides the primary interactive layer, allowing users to directly influence the visual outcome of the piece.
    *   **Reference:** [p5.js Mouse Interaction](https://p5js.org/reference/p5/mouseClicked/)

*   **[Shan Jin] - Audio**
    *   **Description:** Using the `p5.AudioIn` library, this mechanic monitors real-time sound levels. The volume (amplitude) is mapped to the initial radius and stroke weight of the ripples created.
    *   **Connection:** This connects the physical energy of the environment to the digital visualization, making the ripples "react" to the surrounding soundscape.

*   **[Member 3 Name] - Perlin Noise**
    *   **Description:** Instead of rendering perfect geometric circles, this mechanic uses **Perlin noise** to displace the vertices of each ripple ring. This creates an organic, shimmering effect that mimics real fluid dynamics.
    *   **Connection:** It enhances the visual "depth" and realism, moving away from a sterile digital look to a more natural, fluid aesthetic.

*   **[Member 4 Name] - Time-based**
    *   **Description:** This mechanic utilizes the `frameCount` and internal timers to manage the lifecycle of each ripple. As time progresses, the ripple’s radius increases while its `alpha` (transparency) value decreases.
    *   **Connection:** This simulates the natural energy loss (amplitude decay) of a wave, ensuring the canvas remains balanced and meditative.

---

## Part 3: Putting It Together

The mechanics will converge on a shared p5.js canvas where **User Input** and **Audio** serve as the primary triggers for creating ripple objects. **Perlin Noise** will then distort these objects in real-time to add texture, while the **Time-based** decay system ensures a constant, flowing turnover of visuals. Conceptually, the project is unified by the theme of "impact and connection," using code to translate physical presence into a coherent, liquid visual language.
