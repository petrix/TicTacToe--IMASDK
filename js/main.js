import "../styles/style.scss";
import { splashScreen } from "./splashScreen";
import { initDesktopAutoplayExample } from "./ads";
const playField = document.createElement("canvas").getContext("2d");
playField.canvas.width = 1280;
playField.canvas.height = 720;
document.querySelector("#app").appendChild(playField.canvas);
const roleSelector = ["x", "o"];
let roleValue;
let activeGamer;
let stepCounter = 0;
let drawHandler;
const battleField = [...new Array(3)].map(elem => new Array(3).fill(""));
let userRole, computerRole;
window.onload = () => {
    drawWelcomeScreen();
};

function runApp() {
    console.log("runAPP");
    battleField.forEach(arr => arr.fill(""));
    stepCounter = 0;
    initKeyBoard();
    // playBTN.removeEventListener("click");
    cancelAnimationFrame(drawHandler);
    draw();
    resize();
    document.querySelector(".adsWindow").remove();
    splashScreen("hide").then(z => {
        document.querySelector(".splashscreen").innerHTML = "";
        // console.log(z)
        roleValue = roleSelector[Math.round(Math.random())];
        activeGamer = roleValue;
        userRole = roleValue;
        if (roleValue == "o") {
            activeGamer = activeGamer = roleSelector[(roleSelector.indexOf(activeGamer) + ++stepCounter) % 2];
            compStep();
        }
    });
}

function drawWelcomeScreen() {
    const message = document.createElement("p");
    message.innerText = "ARE YOU READY TO PLAY?";
    const playBTN = document.createElement("button");
    playBTN.setAttribute("id", "play");
    playBTN.classList.add("btn-hover");
    playBTN.innerText = "LET'S PLAY !";
    const awayBTN = document.createElement("button");
    awayBTN.innerText = "...or go away...";
    awayBTN.setAttribute("id", "away");
    awayBTN.classList.add("btn-hover");

    document.querySelector(".splashscreen").appendChild(message);
    document.querySelector(".splashscreen").appendChild(playBTN);
    document.querySelector(".splashscreen").appendChild(awayBTN);
    // playBTN.addEventListener("click", runApp);
    playBTN.addEventListener("click", playAds);
    awayBTN.addEventListener("click", () => {
        window.location.href = "https://google.com";
    });
}

function playAds() {
    const adsWindow = document.createElement("section");
    adsWindow.classList.add("adsWindow");
    // adsWindow.innerHTML = `        <div id="mainContainer">
    //         <div id="content">
    //             <video id="contentElement" muted playsinline>
    //       <source src="https://storage.googleapis.com/gvabox/media/samples/stock.mp4"/>
    //     </video>
    //         </div>
    //         <div id="adContainer"></div>
    //     </div>
    //     <button id="playButton">Play</button>`;
    const mainContainer = document.createElement("div");
    mainContainer.setAttribute("id", "mainContainer");
    const content = document.createElement("div");
    content.setAttribute("id", "content");
    const adContainer = document.createElement("div");
    adContainer.setAttribute("id", "adContainer");
    const playButton = document.createElement("button");
    playButton.setAttribute("id", "playButton");
    const contentElement = document.createElement("video");
    contentElement.setAttribute("id", "contentElement");
    contentElement.playsInline = "playsinline";
    contentElement.muted = "muted";
    contentElement.playbackRate = 10;
    const contentElemSRC = document.createElement("source");
    contentElemSRC.src = "https://storage.googleapis.com/gvabox/media/samples/stock.mp4";
    contentElement.appendChild(contentElemSRC);
    content.appendChild(contentElement);

    mainContainer.appendChild(content);
    mainContainer.appendChild(adContainer);
    mainContainer.appendChild(playButton);

    adsWindow.appendChild(mainContainer);

    document.querySelector(".splashscreen").after(adsWindow);

    splashScreen("hide").then(e => {
        console.log(e, "splashScreen hidden");
        initDesktopAutoplayExample();
        console.log(contentElement);
        contentElement.addEventListener("ended", () => {
            // splashScreen.innerHTML = ''
            adsWindow.style.opacity = 0;
            runApp();
        });
    });
}
const placeHolderCTX = document.createElement("canvas").getContext("2d");
placeHolderCTX.canvas.width = 180;
placeHolderCTX.canvas.height = 180;
placeHolderCTX.i = 0;
placeHolderCTX.posX = 240;
placeHolderCTX.posY = 240;
placeHolderCTX.step = 240;

