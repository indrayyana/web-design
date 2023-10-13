let cursor = document.querySelector("#cursor");
let body = document.querySelector("body");
document.addEventListener("mousemove", (e) => {
  body.style.backgroundPositionX = e.pageX / -4 + "px";
  body.style.backgroundPositionY = e.pageY / -4 + "px";
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

const Eyecon = document.querySelector(".Eyecon");
const x = document.querySelector("#inputPassword");
Eyecon.addEventListener("click", () => {
  if (x.type === "password") {
    x.type = "text";
    Eyecon.classList.add("fa-eye");
    Eyecon.classList.remove("fa-eye-slash");
  } else {
    x.type = "password";
    Eyecon.classList.remove("fa-eye");
    Eyecon.classList.add("fa-eye-slash");
  }
});
