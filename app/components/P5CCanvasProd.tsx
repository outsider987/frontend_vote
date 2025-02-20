// "use client";
import React, { useEffect, useRef, useState } from "react";

const p5 = window.p5;

// // Hook to create and manage the p5 instance

const InteractiveCanvas = ({
  seed = 213,
  mintingTime = 1000000000000,
  lastWateredTime = 1724698851029,
  gameTime = Date.now(),
  isTestMode = false,
}) => {
  const canvasRef = useRef(null);
  const lastWateredTimeRef = useRef(lastWateredTime);
  const gameTimeRef = useRef(gameTime);
  useEffect(() => {
    let myP5;

    if (p5) {
      setTimeout(() => {
        myP5 = new p5((p) => sketch(p), canvasRef.current);
      }, 500);
    }
    return () => {
      //   window.removeEventListener("resize", updateDimensions);
      if (myP5) myP5.remove();
    };
  }, []);

  useEffect(() => {
    lastWateredTimeRef.current = lastWateredTime;
  }, [lastWateredTime]);

  const sketch = (p) => {
    // test mode
    const updateDateIncrementally = () => {
      const time = 10;
      setTimeout(() => {
        // currentTime += (24 * 60 * 60 * 1000) / 800;
        checkIfAlive =
          lastWateredTimeRef.current + days7 < currentTime ? false : true;
        calculateTreeProgress();
        updateDateIncrementally();
      }, time);
    };

    // Your p5.js variables
    let DNA;
    let leafColor1, leafColor2, leafColor3;
    let currentTime = Date.now();
    let SVGCanvas;
    let graphics;
    let stars = [];

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
    let moonY = 400;
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

    const days7 = 604800000;
    let checkIfAlive =
      lastWateredTimeRef.current + days7 < currentTime ? false : true;

    p.setup = () => {
      if (isTestMode) updateDateIncrementally();
      h = window.innerHeight;
      w = window.innerWidth;
      rRatio = h / 910;

      drawingCanvas = p.createGraphics(w, h);

      leafColor1 = p.color(255, 182, 193, 255);
      leafColor2 = p.color(255, 182, 193, 200);
      leafColor3 = p.color(255, 182, 193, 150);

      DNA = [
        1,
        [leafColor1, leafColor2, leafColor3],
        50,
        6,
        800,
        1.1,
        checkIfAlive,
      ];

      splitN = DNA[4];
      splitM = 0.87 + DNA[3] / 100;

      SVGCanvas = p.createCanvas(w, h);
      drawingCanvas.noFill();

      p.randomSeed(seed);
      p.noiseSeed(seed);
      graphics = p.createGraphics(w, h);

      for (let i = 0; i < 500; i++) {
        stars.push([
          p.random(0, w),
          p.random(0, (h / 4) * 3),
          p.random(0, w),
          p.random(30, 70),
          p.random(10),
          p.random(0.5, 1.5),
        ]);
      }

      growSpeed = h / 800.0;
      maxThickness = h / 50.0;
      graphics.noStroke();
      graphics.fill(50);
      if (window.innerWidth > 916) {
        treePoints.push([
          w / 2,
          h * 0.78,
          maxThickness,
          0,
          true,
          p.HALF_PI,
          false,
        ]);
      } else {
        treePoints.push([
          w / 2,
          h * 0.78 - groundHeight,
          maxThickness,
          0,
          true,
          p.HALF_PI,
          false,
        ]);
      }

      // drawTreeRecursively();
      frameCountIndexUpdater = frameCountIndex;

      // calculateTreeProgress();
    };

    p.draw = () => {
      p.clear();
      drawingCanvas.clear();

      treeGrowthIndex = treePoints.length;

      graphics.push();
      graphics.translate(0, 120);

      if (treeGrowthIndex >= requiredSplits) {
        drawing = false;
        if (progress == 100) drawing = true;
      }
      if (drawing) updateTree();
      frameCountIndexUpdater++;

      // drawTree();
      graphics.pop();
      prettyBackground();
      drawingCanvas.image(graphics, 0, 0);
      drawGraphics();

      if (isTestMode) {
        // drawingCanvas.textSize(30);
        // drawingCanvas.textAlign(p.TOP, p.TOP);
        // drawingCanvas.text(`Progress: ${progress.toFixed(2)}%`, w / 2, h / 2);
      }

      let r = drawingCanvas.width / drawingCanvas.height;
      let newW = p.windowHeight * r;
      p.image(drawingCanvas, 0, 0, newW, p.windowHeight);

      for (let i = 0; i < 500; i++) {
        stars[i] = [
          stars[i][0],
          stars[i][1],
          p.random(0, w),
          p.random(30, 70),
          p.random(10),
          p.random(0.5, 1.5),
        ];
      }
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
      graphics.translate(0, 500);

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
      let timeOf7Months = 18144000000;

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

      if (DNA[0] === 0) leaf1(graphics, cx, cy + h * 0.078, 120);
      else if (DNA[0] === 1)
        leaf2(graphics, cx, cy + h * 0.078, 120, element[5]);
      else if (DNA[0] === 2) flower(graphics, cx, cy + h * 0.078, 120);

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
      // Similar to updateTree, but uses frameCountIndex instead of frameCountIndexUpdater
      // ... (implementation similar to updateTree)
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

    function drawGrass(graphics, offY) {
      let n;

      for (let x = -15; x < w + 15; x += 1.5) {
        let offsetX = 0;
        let offsetY = 0;

        // lean (low frequency, static)
        n = p.noise(x * 0.1);
        offsetX += n * 20 - 10;

        // h (high frequency sampling yields independent values)
        offsetY += p.noise(x * 10) * 60;
        n = p.noise(x * 0.01 + p.millis() * -0.001);
        offsetX += n * 40;
        // wind( lower frequency, timed) - only for desktop
        if (window.innerWidth > 916) {
          // Assuming 1024px as the desktop breakpoint
          drawingCanvas.stroke(p.random(40, 100), 0, 30, offsetY * 2);
          drawingCanvas.line(x, h, x + offsetX, h - offsetY - p.random(offY));
        }

        if (window.innerWidth < 916) {
          drawingCanvas.stroke(p.random(40, 100), 0, 30, offsetY * 2);
          drawingCanvas.line(
            x,
            h - groundHeight + 20,
            x + offsetX,
            h - offsetY - groundHeight + 20 - p.random(offY)
          );
        }
      }
    }
    function easeIn(x) {
      return p.sin((x * p.PI) / 2);
    }

    function prettyBackground() {
      setGradient();

      drawingCanvas.noStroke();

      // we divide the day into 4 parts using the framecount
      // instead we will now take the time from the currentTime and replace the framecount with it

      // calculate a variable frameCountReplacement based on the date.now() to replace the frameCount

      const tempCurrentTime = currentTime;

      let timeSinceMinting = tempCurrentTime - mintingTime;

      // Calculate the position within the cycle (normalized to a range from 0 to 1)
      let cyclePosition = (timeSinceMinting % cycleLength) / cycleLength;

      // Map the cycle position to a range from 0 to 400
      frameCountReplacement = cyclePosition * 400;

      // randomSeed(random(frameCountReplacement));  //just removed

      // 	stars
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
          (frameCountReplacement % 400 < 100 ||
            frameCountReplacement % 400 > 300)
        ) {
          // 			shooting stars
          drawingCanvas.push();
          drawingCanvas.rotate(0.2);
          for (let j = 0; j < sLong; j++) {
            drawingCanvas.fill(255, 255, 255, p.map(j, 0, sLong, 255, 0));
            drawingCanvas.circle(sw - j, sh, 2);
          }
          drawingCanvas.pop();
        } else {
          drawingCanvas.fill(
            255,
            255,
            255,
            frameCountReplacement % 400 < 100 ||
              frameCountReplacement % 400 > 300
              ? p.map(sh, 0, (h / 4) * 3, 255, 0)
              : 0
          );
          // make the stars twinkle using sin, random and noise
          drawingCanvas.circle(
            stars[i][0],
            sh,
            p.map(
              p.sin(frameCountReplacement / 20 + i) * starFlicker,
              0,
              1,
              1,
              4
            )
          );

          // circle(stars[i][0], sh, 2);
        }
        drawingCanvas.pop();
      }

      if (
        frameCountReplacement % 400 < 100 ||
        frameCountReplacement % 400 > 300
      ) {
        // 	moon
        drawingCanvas.push();

        let lunarConstraint = 0;
        let k, r, l;

        k = 60;
        r = -75;
        l = -103;

        drawingCanvas.fill("#FFCE3D");

        drawingCanvas.translate(w / 3, moonY);
        drawingCanvas.rotate(-0.5);
        // Draw the crescent moon using bezierVertex
        p.fill(255); // Set fill color to white
        drawingCanvas.beginShape();
        drawingCanvas.vertex(0, -k);
        drawingCanvas.bezierVertex(r, -k, r, k, 0, k);
        drawingCanvas.bezierVertex(l, k, l, -k, 0, -k);
        drawingCanvas.endShape(p.CLOSE);

        drawingCanvas.pop();
        // moonY -= 5.5;

        // set the moon position based on frameCountReplacement instead

        if (frameCountReplacement % 400 < 100) {
          lunarConstraint = p.map(
            frameCountReplacement % 400,
            0,
            100,
            h / 2,
            -100
          );
        } else if (frameCountReplacement % 400 > 300) {
          lunarConstraint = p.map(
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

    moonY = 400;

    function setGradient() {
      drawingCanvas.noStroke();
      let from = p.color(248, 162, 108);
      let to = p.color(72, 61, 139);
      drawingCanvas.colorMode(p.RGB); // Try changing to HSB.
      // we divide the day into 4 parts using the framecount
      // instead we will now take the time from the currentTime and replace the framecount with it

      // calculate a variable frameCountReplacement based on the date.now() to replace the frameCount

      // let frameCountReplacement = (currentTime - mintingTime) / 10000000 * 400;
      // let frameCountReplacement = 400;

      // Define the length of a cycle in milliseconds
      // Calculate the time elapsed since the minting time
      const tempCurrentTime = currentTime;
      let timeSinceMinting = tempCurrentTime - mintingTime;

      // Calculate the position within the cycle (normalized to a range from 0 to 1)
      let cyclePosition = (timeSinceMinting % cycleLength) / cycleLength;

      // Map the cycle position to a range from 0 to 400
      let frameCountReplacement = cyclePosition * 400;

      let interA = p.lerpColor(
        from,
        to,
        p.abs(((frameCountReplacement % 400) - 200) / 200)
      );

      let interC = p.lerpColor(
        p.color(255, 100, 100),
        p.color(0, 155, 255),
        p.abs(((frameCountReplacement % 200) - 100) / 100)
      );

      let white = p.color(255, 255, 240);
      let black = p.color(30, 30, 30);

      for (let i = 0; i <= 100; i++) {
        let final = p.lerpColor(
          white,
          black,
          p.abs(((frameCountReplacement % 400) - 200) / 200)
        );

        let interD = p.lerpColor(final, interC, i / 100);

        let interB = p.lerpColor(interA, interD, i / 100);

        drawingCanvas.fill(interB);
        drawingCanvas.stroke(interB);
        drawingCanvas.rect(0, (i * h) / 100, w, h / 100);
      }

      drawingCanvas.noStroke();
    }
    function drawGraphics() {
      //   indexTree = 0;
      drawGrass(graphics, 30);
      drawGrass(graphics, 0);
    }
  };

  return <div className="fixed inset-0 " ref={canvasRef}></div>;
};

export default InteractiveCanvas;
