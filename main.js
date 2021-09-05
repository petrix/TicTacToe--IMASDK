import "./styles/style.scss";

const playField = document.createElement("canvas").getContext("2d");
playField.canvas.width = 1280;
playField.canvas.height = 720;
document.querySelector("#app").appendChild(playField.canvas);
window.onload = () => {
    resize();
    draw();
};
const placeHolderCTX = document.createElement("canvas").getContext("2d");
placeHolderCTX.canvas.width = 180;
placeHolderCTX.canvas.height = 180;
placeHolderCTX.i = 0;
placeHolderCTX.posX = 240;
placeHolderCTX.posY = 240;
placeHolderCTX.step = 240;
const battleField = [...new Array(3)].map(elem => new Array(3));

function drawPlaceholder() {
    let cornerRadius = 20;
    placeHolderCTX.clearRect(0, 0, placeHolderCTX.canvas.width, placeHolderCTX.canvas.height);
    // let colorValue = JSON.stringify(placeHolderCTX.i).padStart(2, "0");
    let colorValue = JSON.stringify(placeHolderCTX.i).padStart(2, "0");
    // placeHolderCTX.strokeStyle = `#${toHex(colorValue)}${toHex(colorValue)}${toHex(colorValue)}${toHex(255 - colorValue)}`;
    placeHolderCTX.i += 2;
    placeHolderCTX.i %= 200;
    // if (placeHolderCTX.i < 100) {
    //     placeHolderCTX.strokeStyle = `transparent`;
    // } else {
    placeHolderCTX.strokeStyle = `#311`;
    // }
    placeHolderCTX.fillStyle = "#000";
    // scrollTXTCtx.font = fontSize + "px " + fontName;
    placeHolderCTX.font = "50px Bender-Bold";
    placeHolderCTX.textBaseline = "middle";
    // placeHolderCTX.fillText(toHex(colorValue), placeHolderCTX.canvas.width / 2, placeHolderCTX.canvas.height / 2);
    placeHolderCTX.lineJoin = "round";
    placeHolderCTX.lineWidth = cornerRadius;

    placeHolderCTX.strokeRect(
        cornerRadius / 2,
        cornerRadius / 2,
        placeHolderCTX.canvas.width - cornerRadius,
        placeHolderCTX.canvas.height - cornerRadius,
    );
    return placeHolderCTX.canvas;
}
const placeHolder = drawPlaceholder();

function drawX() {
    const XCTX = document.createElement("canvas").getContext("2d");
    XCTX.canvas.width = 180;
    XCTX.canvas.height = 180;
    XCTX.beginPath();
    XCTX.lineWidth = 50;
    XCTX.lineCap = "round";
    XCTX.fillStyle = "#000";
    XCTX.strokeStyle = "#f00";
    XCTX.beginPath();
    XCTX.moveTo(0, 0);
    XCTX.lineTo(XCTX.canvas.width, XCTX.canvas.height);
    XCTX.stroke();
    return XCTX.canvas;
}

function drawGrid() {
    const gridCTX = document.createElement("canvas").getContext("2d");
    gridCTX.canvas.width = 720;
    gridCTX.canvas.height = 720;
    // gridCTX.fillStyle = "#fff";
    // gridCTX.fillRect(0, 0, gridCTX.canvas.width, gridCTX.canvas.height);
    gridCTX.save();
    gridCTX.translate(gridCTX.canvas.height / 2, gridCTX.canvas.height / 2);
    // playField.translate(0, 0);
    gridCTX.lineWidth = gridCTX.canvas.height / 50;
    gridCTX.lineCap = "round";
    gridCTX.fillStyle = "#000";
    gridCTX.strokeStyle = "#000";
    gridCTX.beginPath();
    gridCTX.moveTo(-gridCTX.canvas.height / 6, -gridCTX.canvas.height / 2 + gridCTX.lineWidth);
    gridCTX.lineTo(-gridCTX.canvas.height / 6, gridCTX.canvas.height / 2 - gridCTX.lineWidth);
    gridCTX.stroke();
    // playField.closePath();

    gridCTX.moveTo(gridCTX.canvas.height / 6, -gridCTX.canvas.height / 2 + gridCTX.lineWidth);
    gridCTX.lineTo(gridCTX.canvas.height / 6, gridCTX.canvas.height / 2 - gridCTX.lineWidth);
    gridCTX.stroke();
    gridCTX.moveTo(-gridCTX.canvas.height / 2 + gridCTX.lineWidth, -gridCTX.canvas.height / 6);
    gridCTX.lineTo(gridCTX.canvas.height / 2 - gridCTX.lineWidth, -gridCTX.canvas.height / 6);
    gridCTX.stroke();
    gridCTX.moveTo(-gridCTX.canvas.height / 2 + gridCTX.lineWidth, gridCTX.canvas.height / 6);
    gridCTX.lineTo(gridCTX.canvas.height / 2 - gridCTX.lineWidth, gridCTX.canvas.height / 6);
    gridCTX.stroke();
    gridCTX.restore();
    return gridCTX.canvas;
}

