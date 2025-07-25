import { setCookie, getCookie, removeCookie, getCookies } from 'typescript-cookie';

interface DayElem {
    [key: number]: HTMLDivElement;
}

class Event2025LoginStamp {

    private readonly STAMP_RES_PATH = "../assets/res/others/202508event/inkan.png"
    private readonly GRACE_TIME = 40;

    constructor() {
        this.Init();
    }

    async Init() {
        const referenceTime = await this.PopSetTimeWindowAsync();

        const wrapper = document.getElementById('calendar-days');
        if(wrapper) {
            const date = new Date();
            const month = 7; // 0スタートで8月
            const year = date.getFullYear();

            const dayElements: DayElem = {};
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
                
                dayElements[i+1] = dayElem;
            }
            // 31日から右端まで要素埋める
            const lastDay = new Date(year, month+1, 0).getDay();
            for(let i = 0; i < (7 - lastDay-1); i++) {
                const day = document.createElement('div');
                day.classList.add("_day", "_empty");
                wrapper.append(day);
            }

            // 前日までのスタンプ取得して表示追加
            const before = this.GetDaysCookie();
            for(let i=0; i<before.length; i++) {
                const day = before[i];
                // スタンプ要素
                const img = document.createElement('img');
                img.src = this.STAMP_RES_PATH;
                // console.log(day)
                dayElements[day].append(img)
            }

            // 今日のスタンプ追加してcookie保存
            if(this.isWithinMinutes(referenceTime, this.GRACE_TIME)) {
                const today = date.getDate();
                if(!before.includes(today))
                    before.push(today)
                this.SetDaysCookie(before)

                // スタンプ押印
                const img = document.createElement('img');
                img.src = this.STAMP_RES_PATH;
                dayElements[today].append(img)
            }
        }
    }
    
    // 時間設定
    private async PopSetTimeWindowAsync(): Promise<string> {
        const cookieKeyName = "referenceTime"
        const now = new Date()
        return new Promise<string>((resolve, reject) => {
            const target = getCookie(cookieKeyName);

            // 未設定
            if(target == undefined) {
                console.log("targetが見つかりません")
                const submit = document.getElementById('set-time-window-button') as HTMLButtonElement;
                submit.addEventListener("click", (e) => {
                    const time = document.getElementById('set-time-window-time') as HTMLInputElement;
                    const isValidTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(time.value);
                    if(isValidTime) {
                        setCookie(cookieKeyName, time.value, { expires: now.setMonth(now.getMonth()+2) });
                        (document.getElementById('set-time-window') as HTMLDivElement).style.display = "none"
                        resolve(time.value)
                        return
                    }
                    console.log("時間が有効ではありません")
                })
            }
            // 設定済み
            else {
                (document.getElementById('set-time-window') as HTMLDivElement).style.display = "none"
                resolve(target)
            }
        })
    }

    SetDaysCookie(_numbers: number[]) {
        // ２か月後まで残るcookieセット
        const now = new Date()
        setCookie('days', JSON.stringify(_numbers), { expires: now.setMonth(now.getMonth()+2) });
    }
    GetDaysCookie(): number[] {
        const result = getCookie('days');
        if(result == undefined)
            return []

        return JSON.parse(result)
    }

    private isWithinMinutes(targetStr: string, withinMinutes: number): boolean {
        const now = new Date();
        const [hh, mm] = targetStr.split(':').map(Number); // 数値に変換！

        // Date に渡す（年, 月, 日, 時, 分）
        const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm);
        const diffMs = Math.abs(target.getTime() - now.getTime());
        return diffMs <= withinMinutes * 60 * 1000;
    }
}

new Event2025LoginStamp()