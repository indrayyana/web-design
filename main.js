const can = document.getElementById("canvas");
const ctx = can.getContext("2d");
can.width = window.innerWidth;
can.height = window.innerHeight;
can.style.background = "black";
let p = [];

function Clear() {
  ctx.fillStyle = "rgba(0,0,0,0.07)";
  ctx.fillRect(0, 0, can.width, can.height);
}

function particle(x, y, speed, c) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.upd = function () {
    ctx.strokeStyle = c;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    this.x += this.speed.x;
    this.y += this.speed.y;
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    this.ang = Math.atan2(this.speed.y, this.speed.x);
    this.mag = Math.sqrt(this.speed.x ** 2 + this.speed.y ** 2);
    const op = [this.ang + Math.PI / 4, this.ang - Math.PI / 4];
    const ch = Math.floor(Math.random() * op.length);

    if (Math.random() < 0.05) {
      this.speed.x = Math.cos(op[ch]) * this.mag;
      this.speed.y = Math.sin(op[ch]) * this.mag;
    }
  };
}

const speed = 5;
const period = 1000;

function pulse() {
  setTimeout(pulse, period);
  const h = Math.random() * (210 - 150) + 150;

  for (let i = 0; i < 56; i++) {
    p.push(
      new particle(
        can.width / 2,
        can.height / 2,
        {
          x: Math.cos((i / 8) * 2 * Math.PI) * speed,
          y: Math.sin((i / 8) * 2 * Math.PI) * speed,
        },
        "hsl(" + h + ",100%,50%)"
      )
    );
  }
}

function gameMove() {
  requestAnimationFrame(gameMove);
  Clear();

  for (let i = 0; i < p.length; i++) {
    p[i].upd();

    if (p[i].x < 0 || p[i].x > can.width || p[i].y < 0 || p[i].y > can.height) {
      p.splice(i, 1);
    }
  }
}

pulse();
gameMove();

let cursor = document.querySelector("#cursor");
let body = document.querySelector("body");
document.addEventListener("mousemove", (e) => {
  body.style.backgroundPositionX = e.pageX / -4 + "px";
  body.style.backgroundPositionY = e.pageY / -4 + "px";
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

const div = document.querySelector(".text");
const root = document.querySelector(":root");
const text = "why the linked list appears empty after I've reversed it";
const text2 = "a Python script automating daily reports";

function textTypingEffect(element, text, i = 0, callback) {
  if (i === 0) {
    element.textContent = "";
  }

  if (i < text.length) {
    root.style.setProperty("--caret-display", "inline-block");
    element.textContent += text[i];
    setTimeout(() => textTypingEffect(element, text, i + 1, callback), 50);
  } else {
    root.style.setProperty("--caret-display", "none");
    setTimeout(callback, 2500);
  }
}

function startTextEffects() {
  textTypingEffect(div, text, 0, function () {
    textTypingEffect(div, text2, 0, startTextEffects);
  });
}

startTextEffects();
