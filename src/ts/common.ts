class Common {
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

        // メニュー
        // 開くとき
        const menuOpen = document.querySelector("#menu-open-btn") as HTMLElement;
        if(menuOpen) {
            menuOpen.addEventListener("click", (e) => {
                const menu = document.querySelector("#menu") as HTMLElement;
                if(menu) {
                    menu.style.display = "block"
                }
                
                // メニューの線を引く
                const points = [];

                for (let i = 1; i <= 7; i++) {
                    const el = document.querySelector(`._${i}`) as HTMLElement;
                    const rect = el.getBoundingClientRect();

                    const x = rect.left + 8;
                    const y = rect.top + rect.height / 2;
                    points.push({ x, y });
                }
                const polylineEl = document.querySelector('polyline') as SVGPolylineElement;
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
            })
        }
        // 閉じるとき
        const menuclose = document.querySelector("#menu-close-btn") as HTMLElement;
        if(menuclose) {
            menuclose.addEventListener("click", (e) => {
                const menu = document.querySelector("#menu") as HTMLElement;
                if(menu) {
                    menu.style.display = "none"
                }
            })
        }
    }
}

new Common()