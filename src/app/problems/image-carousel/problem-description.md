Build an image carousel that displays a sequence of images.

# Requirements
- The image carousel component takes in an array of image URLs. Example image URLs are provided in the skeleton code.
- Layout and positioning:
    - The image carousel should be centered on the screen with a maximum size of 600px by 400px.
    - Images should shrink to fit within the carousel so that the entire image is visible. Empty parts of the carousel can be filled with black.
    - If the screen width is smaller than the image, the carousel should be resized to fit within the available horizontal space.
- Navigation:
    - Add left/right navigation buttons to allow the user to navigate through the images. The buttons should allow a cycling behavior, i.e. after the last image, the image cycles back to the first.
    - Add page buttons at the bottom to directly jump to an image. You may assume there will be fewer than 10 images.
- Animations and transitions are not necessary for this question.
For this question, a technical restriction is there should only be one image element in the DOM at any one time.