/**
 * draw image to canvas from source image
 * 
 * @param {number} gapWidthPercent 
 * @param {number} imgRawWidth 
 * @param {number} imgRawHeight 
 */
export const drawHeroImageBy = (gapWidthPercent, imgRawWidth, imgRawHeight) => {
  let srcImg = document.getElementById("heroImage");
  let heroContainer = document.getElementsByClassName('hero-container').item(0)
  let cw = heroContainer.clientWidth
  let ch = heroContainer.clientHeight

  let canvasBlack = document.getElementById("hero_canvas_black");
  canvasBlack.setAttribute('width', cw)
  canvasBlack.setAttribute('height', ch)

  let ctxBlack = canvasBlack.getContext("2d");
  // ctxBlack.fillStyle = 'black';
  // ctxBlack.fillRect(0, 0, cw, ch);
  ctxBlack.clearRect(0, 0, cw, ch)

  ctxBlack.drawImage(
    srcImg, // source
    imgRawWidth*gapWidthPercent/2, 0, // start point
    imgRawWidth*(1 - gapWidthPercent)/2, imgRawHeight, // image size
    0, 0, // put to where
    canvasBlack.width*(1 - gapWidthPercent)/2, canvasBlack.height*1.4  // half canvas size
  )

  ctxBlack.drawImage(
    srcImg, // source
    imgRawWidth/2, 0, // start from right part of image
    imgRawWidth*(1 - gapWidthPercent)/2, imgRawHeight, // image size
    canvasBlack.width*(1 + gapWidthPercent)/2, 0, // put to right part of canvas
    canvasBlack.width*(1 - gapWidthPercent)/2, canvasBlack.height*1.4 // half canvas size
  )
}
