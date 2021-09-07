import "../styles/style.scss";
import { removeSplashScreen } from "./splashScreen";
const playField = document.createElement("canvas").getContext("2d");
playField.canvas.width = 1280;
playField.canvas.height = 720;
document.querySelector("#app").appendChild(playField.canvas);

const roleSelector = ["x", "o"];
let roleValue;
window.onload = () => {
    resize();
    draw();
    removeSplashScreen();
    roleValue = roleSelector[Math.round(Math.random())];
    console.log(roleValue);
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
    let cornerRadius = 90;
    placeHolderCTX.clearRect(0, 0, placeHolderCTX.canvas.width, placeHolderCTX.canvas.height);
    placeHolderCTX.i += 0.1;
    placeHolderCTX.i %= 100;

    // placeHolderCTX.strokeStyle = `rgba(60,0,0,${placeHolderCTX.i / 100})`;
    placeHolderCTX.strokeStyle = `rgba(60,0,0,1)`;
    // placeHolderCTX.fillStyle = "#000";
    // placeHolderCTX.font = "50px Bender-Bold";
    // placeHolderCTX.textBaseline = "middle";
    placeHolderCTX.lineJoin = "round";
    placeHolderCTX.lineWidth = cornerRadius;
    placeHolderCTX.beginPath();
    // placeHolderCTX.moveTo(placeHolderCTX.canvas.width / 2, placeHolderCTX.canvas.height / 2);
    placeHolderCTX.arc(
        placeHolderCTX.canvas.width / 2,
        placeHolderCTX.canvas.height / 2,
        45, -Math.PI / 2,
        Math.PI * 1.5 * (-placeHolderCTX.i / 100) - Math.PI / 2,
    );
    // placeHolderCTX.arc(0, 0, 150, 0, Math.PI * 2);
    // placeHolderCTX.fillStyle = "#000";
    // placeHolderCTX.fill();
    placeHolderCTX.stroke();
    // placeHolderCTX.strokeRect(
    //     cornerRadius / 2,
    //     cornerRadius / 2,
    //     placeHolderCTX.canvas.width - cornerRadius,
    //     placeHolderCTX.canvas.height - cornerRadius,
    // );
    return placeHolderCTX.canvas;
}
const placeHolder = drawPlaceholder();

function drawX() {
    const XCTX = document.createElement("canvas").getContext("2d");
    XCTX.canvas.width = 180;
    XCTX.canvas.height = 180;
    XCTX.beginPath();
    XCTX.lineWidth = 20;
    XCTX.lineCap = "round";
    XCTX.fillStyle = "#000";
    XCTX.strokeStyle = "#a00";
    XCTX.beginPath();
    XCTX.moveTo(10, 10);
    XCTX.lineTo(XCTX.canvas.width - 10, XCTX.canvas.height - 10);
    XCTX.stroke();
    // XCTX.closePath();
    // XCTX.beginPath();
    XCTX.moveTo(XCTX.canvas.width - 10, 10);
    XCTX.lineTo(10, XCTX.canvas.height - 10);
    XCTX.stroke();
    // XCTX.closePath();
    return XCTX.canvas;
}

function drawO() {
    const OCTX = document.createElement("canvas").getContext("2d");
    OCTX.canvas.width = 180;
    OCTX.canvas.height = 180;
    OCTX.beginPath();
    OCTX.lineWidth = 20;
    OCTX.lineCap = "round";
    OCTX.fillStyle = "#000";
    OCTX.strokeStyle = "#00a";
    OCTX.beginPath();
    // OCTX.moveTo(10, 10);
    // OCTX.lineTo(XCTX.canvas.width - 10, XCTX.canvas.height - 10);
    OCTX.arc(90, 90, 80, 0, Math.PI * 2);
    OCTX.stroke();
    OCTX.closePath();
    return OCTX.canvas;
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

function drawSquare() {
    const squareCTX = document.createElement("canvas").getContext("2d");
    squareCTX.canvas.width = 720;
    squareCTX.canvas.height = 720;
    squareCTX.drawImage(gridLayer, 0, 0);

    battleField.forEach((arr, column) =>
        arr.forEach((elem, row) => {
            if (elem == "x") {
                squareCTX.save();
                squareCTX.translate(
                    squareCTX.canvas.width / 2 + placeHolderCTX.step * column - placeHolderCTX.step,
                    squareCTX.canvas.height / 2 + placeHolderCTX.step * row - placeHolderCTX.step,
                );
                squareCTX.drawImage(drawX(), -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
                squareCTX.restore();
            } else if (elem == "o") {
                squareCTX.save();
                squareCTX.translate(
                    squareCTX.canvas.width / 2 + placeHolderCTX.step * column - placeHolderCTX.step,
                    squareCTX.canvas.height / 2 + placeHolderCTX.step * row - placeHolderCTX.step,
                );
                squareCTX.drawImage(drawO(), -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
                squareCTX.restore();
            }
        }),
    );

    squareCTX.save();
    squareCTX.translate(
        squareCTX.canvas.width / 2 + placeHolderCTX.posX - placeHolderCTX.step,
        squareCTX.canvas.height / 2 + placeHolderCTX.posY - placeHolderCTX.step,
    );
    squareCTX.drawImage(drawPlaceholder(), -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
    squareCTX.restore();
    /////////////////////////////////

    ///////////////////////////////
    return squareCTX.canvas;
}
let drawHandler;

function draw() {
    drawHandler = requestAnimationFrame(draw);
    playField.clearRect(0, 0, playField.canvas.width, playField.canvas.height);
    playField.drawImage(
        drawSquare(),
        playField.canvas.width / 2 - playField.canvas.height / 2,
        0,
        playField.canvas.height,
        playField.canvas.height,
    );
    playField.fillStyle = "#000";
    playField.font = "40px Bender-Bold";
    playField.textBaseline = "middle";
    playField.fillText("PLAYER", 10, 100);
    let measure = Math.floor(playField.measureText("COMPUTER").width);
    playField.fillText("COMPUTER", playField.canvas.width - measure - 10, 100);
    if (roleValue == "x") {
        playField.drawImage(drawX(), 30, 140, 100, 100);
        playField.drawImage(drawO(), 1150, 140, 100, 100);
    } else {
        playField.drawImage(drawO(), 30, 140, 100, 100);
        playField.drawImage(drawX(), 1150, 140, 100, 100);
    }

    ////////////////////////////////
}

window.addEventListener("resize", resize);

function resize() {
    playField.ratio = playField.canvas.width / playField.canvas.height;
    window.ratio = window.innerWidth / window.innerHeight;
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
            // console.log(placeHolderCTX.posX, placeHolderCTX.posY);
            // userHit(placeHolderCTX.posX, placeHolderCTX.posY);
            battleField[placeHolderCTX.posX / placeHolderCTX.step][placeHolderCTX.posY / placeHolderCTX.step] = roleValue;
            placeHolderCTX.i = 0;
            break;
        case "ENTER":
            let xx;

            xx = roleSelector[(roleSelector.indexOf(roleValue) + 1) % 2];

            battleField[placeHolderCTX.posX / placeHolderCTX.step][placeHolderCTX.posY / placeHolderCTX.step] = xx;
            placeHolderCTX.i = 0;

            break;
        case "KEYX":
            break;
        default:
            break;
    }
    console.log(battleField);
});

function userHit(x, y) {
    battleField[x / 240][y / 240] = roleValue;
    console.log(x, y, battleField);
    // battleField.forEach((arr, column) =>
    //     arr.forEach((elem, row) => {
    //         if (elem == "o") {
    //             console.log(elem, row, column);
    //         }
    //     }),
    // );
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