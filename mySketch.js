let day = 144;
let data = {
  seed: 555,
  mintingTime: 1725069600000 - 88200000 * day,
  lastWateredTime: Date.now(),
};
let DNA;
let leafColor1, leafColor2, leafColor3;
let currentTime = Date.now();
let mintingTime;
let SVGCanvas;
let graphics;
let stars = [];
let seed;
let bigArray = [];
let indexTree = 0;
let indexTreeFlag = false;
let frameCountIndex = 0;
let frameCountIndexUpdater = 0;
let recursiveCount = 180;
let growing = true;
let theta = 0;
let index = 0;
let treePoints = [];
let changeM = 0.1;
let splitL = 70;
let splitM = 0.95;
let splitN = 800;
let shortenM = 0.6;
let minR = 0.6;
let growSpeed = 2.0;
let maxThickness = 15.0;
let aVeryBigArray = [];
let updateTreeSpeed = 10;
let initialRandomVariables = [];
let colorGreen1;
let drawing = true;
let leafDrawnFlag = false;
let branchDrawnFlag = false;
let rH = 910;
let w, h;
let ratio = 1.4;
let rRatio;
let drawingCanvas;
function setup() {
  h = windowHeight;
  h = 910;
  w = h * ratio;
  rRatio = h / rH;
  rH = h;
  drawingCanvas = createGraphics(w, h);
  console.log(
    "w",
    w,
    "h",
    h,
    "rRatio",
    rRatio,
    "rH",
    rH,
    "current time",
    currentTime
  );
  mintingTime = data.mintingTime;
  seed = data.seed;
  leafColor1 = color(255, 182, 193, 255);
  leafColor2 = color(255, 182, 193, 200);
  leafColor3 = color(255, 182, 193, 150);
  let checkIfAlive =
    data.lastWateredTime + 604800000 < currentTime ? false : true;
  console.log("The tree is alive:", checkIfAlive);
  DNA = [
    0,
    [leafColor1, leafColor2, leafColor3],
    20,
    6,
    800,
    1.2,
    checkIfAlive,
  ];
  splitN = DNA[4];
  splitM = 0.87 + DNA[3] / 100;
  newW = windowHeight * ratio;
  SVGCanvas = createCanvas(newW, windowHeight);
  drawingCanvas.noFill();
  randomSeed(seed);
  noiseSeed(seed);
  graphics = createGraphics(w, h);
  for (let i = 0; i < 500; i++) {
    stars.push([
      random(0, w),
      random(0, (h / 4) * 3),
      random(0, w),
      random(30, 70),
      random(10),
      random(0.5, 1.5),
    ]);
  }
  growSpeed = h / 800.0;
  maxThickness = h / 50.0;
  graphics.noStroke();
  graphics.fill(50);
  treePoints = [];
  treePoints.push([w / 2.8, h * 0.79, maxThickness, 0, true, HALF_PI, false]);
  drawTreeRecursively();
  frameCountIndexUpdater = frameCountIndex;
  calculateTreeProgress();
  console.log("tree points length ", treePoints.length);
}
function drawTreeRecursively() {
  if (recursiveCount < 0) {
    return;
  }
  recursiveCount--;
  frameCountIndex++;
  graphics.push();
  graphics.translate(0, 120);
  updateTree2();
  for (let [index, element] of treePoints.entries()) {
    graphics.fill(
      66,
      40,
      14,
      (element[2] / maxThickness) *
        (0.8 + 0.2 * (1 - element[3] / splitL)) *
        100 +
        50
    );
    graphics.circle(element[0], element[1] + h * 0.078, element[2] * DNA[5]);
  }
  graphics.pop();
  drawTreeRecursively();
}
function drawGraphics() {
  indexTree = 0;
  drawGrass(graphics, 30);
  drawGrass(graphics, 0);
}
function calculateDaysPassed() {
  let timeElapsed = currentTime - mintingTime;
  let daysPassed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  console.log("Days passed since minting:", daysPassed);
}
let progress = 0;
let requiredSplits = 0;
function calculateTreeProgress() {
  let timeOf7Months = 10368000000;
  let timeElapsed = currentTime - mintingTime;
  progress = (timeElapsed / timeOf7Months) * 100;
  progress = Math.min(progress, 100);
  console.log(progress, "progress");
  requiredSplits = (progress / 100) * DNA[4];
  console.log(requiredSplits, "requiredSplits");
  calculateDaysPassed();
}
function drawLeaf(element) {
  if (!DNA[6]) {
    element[6] = true;
    return;
  }
  indexTreeFlag = true;
  indexTree = 120;
  if (DNA[0] === 0)
    leaf1(graphics, element[0], element[1] + h * 0.078, indexTree);
  else if (DNA[0] === 1)
    leaf2(graphics, element[0], element[1] + h * 0.078, indexTree, element[5]);
  else if (DNA[0] === 2)
    flower(graphics, element[0], element[1] + h * 0.078, indexTree);
  element[6] = true;
}
function drawBranch(element) {
  graphics.fill(
    66,
    40,
    14,
    (element[2] / maxThickness) *
      (0.8 + 0.2 * (1 - element[3] / splitL)) *
      100 +
      50
  );
  graphics.circle(element[0], element[1] + h * 0.078, element[2] * DNA[5]);
}
function drawTree() {
  for (let [index, element] of treePoints.entries()) {
    if (element[4] === false && index > 5) {
      if (!element[6]) {
        drawLeaf(element);
      }
    } else {
      if (drawing && growing) drawBranch(element);
    }
  }
}
let draws = 0;
let treeGrowthIndex = 0;
function draw() {
  clear();
  draws++;
  treeGrowthIndex = treePoints.length;
  drawingCanvas.clear();
  if (growing == false) indexTree += 0.1;
  graphics.push();
  graphics.translate(0, 120);
  if (true) {
    if (treeGrowthIndex >= requiredSplits) {
      drawing = false;
      if (progress == 100) drawing = true;
    }
    if (drawing) updateTree();
    frameCountIndexUpdater++;
    drawTree();
  }
  graphics.pop();
  prettyBackground();
  drawingCanvas.image(graphics, 0, 0);
  drawGraphics();
  let r = drawingCanvas.width / drawingCanvas.height;
  let newW = windowHeight * r;
  image(drawingCanvas, 0, 0, newW, windowHeight);
  for (let i = 0; i < 500; i++) {
    stars[i] = [
      stars[i][0],
      stars[i][1],
      random(0, w),
      random(30, 70),
      random(10),
      random(0.5, 1.5),
    ];
  }
}
function updateTree() {
  let no = 0.0;
  growing = false;
  for (let element of treePoints) {
    no += 5;
    if (element[4] === false) continue;
    element[5] += (noise(frameCountIndexUpdater / 40.0, no) - 0.45) * changeM;
    let directionM;
    let k;
    if (element[1] < h * 0.73) {
      if (frameCountIndexUpdater < 120) {
        directionM = atan2(h * 1.11 - element[1], element[0] - w / 2);
      } else {
        directionM = atan2(h * 0.78 - element[1], element[0] - w / 2);
      }
      k = 0.01;
    } else {
      directionM = atan2(h * 0.85 - element[1], element[0] - w / 2);
      if (frameCountIndexUpdater < 120) k = 0.01;
      else k = 0.05;
    }
    directionM += map(noise(frameCountIndexUpdater * 0.1), 0, 1, -PI, PI);
    element[5] = k * directionM + (1 - k) * element[5];
    element[0] += cos(element[5]) * growSpeed;
    element[1] -= sin(element[5]) * growSpeed;
    element[3] += 1;
    if (element[3] > splitL || element[2] < 1.2) {
      if (random() > splitM) {
        if (element[2] > minR && treePoints.length < splitN) {
          let SN = 0;
          if (element[2] > 13.0) SN = 3;
          else if (element[2] > 8.0) SN = 3;
          else if (element[2] > 4.0) SN = 3;
          else SN = 2;
          if (element[2] > 13.0) {
            for (let i = 0; i < SN; i++) {
              let rnd = random() * 2.5 + 0.4;
              treePoints.push([
                element[0],
                element[1],
                (element[2] * shortenM * (random() * 20 + 90)) / 100.0,
                0,
                true,
                HALF_PI + ((i - (SN - 1) / 2.0) / (SN - 1)) * rnd,
                false,
              ]);
            }
          } else {
            for (let i = 0; i < SN; i++) {
              let rnd;
              if (SN == 2) rnd = random();
              else rnd = random() * 2.0 + 0.4;
              treePoints.push([
                element[0],
                element[1],
                (element[2] * shortenM * (random() * 20 + 90)) / 100.0,
                0,
                true,
                element[5] + ((i - (SN - 1) / 2.0) / (SN - 1)) * rnd,
                false,
              ]);
            }
          }
        }
        element[4] = false;
      }
    }
    if (element[4] === true) {
      growing = true;
    }
  }
}
function updateTree2() {
  let no = 0.0;
  growing = false;
  for (let element of treePoints) {
    no += 5;
    if (element[4] === false) continue;
    element[5] += (noise(frameCountIndex / 40.0, no) - 0.45) * changeM;
    let directionM;
    let k;
    if (element[1] < h * 0.73) {
      if (frameCountIndex < 120) {
        directionM = atan2(h * 1.11 - element[1], element[0] - w / 2);
      } else {
        directionM = atan2(h * 0.78 - element[1], element[0] - w / 2);
      }
      k = 0.01;
    } else {
      directionM = atan2(h * 0.85 - element[1], element[0] - w / 2);
      if (frameCountIndex < 120) k = 0.01;
      else k = 0.05;
    }
    directionM += map(noise(frameCountIndex * 0.1), 0, 1, -PI, PI);
    element[5] = k * directionM + (1 - k) * element[5];
    element[0] += cos(element[5]) * growSpeed;
    element[1] -= sin(element[5]) * growSpeed;
    element[3] += 1;
    if (element[3] > splitL || element[2] < 1.2) {
      if (random() > splitM) {
        if (element[2] > minR && treePoints.length < splitN) {
          let SN = 0;
          if (element[2] > 13.0) SN = 3;
          else if (element[2] > 8.0) SN = 3;
          else if (element[2] > 4.0) SN = 3;
          else SN = 2;
          if (element[2] > 13.0) {
            for (let i = 0; i < SN; i++) {
              let rnd = random() * 2.5 + 0.4;
              treePoints.push([
                element[0],
                element[1],
                (element[2] * shortenM * (random() * 20 + 90)) / 100.0,
                0,
                true,
                HALF_PI + ((i - (SN - 1) / 2.0) / (SN - 1)) * rnd,
                false,
              ]);
            }
          } else {
            for (let i = 0; i < SN; i++) {
              let rnd;
              if (SN == 2) rnd = random();
              else rnd = random() * 2.0 + 0.4;
              treePoints.push([
                element[0],
                element[1],
                (element[2] * shortenM * (random() * 20 + 90)) / 100.0,
                0,
                true,
                element[5] + ((i - (SN - 1) / 2.0) / (SN - 1)) * rnd,
                false,
              ]);
            }
          }
        }
        element[4] = false;
      }
    }
    if (element[4] === true) {
      growing = true;
    }
  }
}
function leaf2(graphics, x, y, decrease, angle) {
  if (decrease === 0) return;
  if (decrease > 120) decrease = 120;
  let cx = x;
  let cy = y;
  if (random(100) < DNA[2]) return;
  graphics.push();
  graphics.noStroke();
  graphics.strokeWeight(0.1);
  graphics.stroke(0);
  graphics.fill(random(DNA[1]));
  graphics.translate(cx, cy);
  graphics.rotate((angle + 4) * 1.1);
  leafShape();
  graphics.rotate((angle + 4) * 1.1);
  leafShape();
  graphics.pop();
}
function leafShape() {
  graphics.push();
  graphics.beginShape();
  graphics.vertex(0, -30);
  graphics.vertex(5, -22);
  graphics.vertex(0, 0);
  graphics.vertex(-5, -22);
  graphics.endShape(CLOSE);
  graphics.pop();
}
function leaf1(graphics, x, y, decrease) {
  if (decrease === 0) return;
  if (decrease > 120) decrease = 120;
  let cx = x;
  let cy = y;
  if (random(100) < DNA[2]) return;
  graphics.push();
  graphics.noStroke();
  graphics.strokeWeight(0.1);
  graphics.stroke(0);
  graphics.fill(random(DNA[1]));
  graphics.circle(cx, cy, 14);
  graphics.pop();
}
function flower(graphics, x, y, decrease) {
  if (decrease > 120) decrease = 120;
  let cx = x;
  let cy = y;
  if (random(100) < 70) return;
  graphics.push();
  graphics.noStroke();
  graphics.fill(color(240, 98, 146, (255 * decrease) / 120));
  let outerRadius =
    (((random(9, 14) + random(9, 14) + random(9, 14)) / 3) * decrease) / 120;
  let innerRadius = (((random(6, 9) + random(6, 9)) / 2) * decrease) / 120;
  let angle = TWO_PI / 9;
  let halfAngle = angle / 2.0;
  if (decrease > 0) {
    graphics.beginShape();
    for (let i = 0; i < TWO_PI; i += angle) {
      let sx = cx + cos(i) * outerRadius;
      let sy = cy + sin(i) * outerRadius;
      graphics.curveVertex(sx, sy);
      sx = cx + cos(i + halfAngle) * innerRadius;
      sy = cy + sin(i + halfAngle) * innerRadius;
      graphics.curveVertex(sx, sy);
    }
    graphics.endShape(CLOSE);
    graphics.fill("#222");
    graphics.circle(cx, cy, (4 * decrease) / 120);
  }
  graphics.pop();
}
function drawGrass(graphics, offY) {
  let n;
  for (let x = -15; x < w + 15; x += 1.5) {
    let offsetX = 0;
    let offsetY = 0;
    n = noise(x * 0.1);
    offsetX += n * 20 - 10;
    offsetY += noise(x * 10) * 60;
    n = noise(x * 0.01 + millis() * -0.001);
    offsetX += n * 40;
    drawingCanvas.stroke(random(40, 100), 0, 30, offsetY * 2);
    drawingCanvas.line(x, h, x + offsetX, h - offsetY - random(offY));
  }
}
function easeIn(x) {
  return sin((x * PI) / 2);
}
let frameCountReplacement;
function prettyBackground() {
  setGradient();
  drawingCanvas.noStroke();
  let timeSinceMinting = currentTime - mintingTime;
  let cyclePosition = (timeSinceMinting % cycleLength) / cycleLength;
  frameCountReplacement = cyclePosition * 400;
  for (let i = 0; i < 500; i++) {
    drawingCanvas.push();
    let sh = stars[i][1];
    let sw = stars[i][2];
    let sLong = stars[i][3];
    let randomConditional = stars[i][4];
    let starFlicker = stars[i][5];
    if (
      randomConditional > 9.99 &&
      sh < h / 2 &&
      (frameCountReplacement % 400 < 100 || frameCountReplacement % 400 > 300)
    ) {
      drawingCanvas.push();
      drawingCanvas.rotate(0.2);
      for (let j = 0; j < sLong; j++) {
        drawingCanvas.fill(255, 255, 255, map(j, 0, sLong, 255, 0));
        drawingCanvas.circle(sw - j, sh, 2);
      }
      drawingCanvas.pop();
    } else {
      drawingCanvas.fill(
        255,
        255,
        255,
        frameCountReplacement % 400 < 100 || frameCountReplacement % 400 > 300
          ? map(sh, 0, (h / 4) * 3, 255, 0)
          : 0
      );
      drawingCanvas.circle(
        stars[i][0],
        sh,
        map(sin(frameCountReplacement / 20 + i) * starFlicker, 0, 1, 1, 4)
      );
    }
    drawingCanvas.pop();
  }
  if (frameCountReplacement % 400 < 100 || frameCountReplacement % 400 > 300) {
    drawingCanvas.push();
    let lunarConstraint = 0;
    let k, r, l;
    k = 60;
    r = -75;
    l = -103;
    drawingCanvas.fill("#FFCE3D");
    drawingCanvas.translate(w / 3, moonY);
    drawingCanvas.rotate(-0.5);
    fill(255);
    drawingCanvas.beginShape();
    drawingCanvas.vertex(0, -k);
    drawingCanvas.bezierVertex(r, -k, r, k, 0, k);
    drawingCanvas.bezierVertex(l, k, l, -k, 0, -k);
    drawingCanvas.endShape(CLOSE);
    drawingCanvas.pop();
    if (frameCountReplacement % 400 < 100) {
      lunarConstraint = map(frameCountReplacement % 400, 0, 100, h / 2, -100);
    } else if (frameCountReplacement % 400 > 300) {
      lunarConstraint = map(
        frameCountReplacement % 400,
        300,
        400,
        h + 100,
        h / 2
      );
    }
    moonY = lunarConstraint;
    if (moonY < -100) {
      moonY = h + 200;
    }
  } else {
    moonY = h + 100;
  }
}
let moonY = 400;
const cycleLength = 24 * 60 * 60 * 1000;
function setGradient() {
  drawingCanvas.noStroke();
  let from = color(248, 162, 108);
  let to = color(72, 61, 139);
  drawingCanvas.colorMode(RGB);
  let timeSinceMinting = currentTime - mintingTime;
  let cyclePosition = (timeSinceMinting % cycleLength) / cycleLength;
  let frameCountReplacement = cyclePosition * 400;
  let interA = lerpColor(
    from,
    to,
    abs(((frameCountReplacement % 400) - 200) / 200)
  );
  let interC = lerpColor(
    color(255, 100, 100),
    color(0, 155, 255),
    abs(((frameCountReplacement % 200) - 100) / 100)
  );
  let white = color(255, 255, 240);
  let black = color(30, 30, 30);
  for (let i = 0; i <= 100; i++) {
    let final = lerpColor(
      white,
      black,
      abs(((frameCountReplacement % 400) - 200) / 200)
    );
    let interD = lerpColor(final, interC, i / 100);
    let interB = lerpColor(interA, interD, i / 100);
    drawingCanvas.fill(interB);
    drawingCanvas.stroke(interB);
    drawingCanvas.rect(0, (i * h) / 100, w, h / 100);
  }
  drawingCanvas.noStroke();
}
function windowResized() {
  newW = windowHeight * ratio;
  resizeCanvas(newW, windowHeight);
}
