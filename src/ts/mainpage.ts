class MainPage {
    constructor() {
        // マウスカーソル
        const circle = document.querySelector("#cursor-circle") as HTMLElement;
        if(circle) {
            document.addEventListener("mousemove", (e) => {
                circle.style.display = "block"
                circle.style.left = `${e.clientX}px`;
                circle.style.top = `${e.clientY}px`;
            })
        }

        // シェアボタン
        const XshareBtn = document.querySelector("#X-share-with-tag") as HTMLButtonElement
        if(XshareBtn) {
            XshareBtn.addEventListener("click", (e) => {
                const message = "だいすき！！%0A%23ゆうりくんみて"
                window.open("https://x.com/intent/post?text="+message, '_blank');
            })
        }


    }
}

new MainPage()