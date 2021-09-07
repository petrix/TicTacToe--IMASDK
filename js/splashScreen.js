export function removeSplashScreen() {
    var splash = document.querySelector(".splashscreen");
    splash.style.animationPlayState = "running";
    splash.onanimationend = () => {
        // splash.style.zIndex = "-2000";
        splash.style.animationPlayState = "paused";
    };
    return true;
}