const gridLayer = drawGrid();

function drawSquare(ox) {
    // console.log(ox);
    const squareCTX = document.createElement("canvas").getContext("2d");
    squareCTX.canvas.width = 720;
    squareCTX.canvas.height = 720;
    squareCTX.drawImage(gridLayer, 0, 0);
    squareCTX.save();
    squareCTX.translate(
        squareCTX.canvas.width / 2 + placeHolderCTX.posX - placeHolderCTX.step,
        squareCTX.canvas.height / 2 + placeHolderCTX.posY - placeHolderCTX.step,
    );
    if (ox == "x") squareCTX.drawImage(drawX(), -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);

    // squareCTX.translate(placeHolderCTX.posX, placeHolderCTX.posY);
    squareCTX.drawImage(drawPlaceholder(), -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
    // squareCTX.drawImage(drawPlaceholder(), 0, 0);
    squareCTX.restore();
    return squareCTX.canvas;
}
let drawHandler;

function draw() {
    drawHandler = requestAnimationFrame(draw);
    playField.clearRect(0, 0, playField.canvas.width, playField.canvas.height);

    // playField.fillStyle = "#666";
    // playField.fillRect(0, 0, playField.canvas.width, playField.canvas.height);

    playField.drawImage(
        // gridLayer,
        drawSquare(),
        playField.canvas.width - playField.canvas.height,
        0,
        playField.canvas.height,
        playField.canvas.height,
    );
    ////////////////////////////////
}

window.addEventListener("resize", resize);

function resize() {
    playField.ratio = playField.canvas.width / playField.canvas.height;
    window.ratio = window.innerWidth / window.innerHeight;
    // if (playField.ratio < window.ratio) {
    //     if (window.innerHeight < 720) {
    //         playField.canvas.height = window.innerHeight;
    //         playField.canvas.width = window.innerHeight * (16 / 9);
    //     }
    // } else {
    //     if (window.innerWidth < 1280) {
    //         playField.canvas.width = window.innerWidth;
    //         playField.canvas.height = window.innerWidth / (16 / 9);
    //     }
    // }
    // draw();
    if (window.innerWidth < 1280) {
        if (window.ratio < playField.ratio) {
            document.querySelector("#app").setAttribute("style", "transform:scale(" + window.innerWidth / 1280 + ")");
        } else {
            document.querySelector("#app").setAttribute("style", "transform:scale(" + window.innerHeight / 720 + ")");
        }
        //
    } else if (window.innerHeight < 720) {
        document.querySelector("#app").setAttribute("style", "transform:scale(" + window.innerHeight / 720 + ")");
    } else {
        document.querySelector("#app").setAttribute("style", "transform:scale(1)");
    }
}

document.addEventListener("keydown", function(event) {
    var keyPush = event.code.toUpperCase();
    console.log(keyPush);
    switch (keyPush) {
        case "ARROWUP":
            placeHolderCTX.posY -= placeHolderCTX.step;
            placeHolderCTX.posY <= 0 ? (placeHolderCTX.posY = 0) : false;

            break;
        case "ARROWDOWN":
            placeHolderCTX.posY += placeHolderCTX.step;
            placeHolderCTX.posY >= placeHolderCTX.step * 2 ? (placeHolderCTX.posY = placeHolderCTX.step * 2) : false;
            break;

        case "ARROWLEFT":
            placeHolderCTX.posX -= placeHolderCTX.step;
            placeHolderCTX.posX <= 0 ? (placeHolderCTX.posX = 0) : false;
            break;
        case "ARROWRIGHT":
            placeHolderCTX.posX += placeHolderCTX.step;
            placeHolderCTX.posX >= placeHolderCTX.step * 2 ? (placeHolderCTX.posX = placeHolderCTX.step * 2) : false;
            break;
        case "SPACE":
            console.log(placeHolderCTX.posX, placeHolderCTX.posY);
            // drawSquare("x");
            userHit(placeHolderCTX.posX, placeHolderCTX.posY);
            break;

        default:
            break;
    }
});

function userHit(x, y) {
    battleField[x / 240][y / 240] = "x";
    console.log(x, y, battleField);
}

function toHex(d) {
    return ("0" + Number(d).toString(16)).slice(-2).toUpperCase();
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////