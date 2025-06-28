class ScreenShot {
    constructor() {
        // タブ切り替え
        const elements = document.querySelectorAll<HTMLElement>('._tab-item');
        elements.forEach(element => {
            element.addEventListener("click", (e) => {
                elements.forEach(elem2 => {
                    elem2.classList.remove('_select');
                })
                element.classList.add("_select");
            })
        });
    }

}

new ScreenShot()