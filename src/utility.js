import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
export const onGenerateRandomNumber = (min = 50, max = 250) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const onPlaceDiv = (width, height, allDivCordinates) => {
  let marginLeft, marginTop, currentCordinates, isOverlap;
  const divHeight = Number(height.slice(0, -2));
  const divWidth = Number(width.slice(0, -2));
  marginLeft = onGenerateRandomNumber(0, CANVAS_WIDTH - divWidth);
  marginTop = onGenerateRandomNumber(0, CANVAS_HEIGHT - divHeight);

  currentCordinates = getDivCoordinates(
    marginLeft,
    marginTop,
    divWidth,
    divHeight
  );
  if (allDivCordinates.length > 0) {
    isOverlap = true;
    while (isOverlap) {
      isOverlap = checkOverLap(allDivCordinates, currentCordinates);
      if (!isOverlap) {
        isOverlap = false;
        return {
          marginLeft,
          marginTop,
          currentCordinates,
        };
      }
      marginLeft = onGenerateRandomNumber(0, CANVAS_WIDTH - divWidth);
      marginTop = onGenerateRandomNumber(0, CANVAS_HEIGHT - divHeight);
      currentCordinates = getDivCoordinates(
        marginLeft,
        marginTop,
        divWidth,
        divHeight
      );
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
    D: { x: left + width, y: top + height },
  };
}

export function checkOverLap(cordinates, currentDiv) {
  let isOverlap = false;
  const { A: A_, B: B_, C: C_, D: D_ } = currentDiv;
  for (let i = 0; i < cordinates.length; i++) {
    const { A, B, C, D } = cordinates[i];
    if (
      //check if current div corner overlap existing div
      (A_.x >= A.x && A_.x <= D.x && A_.y >= B.y && A_.y <= D.y) ||
      (B_.x >= A.x && B_.x <= D.x && B_.y >= B.y && B_.y <= D.y) ||
      (C_.x >= A.x && C_.x <= D.x && C_.y >= B.y && C_.y <= D.y) ||
      (D_.x >= A.x && D_.x <= D.x && D_.y >= B.y && D_.y <= D.y) ||
      //chekc vice versa if existing div corner overlap current
      (A.x >= A_.x && A.x <= D_.x && A.y >= B_.y && A.y <= D_.y) ||
      (B.x >= A_.x && B.x <= D_.x && B.y >= B_.y && B.y <= D_.y) ||
      (C.x >= A_.x && C.x <= D_.x && C.y >= B_.y && C.y <= D_.y) ||
      (D.x >= A_.x && D.x <= D_.x && D.y >= B_.y && D.y <= D_.y) ||
      // check case when none of the corners overlap but body
      (A_.x >= A.x && A_.x <= D.x && A_.y < B.y && C_.y > C.y)
    ) {
      isOverlap = true;
    }
  }
  return isOverlap;
}

export const handleClick = (e, set, parentDiv) => {
  for (const child of parentDiv.children) {
    child.style.background = "yellow";
  }
  e.target.style.background = "red";
  set(e.target);
};
export const handleMove = (e, curr, speed) => {
  let distanceFromLeft = Number(curr.style.marginLeft.slice(0, -2));
  let distanceFromTop = Number(curr.style.marginTop.slice(0, -2));

  if (e.keyCode === 37) {
    //left
    distanceFromLeft--;
    curr.style.marginLeft = `${distanceFromLeft - speed}px`;
  }
  if (e.keyCode === 39) {
    // right
    distanceFromLeft++;
    curr.style.marginLeft = `${distanceFromLeft + speed}px`;
  }
  if (e.keyCode === 40) {
    //down
    distanceFromTop++;
    curr.style.marginTop = `${distanceFromTop + speed}px`;
  }
  if (e.keyCode === 38) {
    //up
    distanceFromTop--;
    curr.style.marginTop = `${distanceFromTop - speed}px`;
  }
};
export const onClear = (parentDiv) => {
  let child = parentDiv.lastElementChild;
  while (child) {
    parentDiv.removeChild(child);
    child = parentDiv.lastElementChild;
  }
};
