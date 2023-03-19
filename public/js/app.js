"use strict";
// Function that generates a random colored box in HTML and adds it to the "app" div
function changeBackground(app, enable) {
    // Cycle through RGB colors every 100ms
    if (enable) {
        app.interval = setInterval(() => {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            app.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }, 100);
    }
    else {
        clearInterval(app.interval);
        app.style.backgroundColor = "gray";
    }
}
window.onload = () => {
    let app = document.getElementById("app");
    if (app == null) {
        throw new Error("App not found");
    }
    app.interval = 0;
    let btn_start = document.getElementById("start_color");
    let btn_stop = document.getElementById("stop_color");
    if (btn_start == null || btn_stop == null) {
        throw new Error("Button not found");
    }
    btn_start.addEventListener("click", () => changeBackground(app, true));
    btn_stop.addEventListener("click", () => changeBackground(app, false));
};