function drawPlaceholder() {
    let cornerRadius = 10;
    placeHolderCTX.clearRect(0, 0, placeHolderCTX.canvas.width, placeHolderCTX.canvas.height);
    placeHolderCTX.i += 0.1;
    placeHolderCTX.i %= 100;

    // placeHolderCTX.strokeStyle = `rgba(60,0,0,${placeHolderCTX.i / 100})`;
    placeHolderCTX.strokeStyle = `rgba(60,0,0,0.5)`;
    // placeHolderCTX.fillStyle = "#000";
    // placeHolderCTX.font = "50px Bender-Bold";
    // placeHolderCTX.textBaseline = "middle";
    placeHolderCTX.setLineDash([10]);
    placeHolderCTX.lineJoin = "round";
    placeHolderCTX.lineWidth = cornerRadius;
    // placeHolderCTX.beginPath();
    // // placeHolderCTX.moveTo(placeHolderCTX.canvas.width / 2, placeHolderCTX.canvas.height / 2);
    // placeHolderCTX.arc(
    //     placeHolderCTX.canvas.width / 2,
    //     placeHolderCTX.canvas.height / 2,
    //     45, -Math.PI / 2,
    //     Math.PI * 1.5 * (-placeHolderCTX.i / 100) - Math.PI / 2,
    // );
    // placeHolderCTX.arc(0, 0, 150, 0, Math.PI * 2);
    // placeHolderCTX.fillStyle = "#000";
    // placeHolderCTX.fill();
    placeHolderCTX.rect(
        cornerRadius / 2,
        cornerRadius / 2,
        placeHolderCTX.canvas.width - cornerRadius,
        placeHolderCTX.canvas.height - cornerRadius,
    );
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
const XRNDR = drawX();

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
const ORNDR = drawO();

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
                    squareCTX.canvas.width / 2 + placeHolderCTX.step * row - placeHolderCTX.step,
                    squareCTX.canvas.height / 2 + placeHolderCTX.step * column - placeHolderCTX.step,
                );
                squareCTX.drawImage(XRNDR, -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
                squareCTX.restore();
            } else if (elem == "o") {
                squareCTX.save();
                squareCTX.translate(
                    squareCTX.canvas.width / 2 + placeHolderCTX.step * row - placeHolderCTX.step,
                    squareCTX.canvas.height / 2 + placeHolderCTX.step * column - placeHolderCTX.step,
                );
                squareCTX.drawImage(ORNDR, -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
                squareCTX.restore();
            }
        }),
    );

    squareCTX.save();
    squareCTX.translate(
        squareCTX.canvas.width / 2 + placeHolderCTX.posX - placeHolderCTX.step,
        squareCTX.canvas.height / 2 + placeHolderCTX.posY - placeHolderCTX.step,
    );
    // squareCTX.drawImage(drawPlaceholder(), -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
    squareCTX.restore();
    /////////////////////////////////

    ///////////////////////////////
    return squareCTX.canvas;
}

