let autor = document.getElementById("autor");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let x = 0;
let y = 0;
let width = 1500;
let height = 700;

let colorPicker = (document.getElementById("color").onchange = function () {
    colorPicker = this.value;
});

let painting = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (event) => {
    painting = true;
    lastX = event.pageX - canvas.offsetLeft;
    lastY = event.pageY - canvas.offsetTop;
});

canvas.addEventListener("mouseup", () => {
    painting = false;
});

canvas.addEventListener("mousemove", (event) => {
    if (painting) {
        let currentX = event.pageX - canvas.offsetLeft;
        let currentY = event.pageY - canvas.offsetTop;

        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(currentX, currentY);
        context.strokeStyle = colorPicker;
        context.lineWidth = 10;
        context.stroke();

        lastX = currentX;
        lastY = currentY;
    }
});

// reset painting
function reset() {
    context.fillStyle = "white";
    context.fillRect(x, y, width, height);
}
// set autor name in p tag
autor.addEventListener("input", () => {
    let autorContainer = document.getElementById("autor-container");
    autorContainer.innerHTML = "By: " + autor.value;
});

// download with html2canvas
const exportImage = () => {
    let autorContainer = document.getElementById("autor-container");
    html2canvas(document.querySelector("#canvas-container")).then(function (
        canvas
    ) {
        let enlace = document.createElement("a");
        enlace.download = `boceto.png`;
        enlace.href = canvas.toDataURL("image/png");
        enlace.click();
    });
};
