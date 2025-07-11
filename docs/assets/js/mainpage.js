class MainPage {
    constructor() {
        // マウスカーソル
        const circle = document.querySelector("#cursor-circle");
        if (circle) {
            document.addEventListener("mousemove", (e) => {
                circle.style.display = "block";
                circle.style.left = `${e.clientX}px`;
                circle.style.top = `${e.clientY}px`;
            });
        }
        // シェアボタン
        const XshareBtn = document.querySelector("#X-share-with-tag");
        if (XshareBtn) {
            XshareBtn.addEventListener("click", (e) => {
                const message = "だいすき！！%0A@mochi_mocha_y%0A%0A%23ゆうりくんみて";
                window.open("https://x.com/intent/post?text=" + message, '_blank');
            });
        }
        // メニュー
        // 開くとき
        const menuOpen = document.querySelector("#menu-open-btn");
        if (menuOpen) {
            menuOpen.addEventListener("click", (e) => {
                const menu = document.querySelector("#menu");
                if (menu) {
                    menu.style.display = "block";
                }
                // メニューの線を引く
                const points = [];
                for (let i = 1; i <= 7; i++) {
                    const el = document.querySelector(`._${i}`);
                    const rect = el.getBoundingClientRect();
                    const x = rect.left + 8;
                    const y = rect.top + rect.height / 2;
                    points.push({ x, y });
                }
                const polylineEl = document.querySelector('polyline');
                const pointString = points.map(p => `${p.x},${p.y}`).join(' ');
                polylineEl.setAttribute('points', pointString);
                // 距離の合計を計算してdash配列に設定
                let length = 0;
                for (let i = 1; i < points.length; i++) {
                    const dx = points[i].x - points[i - 1].x;
                    const dy = points[i].y - points[i - 1].y;
                    length += Math.sqrt(dx * dx + dy * dy);
                }
                polylineEl.style.strokeDasharray = length.toString();
                polylineEl.style.strokeDashoffset = length.toString();
            });
        }
        // 閉じるとき
        const menuclose = document.querySelector("#menu-close-btn");
        if (menuclose) {
            menuclose.addEventListener("click", (e) => {
                const menu = document.querySelector("#menu");
                if (menu) {
                    menu.style.display = "none";
                }
            });
        }
    }
}
new MainPage();
export {};
