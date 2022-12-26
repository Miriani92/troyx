import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

//const xRange = Array.from({ length: CANVAS_WIDTH }, (v, i) => i);
//const yRange = Array.from({ length: CANVAS_HEIGHT }, (v, i) => i);

export const onGenerateRandomNumber = (min = 50, max = 250) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const onPlaceDiv = (width, height, allDivCordinates) => {
  let marginLeft, marginTop, currentCordinates, isOverlap;
  const divHeight = Number(height.slice(0, -2));
  const divWidth = Number(width.slice(0, -2));
  console.log("before generate left and right");
  marginLeft = onGenerateRandomNumber(0, CANVAS_WIDTH - divWidth);
  marginTop = onGenerateRandomNumber(0, CANVAS_HEIGHT - divHeight);

  currentCordinates = getDivCoordinates(
    marginLeft,
    marginTop,
    divHeight,
    divWidth
  );
  if (allDivCordinates.length > 0) {
    isOverlap = true;
    while (isOverlap) {
      isOverlap = checkOverLap(allDivCordinates, currentCordinates);
      console.log(isOverlap);
      if (!isOverlap) {
        isOverlap = false;
        return {
          marginLeft,
          marginTop,
          currentCordinates,
        };
      } else {
        marginLeft = onGenerateRandomNumber(0, CANVAS_WIDTH - divWidth);
        marginTop = onGenerateRandomNumber(0, CANVAS_HEIGHT - divHeight);
        currentCordinates = getDivCoordinates(
          marginLeft,
          marginTop,
          divHeight,
          divWidth
        );
      }
    }
  }
  return {
    marginLeft,
    marginTop,
    currentCordinates,
  };
};

export function getDivCoordinates(left, top, width, height) {
  return {
    A: { x: left, y: top },
    B: { x: left + width, y: top },
    C: { x: left, y: top + height },
    D: { x: left + width, y: height + height },
  };
}

export function checkOverLap(cordinates, currentDiv) {
  let isOverlap = false;
  const { A: A_, B: B_, C: C_, D: D_ } = currentDiv;
  for (let i = 0; i < cordinates.length; i++) {
    const { A, B, C, D } = cordinates[i];
    if (
      (A_.x >= A.x && A_.x <= D.x && A_.y >= B.y && A_.y <= D.y) ||
      (B_.x >= A.x && B_.x <= D.x && B_.y >= B.y && B_.y <= D.y) ||
      (C_.x >= A.x && C_.x <= D.x && C_.y >= B.y && C_.y <= D.y) ||
      (D_.x >= A.x && D_.x <= D.x && D_.y >= B.y && D_.y <= D.y)
    ) {
      isOverlap = true;
    }
  }
  return isOverlap;
}
