/**
 * Represents a single layer of the game's background. It extends MovableObject to inherit
 * basic properties like position and image loading capabilities. This class is specifically
 * designed to handle parallax scrolling by using a `parallaxFactor`.
 *
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /**
   * The width of the background object's image.
   * @type {number}
   * @default 720
   */
  width = 720;

  /**
   * The height of the background object's image.
   * @type {number}
   * @default 480
   */
  height = 480;

  /**
   * The parallax factor for this background layer. This value determines how fast the layer
   * moves in relation to the camera's movement, creating an illusion of depth.
   * A value of 1 means the object moves with the foreground (i.e., no parallax effect).
   * A value less than 1 (e.g., 0.5) makes the object appear to move slower and thus further away.
   * @type {number}
   * @default 1
   */
  parallaxFactor = 1;

  /**
   * Creates an instance of a BackgroundObject.
   * Initializes the background object with a specified image, position, and parallax factor.
   *
   * @param {string} imagePath - The path to the image file for this background layer.
   * @param {number} x - The initial horizontal position (x-coordinate) of the background object on the canvas.
   * @param {number} parallaxFactor - The factor to apply for the parallax scrolling effect.
   */
  constructor(imagePath, x, parallaxFactor) {
    super().loadImage(imagePath);
    this.x = x;
    // Positions the background object at the bottom of the canvas.
    this.y = 480 - this.height;
    this.parallaxFactor = parallaxFactor;
  }
}
