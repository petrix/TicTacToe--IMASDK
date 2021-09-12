import "../styles/style.scss";
import { splashScreen, adsScreen } from "./splashScreen";
import { initDesktopAutoplayExample } from "./ads";
const playField = document.createElement("canvas").getContext("2d");
playField.canvas.width = 1280;
playField.canvas.height = 720;
document.querySelector("#app").appendChild(playField.canvas);
const roleSelector = ["x", "o"];
let roleValue;
// let activeGamer;
let stepCounter = 0;
let drawHandler;
let congratulationGamer = "";
const winCombinations = [
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
const battleField = [...new Array(3)].map(elem => new Array(3).fill(""));
let userRole, compRole;
window.onload = () => {
    congratsScreen("welcome");
    resize();
};

function runApp() {
    congratulationGamer = "";
    console.clear();
    console.log("runAPP");
    battleField.forEach(arr => arr.fill(""));
    stepCounter = 0;
    initKeyBoard();
    cancelAnimationFrame(drawHandler);
    draw();
    adsScreen("hide");
    splashScreen("hide")
        .then(z => {
            document.removeEventListener("keydown", splashKeyB);
            roleValue = roleSelector[Math.round(Math.random())];
            if (roleValue == "x") {
                compRole = "x";
                userRole = "o";
                console.log("comp first", compRole, "user", userRole);
                compStep();
            } else {
                userRole = "x";
                compRole = "o";
                console.log("user first", userRole, "comp", compRole);
            }
        })
        .then(e => {
            setTimeout(() => {
                document.querySelector(".splashscreen").innerHTML = "";
                document.querySelector(".adsWindow").innerHTML = "";
            }, 1000);
        });
}

function rmBtnEvtListeners() {
    document.querySelectorAll(".splashscreen div").forEach(btn => {
        console.log(btn);

        let clone = btn.cloneNode();
        clone.style.cursor = "default";
        btn.parentNode.replaceChild(clone, btn);
    });
}

function playAds() {
    adsScreen("show");
    rmBtnEvtListeners();
    const adsWindow = document.querySelector(".adsWindow");
    const mainContainer = document.createElement("div");
    mainContainer.setAttribute("id", "mainContainer");
    mainContainer.setAttribute("style", `transform:${document.querySelector("#app").style.transform}`);
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
    contentElement.addEventListener("loadstart", console.log("loadstart"));
    contentElement.addEventListener("loadeddata", console.log("loadeddata"));
    contentElement.addEventListener("canplay", console.log("canplay"));
    // document.querySelector(".splashscreen").after(adsWindow);

    splashScreen("hide").then(e => {
        document.removeEventListener("keydown", splashKeyB);
        console.log(e, "splashScreen hidden");
        initDesktopAutoplayExample();
        console.log(contentElement);
        contentElement.addEventListener("ended", () => {
            console.log("VIDEO ENDED");
            adsScreen("hide").then(e => {
                runApp();
            });
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

    placeHolderCTX.strokeStyle = `rgba(60,0,0,0.5)`;

    placeHolderCTX.setLineDash([20, 10]);
    placeHolderCTX.lineJoin = "round";
    placeHolderCTX.lineWidth = cornerRadius;

    placeHolderCTX.rect(
        cornerRadius / 2,
        cornerRadius / 2,
        placeHolderCTX.canvas.width - cornerRadius,
        placeHolderCTX.canvas.height - cornerRadius,
    );
    placeHolderCTX.stroke();

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

    playField.globalAlpha = 1;

    playField.drawImage(placeHolder, -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
    // playField.drawImage(drawPlaceholder(), -placeHolderCTX.canvas.width / 2, -placeHolderCTX.canvas.height / 2);
    playField.restore();
    playField.fillStyle = "#000";
    playField.font = "40px MagnoliaScript";
    playField.textBaseline = "middle";
    playField.fillText("PLAYER", 10, 100);
    playField.fillText(stepCounter, 10, 200);
    let measure = Math.floor(playField.measureText("COMPUTER").width);
    playField.fillText("COMPUTER", playField.canvas.width - measure - 10, 100);
    if (userRole == "x") {
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
    let scaleFactor;
    if (window.innerWidth < 1280) {
        if (window.ratio < playField.ratio) {
            scaleFactor = window.innerWidth / 1280;
        } else {
            scaleFactor = window.innerHeight / 720;
        }
        //
    } else if (window.innerHeight < 720) {
        scaleFactor = window.innerHeight / 720;
    } else {
        scaleFactor = 1;
    }
    document.querySelector('[data="resizeStyle"]').innerHTML = `.adsWindow, #app{transform:scale(${scaleFactor})}`;
    // document.querySelector("#app").setAttribute("style", "transform:scale(" + scaleFactor + ")");
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
                    userRole;
                isWinner(userRole).then(e => {
                    console.log("e - ", e);
                    if (!e) {
                        stepCounter++;
                        setTimeout(() => {
                            compStep();
                        }, 500);
                    } else {
                        console.log("PLAYER", userRole, "WINNER");

                        setTimeout(() => {
                            congratsScreen(userRole);
                        }, 1000);
                    }
                });
            }
            console.log(placeHolderCTX.posY / placeHolderCTX.step, placeHolderCTX.posX / placeHolderCTX.step);

            break;
        default:
            break;
    }
}

function compStep() {
    variChecker().then(() => {
        isWinner(compRole).then(e => {
            if (!e) {
                stepCounter++;
            } else {
                console.log("COMPUTER", compRole, "WINNER");

                setTimeout(() => {
                    congratsScreen(compRole);
                }, 1000);
            }
        });
    });
}

function parseArray() {
    let arrr = battleField.flat();
    let emptyArrr = [],
        xArrr = [],
        oArrr = [];
    arrr.forEach((item, i) => {
        switch (item) {
            case "":
                emptyArrr.push(i);
                break;
            case "x":
                xArrr.push(i);
                break;
            case "o":
                oArrr.push(i);
                break;

            default:
                break;
        }
    });
    // return new Promise(res, rej){
    if (userRole == "o") {
        return [emptyArrr, oArrr, xArrr];
    } else {
        return [emptyArrr, xArrr, oArrr];
    }
    // }
}

async function variChecker() {
    //////////////////////////// first check
    console.log(battleField);
    let flatArr = battleField.flat();
    let parsedField = parseArray();
    let emptyCells = parsedField[0],
        userCells = parsedField[1],
        compCells = parsedField[2];
    console.warn("stepcounter", stepCounter);

    if (!battleField[1][1]) {
        console.log("first check");
        battleField[1][1] = compRole;
    } else {
        if (userCells.length < 2) {
            console.warn("stepCounter stepCounter < 3", stepCounter, emptyCells, userCells, compCells, userRole);
            let corners = [0, 2, 6, 8];
            corners = corners.filter(it => !userCells.includes(it));
            console.log("corners", corners);
            let rndm = Math.floor(Math.random() * corners.length);
            battleField[Math.floor(corners[rndm] / 3)][Math.floor(corners[rndm] % 3)] = compRole;
            console.log(rndm, Math.floor(corners[rndm] / 3), Math.floor(corners[rndm] % 3));
        } else if (userCells.length >= 2 && userCells.length < 10) {
            console.log("stepCounter 5 > stepCounter > 3", stepCounter, emptyCells, userCells, compCells, userRole);
            let availableUserCombinations = [];
            let availableCompCombinations = [];
            let solution = false;
            for (const cmpCell of compCells) {
                winCombinations.forEach((combination, i) => {
                    if (combination.includes(cmpCell)) {
                        let x = winCombinations[i];

                        if (!availableCompCombinations.includes(i)) {
                            availableCompCombinations.push(i);
                        } else {
                            x = x.filter(it => !userCells.includes(it));
                            x = x.filter(it => !compCells.includes(it));

                            console.log("x", x);
                            if (x.length > 0) {
                                console.log("BEST walk - ", combination, i);
                                solution = true;
                                battleField[Math.floor(x[0] / 3)][Math.floor(x[0] % 3)] = compRole;
                            } else {}
                        }
                        console.log("cmpCell", cmpCell, combination);
                    }
                });
            }
            if (!solution) {
                for (const usrCell of userCells) {
                    // console.log("usrCell", usrCell);
                    winCombinations.forEach((combination, i) => {
                        if (combination.includes(usrCell)) {
                            console.log(combination, i);
                            if (!availableUserCombinations.includes(i)) {
                                availableUserCombinations.push(i);
                            } else {
                                let x = winCombinations[i];
                                x = x.filter(it => !userCells.includes(it));
                                x = x.filter(it => !compCells.includes(it));

                                console.log("x", x);
                                if (x.length > 0) {
                                    console.log("BEST walk - ", combination, i);
                                    solution = true;
                                    battleField[Math.floor(x[0] / 3)][Math.floor(x[0] % 3)] = compRole;
                                } else {}
                                // if (compCells.includes(x)) {
                                //     console.log("compCells includes X");
                                // }
                            }
                            console.log(availableUserCombinations);
                        }
                    });
                    // for (const combination of winCombinations) {
                    //     if (combination.includes(usrCell)) {
                    //         console.log(combination);
                    //     }
                    // }
                }
            }
            console.log(solution);
            if (!solution) {
                let rand = Math.floor(Math.random() * emptyCells.length);
                console.log("rand", emptyCells, rand);
                if (emptyCells.length >= 1) {
                    battleField[Math.floor(emptyCells[rand] / 3)][Math.floor(emptyCells[rand] % 3)] = compRole;
                    solution = true;
                } else {
                    // console.log("no winners today");
                    // congratsScreen("nowinner");
                }
            }
            // if (!solution) {
            //     console.log("solution", solution);
            // }
        }
    }
}

async function isWinner(gamer) {
    let checkArr = [];
    let arr = battleField.flat();
    //////////////////////////
    var idx = arr.indexOf(gamer);
    while (idx != -1) {
        checkArr.push(idx);
        idx = arr.indexOf(gamer, idx + 1);
    }
    console.log("stepCounter", stepCounter, "gamer - " + gamer, "arr - " + arr, "checkArr - " + checkArr);

    for (const combination of winCombinations) {
        let tempArray = [];
        for (const elem1 of combination) {
            for (const elem2 of checkArr) {
                if (elem1 == elem2) {
                    tempArray.push(elem1);
                }
                if (JSON.stringify(tempArray) === JSON.stringify(combination)) {
                    console.log(gamer + "- WINNER", tempArray, combination);
                    return true;
                }
            }
        }
    }
    if (parseArray()[0].length == 0) {
        console.log("no winners today");
        congratsScreen("nowinner");
        return false;
    }
}

function congratsScreen(gamer) {
    if (congratulationGamer != gamer) {
        congratulationGamer = gamer;
        document.removeEventListener("keydown", keyB);
        splashScreen("show").then(r => {
            cancelAnimationFrame(drawHandler);
            const message = document.createElement("p");
            if (gamer == userRole) {
                message.innerText = " HUMAN WINNER !!!";
            } else if (gamer == compRole) {
                message.innerText = "COMPUTER WINNER !!!";
            } else if (gamer == "welcome") {
                message.innerText = "ARE YOU READY TO PLAY?";
            } else if (gamer == "nowinner") {
                message.innerText = "NO WINNER FOR THIS ROUND";
            }
            const playBTN = document.createElement("div");
            playBTN.setAttribute("id", "play");
            playBTN.classList.add("btn-hover");
            playBTN.classList.add("active");
            playBTN.innerText = "LET'S PLAY !";
            const awayBTN = document.createElement("div");
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
            document.addEventListener("keydown", splashKeyB);
        });
    }
}

function splashKeyB(event) {
    var keyPush = event.code.toUpperCase();
    switch (keyPush) {
        case "ARROWDOWN":
        case "ARROWUP":
            document.querySelectorAll(".splashscreen div").forEach(div => {
                div.classList.toggle("active");
            });
            break;

        case "SPACE":
            document.querySelector(".splashscreen div.active").click();
            break;
        default:
            break;
    }
}