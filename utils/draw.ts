import { DetectedObject } from "@tensorflow-models/coco-ssd";

export function drawOnCanvas(
  mirrored: boolean,
  predictions: DetectedObject[],
  ctx: CanvasRenderingContext2D | null | undefined
) {
  predictions.forEach((detectedObject: DetectedObject) => {
    const { class: name, bbox, score } = detectedObject;
    const [x, y, width, height] = bbox;

    if (ctx) {
      ctx.beginPath();

      //styling
      ctx.fillStyle = name === "person" ? "red" : "00B612";
      ctx.globalAlpha = 0.4;

      mirrored
        ? ctx.roundRect(ctx.canvas.width - x, y, -width, height, 0)
        : ctx.roundRect(x, y, width, height, 8);

      ctx.fill();

      //draw stroke
      ctx.font = "12px Courier New";
      ctx.globalAlpha = 1;

      mirrored
        ? ctx.fillText(name, ctx.canvas.width - x, y)
        : ctx.fillText(name, x, y);
    }
  });
}
