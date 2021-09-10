async function startCapture(displayMediaOptions) {
    let captureStream = null;

    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch(err) {
        console.error("Error: " + err);
    }
    return captureStream;
}

const b = (i, j, k) => i + (j - i) * k;
const ib = (i, j, k) => (k - i) / (j - i);

let socket;
window.addEventListener("load", function onInit() {
    socket = io.connect({transports: ['websocket'], upgrade: false});
    socket.on("error", console.error);
})

let video, canvas, ctx;
async function init() {
    const captureStream = await startCapture({});
    video = document.querySelector("video");
    video.width = 1920;
    video.height = 1080;
    video.srcObject = captureStream;
    video.play();
    video.style.display = "none";
    canvas = document.querySelector("canvas");
    canvas.style.top = "-71px";
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.style.width = "1920px";
    canvas.style.height = "1080px";
    ctx = canvas.getContext("2d");
    addBlur();
    freeRect(100, 100, 200, 200);
    socket.on("free-rect", freeRect);
    updateCanvasPosition();
    window.addEventListener("resize", updateCanvasPosition);
    update();
}

let mouseX, mouseY;

window.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

const blurs = [];
let lastFreeRect = null;
function update() {
    ctx.drawImage(video, 0, 0);
    
    //updateParticles();
    if (mouseX !== undefined && mouseY !== undefined) {
        //generateParticle(mouseX, mouseY);
    }
    window.requestAnimationFrame(update);
}
function freeRect(left, top, right, bottom) {
    console.log("Colocando as coisa la", left, top, right, bottom);
    lastFreeRect = [left, top, right, bottom];
    blurs[0].setPlacement(0, 0, window.innerWidth, top);
    blurs[1].setPlacement(0, top, left, window.innerHeight - top);
    blurs[2].setPlacement(right, top, window.innerWidth - right, window.innerHeight - top);
    blurs[3].setPlacement(left, bottom, window.innerWidth - left - (window.innerWidth - right), window.innerHeight - bottom);
}
function updateCanvasPosition(event) {
    canvas.style.top = (-b(0, 71, ib(0, 101, 1080 - window.innerHeight))).toFixed(2) + "px";
    if (lastFreeRect) {
        freeRect(lastFreeRect[0], lastFreeRect[1], lastFreeRect[2], lastFreeRect[3]);
    }
}
function addBlur() {
    for (let i = 0; i < 4; i++) {
        const a = document.createElement("div");
        a.style.backdropFilter = "blur(5px)";
        a.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        a.style.position = "fixed";
        a.setPlacement = function(left, top, width, height) {
            this.style.top = top + "px";
            this.style.left = left + "px";
            this.style.width = width + "px";
            this.style.height = height + "px";
        }
        a.setAttribute("class", "obj-"+i.toString());
        a.setPlacement(0, 0, 10, 10);
        document.body.appendChild(a);
        blurs.push(a);
    }
}