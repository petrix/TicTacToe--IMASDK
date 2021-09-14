export function splashScreen(option) {
    return new Promise(resolve => {
        var splash = document.querySelector(".splashscreen");
        switch (option) {
            case "hide":
                splash.style.animationName = "hide";
                splash.style.animationDuration = "500ms";
                splash.style.animationPlayState = "running";

                splash.onanimationend = () => {
                    splash.style.opacity = 0;
                    splash.style.animationPlayState = "paused";
                    splash.innerHTML = "";
                    resolve(true);
                };
                break;
            case "show":
                splash.style.animationName = "show";
                splash.style.opacity = 0;
                splash.style.animationDuration = "500ms";
                splash.style.animationPlayState = "running";

                splash.onanimationend = () => {
                    splash.style.opacity = 1;
                    splash.style.animationPlayState = "paused";
                    resolve(true);
                };
                break;

            default:
                break;
        }
    });
}

export function adsScreen(option) {
    return new Promise(resolve => {
        var adWin = document.querySelector(".adsWindow");
        switch (option) {
            case "hide":
                adWin.style.animationName = "hide";
                adWin.style.animationDuration = "500ms";
                adWin.style.animationPlayState = "running";

                adWin.onanimationend = () => {
                    adWin.style.opacity = 0;
                    adWin.style.animationPlayState = "paused";
                    adWin.innerHTML = "";
                    resolve(true);
                };
                break;
            case "show":
                adWin.style.animationName = "show";
                adWin.style.animationDuration = "500ms";
                adWin.style.animationPlayState = "running";

                adWin.onanimationend = () => {
                    // splash.style.zIndex = "-2000";
                    adWin.style.opacity = 1;

                    adWin.style.animationPlayState = "paused";
                    resolve(true);
                };
                break;

            default:
                break;
        }
    });
}