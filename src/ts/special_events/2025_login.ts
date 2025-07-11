import { setCookie, getCookie, removeCookie, getCookies } from 'typescript-cookie';

class Event2025LoginStamp {

    private readonly STAMP_RES_PATH = "../assets/res/others/202508event/inkan.png"

    constructor() {
        const wrapper = document.getElementById('calendar-days');
        if(wrapper) {
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
            const daysInMonth = new Date(year, month+1, 0).getDate();
            for(let i=0; i<daysInMonth; i++) {
                // 要素作成
                const dayElem = document.createElement('div');
                dayElem.classList.add("_day");
                wrapper.append(dayElem);

                // 要素の中身作成
                const day = new Date(year, month, i+1).getDay();
                dayElem.textContent  = (i+1).toString() // 日付入れる
                if(day == 6 || day == 0 || (i+1) == 11)
                    dayElem.classList.add("_empty"); // 土日祝は休み
                
                dayElements.push({dayCnt: i+1, elem: dayElem});
            }
            // 31日から右端まで要素埋める
            const lastDay = new Date(year, month+1, 0).getDay();
            for (let i = 0; i < (7 - lastDay-1); i++) {
                const day = document.createElement('div');
                day.classList.add("_day", "_empty");
                wrapper.append(day);
            }


            // 今日までのスタンプ追加してcookieに保存
            const img = document.createElement('img');
            img.src = this.STAMP_RES_PATH;
            dayElements[5].elem.append(img)

            this.SetCookie([0, 1, 2])
        }
    }

    SetCookie(_numbers: number[]) {
        // ２か月後まで残るcookieセット
        const now = new Date()
        setCookie('days', JSON.stringify(_numbers), { expires: now.setMonth(now.getMonth()+2) });
    }
}

new Event2025LoginStamp()