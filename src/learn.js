// Returns largest div's width and height
function getMaxDimension(arr) {
  var maxWidth = 0;
  for (var i = 0; i < div_selection.length; i++) {
    if (div_selection[i].offsetWidth > maxWidth) {
      maxWidth = div_selection[i].offsetWidth;
    }
  }
  var maxHeight = 0;
  for (var i = 0; i < div_selection.length; i++) {
    if (div_selection[i].offsetHeight > maxHeight) {
      maxHeight = div_selection[i].offsetHeight;
    }
  }
  var values = {
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  };
  return values;
}

// Retruns a random number x; min < x < max
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// returns the position in xy-space of every corner of a rectangular div
function getOffset(element) {
  var position_x = element.offsetLeft;
  var position_y = element.offsetTop;
  var height_x = element.offsetWidth;
  var height_y = element.offsetHeight;
  var tolerance = 0; // will get doubled
  return {
    A: {
      y: position_y - tolerance,
      x: position_x - tolerance,
    },
    B: {
      y: position_y + height_x + tolerance,
      x: position_x - tolerance,
    },
    C: {
      y: position_y + height_x + tolerance,
      x: position_x + height_y + tolerance,
    },
    D: {
      y: position_y - tolerance,
      x: position_x + height_y + tolerance,
    },
  };
}

// Returns true if any corner is inside the coordinates of the other div
function getOverlap(div1, div2) {
  coor_1 = getOffset(document.getElementById(div1));
  coor_2 = getOffset(document.getElementById(div2));
  // this will return the obj
  return (
    (coor_1.A.x <= coor_2.A.x &&
      coor_2.A.x <= coor_1.D.x &&
      coor_1.A.y <= coor_2.A.y &&
      coor_2.A.y <= coor_1.B.y) ||
    (coor_1.A.x <= coor_2.B.x &&
      coor_2.B.x <= coor_1.D.x &&
      coor_1.A.y <= coor_2.B.y &&
      coor_2.B.y <= coor_1.B.y) ||
    (coor_1.A.x <= coor_2.C.x &&
      coor_2.C.x <= coor_1.D.x &&
      coor_1.A.y <= coor_2.C.y &&
      coor_2.C.y <= coor_1.B.y) ||
    (coor_1.A.x <= coor_2.D.x &&
      coor_2.D.x <= coor_1.D.x &&
      coor_1.A.y <= coor_2.D.y &&
      coor_2.D.y <= coor_1.B.y)
  );
}

// Number to Letter
function getChar(n) {
  var ordA = "a".charCodeAt(0);
  var ordZ = "z".charCodeAt(0);
  var len = ordZ - ordA + 1;

  var s = "";
  while (n >= 0) {
    s = String.fromCharCode((n % len) + ordA) + s;
    n = Math.floor(n / len) - 1;
  }
  return s;
}

var div_selection = document.getElementsByClassName("random");

maxDimensions = getMaxDimension(div_selection);
var widthBoundary = maxDimensions.maxWidth;
var heightBoundary = maxDimensions.maxHeight;

for (var i = 0; i < div_selection.length; i++) {
  var isOverlapping = false;
  var attemptCount = 0;
  do {
    randomLeft = getRandomNumber(0, window.innerWidth - widthBoundary);
    randomTop = getRandomNumber(0, window.innerHeight - heightBoundary);
    div_selection[i].style.left = randomLeft + "px";
    div_selection[i].style.top = randomTop + "px";
    isOverlapping = false;
    for (var j = 0; j < i; j++) {
      if (getOverlap(getChar(i), getChar(j))) {
        isOverlapping = true;
        break;
      }
    }
  } while (++attemptCount < 50 && isOverlapping);
}

// check every element
for (var i = 0; i < div_selection.length; i++) {
  for (var j = i + 1; j < div_selection.length; j++) {
    console.log(i, j);
    console.log(getChar(i), getChar(j));
    console.log(getOverlap(getChar(i), getChar(j)));
  }
}
