const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');

let arrOfLines = [];
let arrOfCircles = [];
let count = 0;
let start = [];

canvas.onclick = (event) => {
  if (count === 0) {
    ctx.moveTo(event.offsetX, event.offsetY);
    start = {x:event.offsetX, y:event.offsetY}
    count++;
  } else {
    const end = {x:event.offsetX, y:event.offsetY};
    arrOfLines.push([start, end])
    count = 0;
    createArrOfCircles();
    drowCircle();
  }
}

const drowLine = () => {
  arrOfLines.map(item => {
    ctx.moveTo(item[0].x, item[0].y)
    ctx.lineTo(item[1].x, item[1].y)
  })

  ctx.stroke();
}

const drowCircle = () => {
  arrOfCircles.map(item => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(item.x, item.y, 2, 0, 360, false);
    ctx.stroke();
    ctx.fill();
  })
}

canvas.onmousemove = (event) => {
  if (count === 1) {
    ctx.clearRect(0,0,800,500);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    drowLine();
    drowCircle();
  }
}


window.oncontextmenu = function(e) {
    e.preventDefault();
    count = 0;
    ctx.clearRect(0,0,800,500);
    drowLine();
    drowCircle();
}

const calculateIntersection = (x1, y1, x2, y2, x3, y3, x4, y4) => {

  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false
}

denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

if (denominator === 0) {
    return false
}

let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false
}

let x = x1 + ua * (x2 - x1)
let y = y1 + ua * (y2 - y1)

return {x, y}
}

const createArrOfCircles = () => {
  if (arrOfLines.length > 1) {
    for (let i = 0; i < arrOfLines.length; i++) {
      for (let j = 0; j < arrOfLines.length; j++) {
        const rezult = calculateIntersection(arrOfLines[i][0].x, arrOfLines[i][0].y, arrOfLines[i][1].x, arrOfLines[i][1].y, arrOfLines[j][0].x, arrOfLines[j][0].y, arrOfLines[j][1].x, arrOfLines[j][1].y);

        if (rezult) {
          arrOfCircles.push(rezult);
        }
      }  
    }
  }
}