function draw() {
    drawHandler = requestAnimationFrame(draw);
    playField.clearRect(0, 0, playField.canvas.width, playField.canvas.height);
    playField.drawImage(
        drawSquare(),
        // squareCTX(),
        playField.canvas.width / 2 - playField.canvas.height / 2,
        0,
        playField.canvas.height,
        playField.canvas.height,
    );
    playField.save();
    playField.translate(
        playField.canvas.width / 2 + placeHolderCTX.posX - placeHolderCTX.step,
        playField.canvas.height / 2 + placeHolderCTX.posY - placeHolderCTX.step,
    );
    playField.globalAlpha = 0.4;
    if (activeGamer == "x") {
        playField.drawImage(XRNDR, -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
    } else {
        playField.drawImage(ORNDR, -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
    }
    playField.globalAlpha = 1;

    playField.drawImage(drawPlaceholder(), -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
    // playField.drawImage(drawPlaceholder(), -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
    playField.restore();
    playField.fillStyle = "#000";
    playField.font = "40px Bender-Bold";
    playField.textBaseline = "middle";
    playField.fillText("PLAYER", 10, 100);
    // playField.fillText(stepCounter, 10, 200);
    let measure = Math.floor(playField.measureText("COMPUTER").width);
    playField.fillText("COMPUTER", playField.canvas.width - measure - 10, 100);
    if (roleValue == "x") {
        playField.drawImage(XRNDR, 30, 140, 100, 100);
        playField.drawImage(ORNDR, 1150, 140, 100, 100);
    } else {
        playField.drawImage(ORNDR, 30, 140, 100, 100);
        playField.drawImage(XRNDR, 1150, 140, 100, 100);
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

function initKeyBoard() {
    document.addEventListener("keydown", keyB);
}

function keyB(event) {
    var keyPush = event.code.toUpperCase();
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
            if (!battleField[placeHolderCTX.posY / placeHolderCTX.step][placeHolderCTX.posX / placeHolderCTX.step]) {
                battleField[placeHolderCTX.posY / placeHolderCTX.step][placeHolderCTX.posX / placeHolderCTX.step] =
                    activeGamer;
                checkWinner(activeGamer).then(e => {
                    console.log("e - ", e);
                    if (!e) {
                        activeGamer = roleSelector[(roleSelector.indexOf(activeGamer) + ++stepCounter) % 2];

                        setTimeout(() => {
                            compStep();
                        }, 500);
                    } else {
                        if (activeGamer == userRole) {
                            console.log("activeGamer - PLAYER", activeGamer, "WINNER");
                        } else {
                            console.log("activeGamer - COMPUTER", activeGamer, "WINNER");
                        }
                        setTimeout(() => {
                            congratsScreen(activeGamer);
                        }, 1000);
                    }
                });
            }

            break;
        default:
            break;
    }
}

function compStep() {
    variChecker();
    checkWinner(activeGamer).then(e => {
        if (!e) {
            activeGamer = roleSelector[(roleSelector.indexOf(activeGamer) + stepCounter++) % 2];
        } else {
            if (activeGamer == userRole) {
                console.log("activeGamer - PLAYER", activeGamer, "WINNER");
                // congratsScreen(activeGamer);
            } else {
                console.log("activeGamer - COMPUTER", activeGamer, "WINNER");
            }
            setTimeout(() => {
                congratsScreen(activeGamer);
            }, 1000);
        }
    });
}

function variChecker() {
    //////////////////////////// first check
    if (!battleField[1][1]) {
        console.log("first check");
        battleField[1][1] = activeGamer;
        return;
    } else {
        let corners = [battleField[0][0], battleField[0][2], battleField[2][0], battleField[2][2]];
        // let rndm = Math.round(Math.random() * 3);
        //////////////////////////// second check
        let freeCornersArr = [];
        corners.forEach((elm, i) => {
            if (elm == "") freeCornersArr.push(i);
        });
        let rndm = Math.floor(Math.random() * freeCornersArr.length);
        // let tmp = corners.findIndex(elem => elem == "");
        // corners[rndm] = activeGamer;
        switch (JSON.stringify(freeCornersArr[rndm])) {
            case "0":
                console.log("0 - ");

                battleField[0][0] = activeGamer;

                break;
            case "1":
                console.log("1 - ");

                battleField[0][2] = activeGamer;

                break;
            case "2":
                console.log("2 - ");
                battleField[2][0] = activeGamer;

                break;
            case "3":
                console.log("3 - ");

                battleField[2][2] = activeGamer;
                break;

            default:
                break;
        }
        console.log(battleField.flat());

        // console.log(freeCornersArr, freeCornersArr[rndm], "rndm - " + rndm, corners[rndm], corners);
        // console.log(battleField);

        return;
    }
    console.log(battleField);
}

async function checkWinner(gamer) {
    let checkArr = [];

    let arr = battleField.flat();
    //////////////////////////
    var idx = arr.indexOf(gamer);
    while (idx != -1) {
        checkArr.push(idx);
        idx = arr.indexOf(gamer, idx + 1);
    }
    console.log("gamer - " + gamer, "arr - " + arr, "checkArr - " + checkArr);
    const winnerCombinations = [
        [0, 4, 8],
        [2, 4, 6],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];
    for (const combination of winnerCombinations) {
        let tempArray = [];
        for (const elem1 of combination) {
            for (const elem2 of checkArr) {
                if (elem1 == elem2) {
                    tempArray.push(elem1);

                    // if (tempArray == combination) {
                    //     console.log(tempArray, activeGamer + " WIN !!!!");
                    // }
                }
                if (JSON.stringify(tempArray) === JSON.stringify(combination)) {
                    console.log(gamer + "- WINNER", tempArray, combination);
                    return true;
                }
            }
        }
    }
    return false;
}

function congratsScreen(gamer) {
    document.removeEventListener("keydown", keyB);
    splashScreen("show").then(r => {
        cancelAnimationFrame(drawHandler);
        const message = document.createElement("p");
        gamer == userRole ? (message.innerText = " HUMAN WINNER !!!") : (message.innerText = "COMPUTER WINNER !!!");
        const playBTN = document.createElement("button");
        playBTN.setAttribute("id", "play");
        playBTN.classList.add("btn-hover");
        playBTN.innerText = "LET'S PLAY !";
        const awayBTN = document.createElement("button");
        awayBTN.innerText = "...or go away...";
        awayBTN.setAttribute("id", "away");
        awayBTN.classList.add("btn-hover");

        document.querySelector(".splashscreen").appendChild(message);
        document.querySelector(".splashscreen").appendChild(playBTN);
        document.querySelector(".splashscreen").appendChild(awayBTN);
        playBTN.addEventListener("click", playAds);
        awayBTN.addEventListener("click", () => {
            window.location.href = "https://google.com";
        });
    });
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