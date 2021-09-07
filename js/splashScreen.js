export async function splashScreen(option) {
    var splash = document.querySelector(".splashscreen");
    switch (option) {
        case "hide":
            splash.style.animationName = "hide";
            splash.style.animationDuration = "1s";
            splash.style.animationPlayState = "running";

            splash.onanimationend = () => {
                splash.style.opacity = 0;
                splash.style.animationPlayState = "paused";
                return true;
            };
            break;
        case "show":
            splash.style.animationName = "show";
            splash.style.animationDuration = "500ms";
            splash.style.animationPlayState = "running";

            splash.onanimationend = () => {
                // splash.style.zIndex = "-2000";
                splash.style.opacity = 1;

                splash.style.animationPlayState = "paused";
                return true;
            };
            break;

        default:
            break;
    }
}