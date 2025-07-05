"use strict";
class Event2025LoginStamp {
    constructor() {
        const wrapper = document.getElementById('calendar-days');
        if (wrapper) {
            const date = new Date();
            const month = 7; // 0スタートで8月
            const year = date.getFullYear();
            const dayElements = new Array();
            //===============
            // カレンダー表示
            //===============
            // 左端から1日まで要素埋める
            const firstDay = new Date(year, month, 1).getDay();
            for (let i = 0; i < firstDay; i++) {
                const day = document.createElement('div');
                day.classList.add("_day", "_empty");
                wrapper.append(day);
            }
            // 日付要素作成
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            for (let i = 0; i < daysInMonth; i++) {
                // 要素作成
                const dayElem = document.createElement('div');
                dayElem.classList.add("_day");
                wrapper.append(dayElem);
                // 要素の中身作成
                const day = new Date(year, month, i + 1).getDay();
                dayElem.innerText = (i + 1).toString(); // 日付入れる
                if (day == 6 || day == 0 || (i + 1) == 11)
                    dayElem.classList.add("_empty"); // 土日祝は休み
                dayElements.push({ dayCnt: i + 1, elem: dayElem });
            }
            // 31日から右端まで要素埋める
            const lastDay = new Date(year, month + 1, 0).getDay();
            for (let i = 0; i < (7 - lastDay - 1); i++) {
                const day = document.createElement('div');
                day.classList.add("_day", "_empty");
                wrapper.append(day);
            }
            // 今日のスタンプ追加してcookieに保存
        }
    }
}
new Event2025LoginStamp();
