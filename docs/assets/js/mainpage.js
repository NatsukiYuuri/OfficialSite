"use strict";
class MainPage {
    constructor() {
        // 
        const circle = document.querySelector("#cursor-circle");
        if (circle) {
            document.addEventListener("mousemove", (e) => {
                circle.style.display = "block";
                circle.style.left = `${e.clientX}px`;
                circle.style.top = `${e.clientY}px`;
            });
        }
    }
}
new MainPage();
