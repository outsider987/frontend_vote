// "use client";
import React, { useEffect, useRef, useState } from "react";

const p5 = window.p5;

// // Hook to create and manage the p5 instance

const InteractiveCanvas = ({
  seed = 555,
  mintingTime = 1725069600000 - 88200000 * 144,
  lastWateredTime = 1724698851029,
  gameTime = Date.now(),
  isTestMode = false,
  isFalling = false,
}) => {
  const canvasRef = useRef(null);
  const lastWateredTimeRef = useRef(lastWateredTime);
  const isAliveRef = useRef(isFalling);
  const gameTimeRef = useRef(gameTime);
  useEffect(() => {
    let myP5;

    if (p5) {
      myP5 = new p5((p) => sketch(p), canvasRef.current);
    }
    return () => {
      //   window.removeEventListener("resize", updateDimensions);
      if (myP5) myP5.remove();
    };
  }, []);

  useEffect(() => {
    lastWateredTimeRef.current = lastWateredTime;
  }, [lastWateredTime]);
  useEffect(() => {
    isAliveRef.current = !isFalling;
  }, [isFalling]);

  const sketch = (p) => {
    // test mode
    const updateDateIncrementally = () => {
      const time = 10;
      setTimeout(() => {
        currentTime += (24 * 60 * 60 * 1000) / 800;
        // checkIfAlive =
        //   lastWateredTimeRef.current + days7 < currentTime ? false : true;
        // calculateTreeProgress();
        checkIfAlive = isAliveRef.current;
        updateDateIncrementally();
      }, time);
    };

    // Your p5.js variables
    let DNA;
    let leafColor1, leafColor2, leafColor3;
    let currentTime = Date.now();
    let SVGCanvas;
    let graphics;

    let treePoints = [] as any;
    let frameCountIndex = 0;
    let frameCountIndexUpdater = 0;
    let frameCountReplacement;
    let recursiveCount = 180;
    let growing = true;
    let w, h;
    let ratio = 1.4;
    let rRatio;
    let drawingCanvas;
    let progress = 0;
    let requiredSplits = 0;
    let indexTree = 0;
    const cycleLength = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    let treeGrowthIndex = 0;
    let drawing = true;
    const groundHeight = 200;

    // Tree variables
    let changeM = 0.1;
    let splitL = 70;
    let splitM = 0.95;
    let splitN = 800;
    let shortenM = 0.6;
    let minR = 0.6;
    let growSpeed = 2.0;
    let maxThickness = 15.0;
    let rH = 910;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const days7 = 604800000;
    let checkIfAlive =
      lastWateredTimeRef.current + days7 < currentTime ? false : true;

    p.setup = () => {
      // p.mouseClicked = () => {
      //   p.save("tree.png");
      // };
      if (isTestMode) updateDateIncrementally();
      // h = window.innerHeight;

      h = 910;
      // let wRatio = 0.6;
      // if (window.innerWidth > 916) wRatio = 1.4;
      w = h * ratio;
      // w = window.innerWidth;

      rRatio = h / rH;
      rH = h;

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

      // p.frameRate(4.75);

      drawingCanvas = p.createGraphics(w, h);
      // if (window.innerWidth < 916) {
      //   // Calculate center offset based on the difference between window width and canvas width
      //   let centerOffset = (window.innerWidth - w) / 2;

      //   // Scale down the canvas for mobile
      //   drawingCanvas.scale(0.8, 0.8);

      //   // Translate to center the scaled canvas horizontally and position 20% from top
      //   drawingCanvas.translate(
      //     (centerOffset * 1.25) / 1.55,
      //     window.innerHeight >= 800 ? -10 : -60 // 20% of viewport height
      //   );
      // } else {
      //   // Desktop positioning remains the same
      //   let centerOffset = (window.innerWidth - w) / 2;
      //   let xAdjustment = 0;
      //   drawingCanvas.translate(centerOffset + xAdjustment, 0);
      // }

      leafColor1 = p.color(255, 182, 193, 255);
      leafColor2 = p.color(255, 182, 193, 200);
      leafColor3 = p.color(255, 182, 193, 150);

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
      let newW = windowHeight * ratio;
      SVGCanvas = p.createCanvas(newW, windowHeight);
      drawingCanvas.noFill();

      p.randomSeed(seed);
      p.noiseSeed(seed);
      graphics = p.createGraphics(w, h);

      growSpeed = h / 800.0;
      maxThickness = h / 50.0;
      graphics.noStroke();
      graphics.fill(50);
      treePoints = [];
      if (window.innerWidth > 916) {
        treePoints.push([
          w / 2.8,
          h * 0.79,
          maxThickness,
          0,
          true,
          p.HALF_PI,
          false,
        ]);
      } else {
        treePoints.push([
          w / 2.8,
          h * 0.79,
          maxThickness,
          0,
          true,
          p.HALF_PI,
          false,
        ]);
      }

      drawTreeRecursively();
      frameCountIndexUpdater = frameCountIndex;

      calculateTreeProgress();
    };

    let draws = 0;
    p.draw = () => {
      p.clear();
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
      // prettyBackground();
      drawingCanvas.image(graphics, 0, 0);
      drawGraphics();

      let r = drawingCanvas.width / drawingCanvas.height;
      let newW = windowHeight * r;
      p.image(drawingCanvas, 0, 0, newW, windowHeight);
    };

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };

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
        graphics.circle(
          element[0],
          element[1] + h * 0.078,
          element[2] * DNA[5]
        );
      }
      graphics.pop();

      drawTreeRecursively();
    }

    function calculateTreeProgress() {
      let timeOf7Months = 10368000000;

      let timeElapsed = currentTime - mintingTime;
      progress = (timeElapsed / timeOf7Months) * 100;
      progress = Math.min(progress, 100);
      requiredSplits = (progress / 100) * DNA[4];
    }

    function drawLeaf(element) {
      if (!DNA[6]) {
        element[6] = true;
        return;
      }

      let cx = element[0];
      let cy = element[1];
      indexTree = 120;
      // if (DNA[0] === 0) leaf1(graphics, cx, cy + h * 0.078, 120);
      // else if (DNA[0] === 1)
      //   leaf2(graphics, cx, cy + h * 0.078, 120, element[5]);
      // else if (DNA[0] === 2) flower(graphics, cx, cy + h * 0.078, 120);
      if (DNA[0] === 0)
        leaf1(graphics, element[0], element[1] + h * 0.078, indexTree);
      else if (DNA[0] === 1)
        leaf2(
          graphics,
          element[0],
          element[1] + h * 0.078,
          indexTree,
          element[5]
        );
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
          if (!element[6] && checkIfAlive) {
            if (isTestMode) {
              DNA[6] = checkIfAlive;
              console.log("DRAWING LEAF", checkIfAlive);
            }

            drawLeaf(element);
          }
        } else {
          if (drawing && growing) drawBranch(element);
        }
      }
    }

    function updateTree() {
      let no = 0.0;
      growing = false;

      for (let element of treePoints) {
        no += 5;
        if (element[4] === false) continue;
        element[5] +=
          (p.noise(frameCountIndexUpdater / 40.0, no) - 0.45) * changeM;
        let directionM;
        let k;
        if (element[1] < h * 0.73) {
          if (frameCountIndexUpdater < 120) {
            directionM = p.atan2(h * 1.11 - element[1], element[0] - w / 2);
          } else {
            directionM = p.atan2(h * 0.78 - element[1], element[0] - w / 2);
          }
          k = 0.01;
        } else {
          directionM = p.atan2(h * 0.85 - element[1], element[0] - w / 2);
          if (frameCountIndexUpdater < 120) k = 0.01;
          else k = 0.05;
        }
        directionM += p.map(
          p.noise(frameCountIndexUpdater * 0.1),
          0,
          1,
          -p.PI,
          p.PI
        );

        element[5] = k * directionM + (1 - k) * element[5];
        element[0] += p.cos(element[5]) * growSpeed;
        element[1] -= p.sin(element[5]) * growSpeed;
        element[3] += 1;

        if (element[3] > splitL || element[2] < 1.2) {
          if (p.random() > splitM) {
            if (element[2] > minR && treePoints.length < splitN) {
              let SN = 0;
              if (element[2] > 13.0) SN = 3;
              else if (element[2] > 8.0) SN = 3;
              else if (element[2] > 4.0) SN = 3;
              else SN = 2;
              if (element[2] > 13.0) {
                for (let i = 0; i < SN; i++) {
                  let rnd = p.random() * 2.5 + 0.4;
                  treePoints.push([
                    element[0],
                    element[1],
                    (element[2] * shortenM * (p.random() * 20 + 90)) / 100.0,
                    0,
                    true,
                    p.HALF_PI + ((i - (SN - 1) / 2.0) / (SN - 1)) * rnd,
                    false,
                  ]);
                }
              } else {
                for (let i = 0; i < SN; i++) {
                  let rnd;
                  if (SN == 2) rnd = p.random();
                  else rnd = p.random() * 2.0 + 0.4;
                  treePoints.push([
                    element[0],
                    element[1],
                    (element[2] * shortenM * (p.random() * 20 + 90)) / 100.0,
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
        element[5] += (p.noise(frameCountIndex / 40.0, no) - 0.45) * changeM;
        let directionM;
        let k;
        if (element[1] < h * 0.73) {
          if (frameCountIndex < 120) {
            directionM = p.atan2(h * 1.11 - element[1], element[0] - w / 2);
          } else {
            directionM = p.atan2(h * 0.78 - element[1], element[0] - w / 2);
          }
          k = 0.01;
        } else {
          directionM = p.atan2(h * 0.85 - element[1], element[0] - w / 2);
          if (frameCountIndex < 120) k = 0.01;
          else k = 0.05;
        }
        directionM += p.map(p.noise(frameCountIndex * 0.1), 0, 1, -p.PI, p.PI);
        element[5] = k * directionM + (1 - k) * element[5];
        element[0] += p.cos(element[5]) * growSpeed;
        element[1] -= p.sin(element[5]) * growSpeed;
        element[3] += 1;
        if (element[3] > splitL || element[2] < 1.2) {
          if (p.random() > splitM) {
            if (element[2] > minR && treePoints.length < splitN) {
              let SN = 0;
              if (element[2] > 13.0) SN = 3;
              else if (element[2] > 8.0) SN = 3;
              else if (element[2] > 4.0) SN = 3;
              else SN = 2;
              if (element[2] > 13.0) {
                for (let i = 0; i < SN; i++) {
                  let rnd = p.random() * 2.5 + 0.4;
                  treePoints.push([
                    element[0],
                    element[1],
                    (element[2] * shortenM * (p.random() * 20 + 90)) / 100.0,
                    0,
                    true,
                    p.HALF_PI + ((i - (SN - 1) / 2.0) / (SN - 1)) * rnd,
                    false,
                  ]);
                }
              } else {
                for (let i = 0; i < SN; i++) {
                  let rnd;
                  if (SN == 2) rnd = p.random();
                  else rnd = p.random() * 2.0 + 0.4;
                  treePoints.push([
                    element[0],
                    element[1],
                    (element[2] * shortenM * (p.random() * 20 + 90)) / 100.0,
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
      if (p.random(100) < DNA[2]) return;
      graphics.push();
      graphics.noStroke();
      graphics.strokeWeight(0.1);
      graphics.stroke(0);
      graphics.fill(p.random(DNA[1]));
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
      graphics.endShape(p.CLOSE);
      graphics.pop();
    }

    function leaf1(graphics, x, y, decrease) {
      if (decrease === 0) return;
      if (decrease > 120) decrease = 120;
      let cx = x;
      let cy = y;
      if (p.random(100) < DNA[2]) return;

      graphics.push();
      graphics.noStroke();
      graphics.strokeWeight(0.1);
      graphics.stroke(0);
      graphics.fill(p.random(DNA[1]));
      graphics.circle(cx, cy, 14);
      graphics.pop();
    }

    function flower(graphics, x, y, decrease) {
      if (decrease > 120) decrease = 120;
      let cx = x;
      let cy = y;
      if (p.random(100) < 70) return;
      graphics.push();
      graphics.noStroke();
      graphics.fill(p.color(240, 98, 146, (255 * decrease) / 120));
      let outerRadius =
        (((p.random(9, 14) + p.random(9, 14) + p.random(9, 14)) / 3) *
          decrease) /
        120;
      let innerRadius =
        (((p.random(6, 9) + p.random(6, 9)) / 2) * decrease) / 120;
      let angle = p.TWO_PI / 9;
      let halfAngle = angle / 2.0;
      if (decrease > 0) {
        graphics.beginShape();
        for (let i = 0; i < p.TWO_PI; i += angle) {
          let sx = cx + p.cos(i) * outerRadius;
          let sy = cy + p.sin(i) * outerRadius;
          graphics.curveVertex(sx, sy);
          sx = cx + p.cos(i + halfAngle) * innerRadius;
          sy = cy + p.sin(i + halfAngle) * innerRadius;
          graphics.curveVertex(sx, sy);
        }
        graphics.endShape(p.CLOSE);
        graphics.fill("#222");
        graphics.circle(cx, cy, (4 * decrease) / 120);
      }
      graphics.pop();
    }

    function drawGraphics() {
      indexTree = 0;
    }
  };

  return (
    <div
      className="fixed inset-0 "
      ref={canvasRef}
      style={{ maxWidth: "1275.4px" }}
    ></div>
  );
};

export default InteractiveCanvas;
