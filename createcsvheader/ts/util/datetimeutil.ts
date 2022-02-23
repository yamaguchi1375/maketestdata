
export class DateUtil {
    static getRandomYmd(fromYmd: string, toYmd: string): string {

        var d1: any = new Date(fromYmd);
        var d2: any = new Date(toYmd);
      
        var c: number = (d2 - d1) / 86400000;
        var x = Math.floor(Math.random() * (c+1));
      
        d1.setDate(d1.getDate() + x);
      
        //フォーマット整形
        var y = d1.getFullYear();
        var m = ("00" + (d1.getMonth()+1)).slice(-2);
        var d = ("00" + d1.getDate()).slice(-2);
      
        return y + "/" + m + "/" + d;
      
    };
    static getRandomTime(starthour: number, endhour: number): number {
        var timenum = Math.floor( Math.random() * (endhour + 1 - starthour) ) +  starthour;
        return timenum * 100;
    };
    static getRandomChoiceDate(birthday: string) {
        return DateUtil.getRandomYmd(birthday,'2022/02/15');
    };
    static getRandomChoiceTime() {
        return DateUtil.getRandomTime(10, 17);
    };
}




