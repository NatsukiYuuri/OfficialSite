"use strict";
class ScreenShot {
    constructor() {
        this.currentPage = 0;
        this.currentTab = "self";
        this.VIEW_NUM = 10;
        this.SELF_SS_MAX = 3;
        this.PRESENT_SS_MAX = 0;
        // タブ切り替え
        const elements = document.querySelectorAll('._tab-item');
        elements.forEach(element => {
            element.addEventListener("click", (e) => {
                elements.forEach(elem2 => {
                    elem2.classList.remove('_select');
                });
                element.classList.add("_select");
                this.UpdateTab();
            });
        });
        this.UpdateTab();
    }
    UpdateTab() {
        // 選択中のタブ
        const selfTab = document.querySelector("#screen-shot-tab-self");
        const presentTab = document.querySelector("#screen-shot-tab-present");
        const isSelectSelf = selfTab?.classList.contains("_select");
        if (isSelectSelf) {
            if (this.currentTab != "self") {
                this.currentTab = "self";
                this.currentPage = 0;
            }
        }
        else if (presentTab?.classList.contains("_select")) {
            if (this.currentTab != "present")
                this.currentTab = "present";
            this.currentPage = 0;
        }
        // タブ変更なし
        else
            return;
        // 現在ある要素の削除
        const target = document.querySelector("#screen-shot-picture-list");
        if (target) {
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
        }
        // 提供タブのとき、共有ボタンを作成
        if (!isSelectSelf) {
            const shareBtn = document.createElement("button");
            shareBtn.textContent = "共有する";
            shareBtn.classList.add("_share-button");
            target.appendChild(shareBtn);
            shareBtn.addEventListener("click", (e) => {
                const message = "%23名月ゆうり思い出保管庫";
                window.open("https://x.com/intent/post?text=" + message, '_blank');
            });
        }
        // 現在ページ読み込み
        for (let i = 0; i < this.VIEW_NUM; i++) {
            const srcCnt = this.VIEW_NUM * this.currentPage + i;
            // 画像数を超える
            if (srcCnt >= (isSelectSelf ? this.SELF_SS_MAX : this.PRESENT_SS_MAX))
                break;
            const imgName = srcCnt.toString().padStart(5, "0");
            const dir = "assets/res/screen_shot/" + (isSelectSelf ? "self/" : "present");
            // 要素作成して入れる
            const img = document.createElement("img");
            img.src = dir + imgName + ".png";
            const wrapper = document.createElement("div");
            wrapper.classList.add("_picture-list-elem-wrapper");
            wrapper.appendChild(img);
            target.appendChild(wrapper);
        }
    }
}
new ScreenShot();
