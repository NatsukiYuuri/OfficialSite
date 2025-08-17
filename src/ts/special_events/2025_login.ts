import { setCookie, getCookie } from 'typescript-cookie';

interface DayElem {
    [key: number]: HTMLDivElement;
}

class Event2025LoginStamp {

    private readonly STAMP_RES_PATH = "../assets/res/others/202508event/inkan.png"
    private readonly SE_DIR_PATH = "../assets/res/others/202508event/sounds/"
    private readonly GRACE_TIME = 40;
    private readonly YEAR = 2025;
    private readonly Month = 7; // 0スタートで8月
    private readonly RestDays = [11, 14, 15];

    private readonly DATA_KEYS = {
        Name: "key",
        ReferenceTime: "referenceTime",
        Days: "days"
    }

    constructor() {
        this.Init();
    }

    async Init() {
        const referenceTime = await this.PopSetTimeWindowAsync();
        console.log(referenceTime);

        (document.querySelector("#time-reset-button") as HTMLElement).addEventListener("click", (e) => {
            this.MyClearData(this.DATA_KEYS.ReferenceTime)
            window.location.reload();
        });
        (document.querySelector("#add-first-time") as HTMLElement).addEventListener("click", (e) => {
            const data = this.GetDaysCookie();
            if (!data.includes(1)) {
                data.push(1);
                this.SetDaysCookie(data);
            }
            (document.getElementById('thx-window') as HTMLDivElement).style.display = "block"
        });
        (document.querySelector("#thx-window-close") as HTMLElement).addEventListener("click", (e) => {
            window.location.reload();
        });

        const wrapper = document.getElementById('calendar-days');
        if (wrapper) {
            const date = new Date();

            const dayElements: DayElem = {};
            //===============
            // カレンダー表示
            //===============
            // 左端から1日まで要素埋める
            const firstDay = new Date(this.YEAR, this.Month, 1).getDay();
            for (let i = 0; i < firstDay; i++) {
                const day = document.createElement('div');
                day.classList.add("_day", "_empty");
                wrapper.append(day);
            }
            // 日付要素作成
            let totalDay = 0
            const daysInMonth = new Date(this.YEAR, this.Month + 1, 0).getDate();
            for (let i = 0; i < daysInMonth; i++) {
                // 要素作成
                const dayElem = document.createElement('div');
                dayElem.classList.add("_day");
                wrapper.append(dayElem);

                // 要素の中身作成
                dayElem.textContent = (i + 1).toString() // 日付入れる
                if (!this.isActiveDay(i+1))
                    dayElem.classList.add("_empty"); // 土日は休み
                else
                    totalDay++;

                dayElements[i + 1] = dayElem;
            }
            // 31日から右端まで要素埋める
            const lastDay = new Date(this.YEAR, this.Month + 1, 0).getDay();
            for (let i = 0; i < (7 - lastDay - 1); i++) {
                const day = document.createElement('div');
                day.classList.add("_day", "_empty");
                wrapper.append(day);
            }

            // 前日までのスタンプ取得して表示追加
            const before = this.GetDaysCookie();
            for (let i = 0; i < before.length; i++) {
                const day = before[i];
                // スタンプ要素
                const img = document.createElement('img');
                img.src = this.STAMP_RES_PATH;
                // console.log(day)
                dayElements[day].append(img)
            }
            (document.querySelector("#login-stamp-button") as HTMLElement).addEventListener("click", (e) => {
                
                // this.PushTodayStamp(date, referenceTime, before, dayElements)
                // 今日のスタンプ追加してcookie保存
                if (this.isActiveDay(date.getDate())) {

                    if (this.isWithinMinutes(referenceTime, this.GRACE_TIME)) {
                        const today = date.getDate();
                        if (!before.includes(today))
                            before.push(today)
                        this.SetDaysCookie(before)

                        // スタンプ押印
                        const img = document.createElement('img');
                        img.src = this.STAMP_RES_PATH;
                        dayElements[today].append(img)
                        
                        // 音声再生
                        if((document.getElementById("is_sound_available_check") as HTMLInputElement).checked) {
                            const audio = new Audio(this.SE_DIR_PATH + "voice001.mp3");
                            audio.play();
                        }
                    }
                }
            });

            // あなたの情報更新
            this.SettingUserDatasText(referenceTime, totalDay, before.length)
        }
    }

    private SettingUserDatasText(_time: string, _total: number, _progress: number) {
        const time = document.getElementById('login-stamp-card-setting-time-text') as HTMLSpanElement;
        time.textContent = _time

        const progress = document.getElementById('login-stamp-card-progress-text') as HTMLSpanElement;
        progress.textContent = _progress.toString() + "/" + _total.toString()

        const test = document.getElementById('login-stamp-card-test-text') as HTMLSpanElement;
        test.textContent = localStorage.getItem(this.DATA_KEYS.Days)
    }

    // 時間設定
    private async PopSetTimeWindowAsync(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const target = this.MyGetData(this.DATA_KEYS.ReferenceTime);

            // 未設定
            if (target == undefined || target == "") {
                console.log("targetが見つかりません")
                const submit = document.getElementById('set-time-window-button') as HTMLButtonElement;
                submit.addEventListener("click", (e) => {
                    const time = document.getElementById('set-time-window-time') as HTMLInputElement;
                    const isValidTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(time.value);
                    if (isValidTime) {
                        this.MySetData(this.DATA_KEYS.ReferenceTime, time.value);
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

    // 今日分のスタンプを押す
    private PushTodayStamp(date: any, referenceTime: any, before: any, dayElements: any) {
    }

    SetDaysCookie(_numbers: number[]) {
        this.MySetData(this.DATA_KEYS.Days, JSON.stringify(_numbers));
    }
    GetDaysCookie(): number[] {
        const result = this.MyGetData(this.DATA_KEYS.Days);
        if (result == undefined)
            return []

        return JSON.parse(result)
    }

    MySetData(_key: string, _data: any) {
        setCookie(_key, _data, {
            expires: 100,
            path: "/",
            secure: true,
            // sameSite: "Lax"
        });
        localStorage.setItem(_key, _data);
    }
    MyGetData(_key: string): any {
        let result: any = getCookie(_key);

        if (result == undefined || result == "") {
            result = localStorage.getItem(_key)
            if (result == null)
                result = undefined
        }
        return result;
    }
    MyClearData(_key: string) {
        setCookie(_key, "", {
            expires: 100,
            path: "/",
            secure: true,
            sameSite: "Lax"
        });
        localStorage.removeItem(_key)
    }

    private isWithinMinutes(targetStr: string, withinMinutes: number): boolean {
        const now = new Date();
        console.log("現在：" + now.getMonth() + " 設定：" + this.Month)
        if (now.getMonth() != this.Month)
            return false;

        const [hh, mm] = targetStr.split(':').map(Number); // 数値に変換！

        // Date に渡す（年, 月, 日, 時, 分）
        const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm);
        const diffMs = Math.abs(target.getTime() - now.getTime());
        return diffMs <= withinMinutes * 60 * 1000;
    }
    private isActiveDay(num: number) {
        const day = new Date(this.YEAR, this.Month, num).getDay();
        // console.log(day);
        // (document.getElementById('test-text') as HTMLButtonElement).textContent = day.toString();

        if (day == 6 || day == 0)
            return false
        else if (this.RestDays.includes(num))
            return false

        return true
    }
}

new Event2025LoginStamp()