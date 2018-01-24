//******************************
//Please import the z js before.
//******************************
(function (){
function transCode(stockcode) {
    reg1 = /^[s][hz][630][0-9]{5}$/i;
    reg2 = /^[6][0-9]{5}$/;
    reg3 = /^[30][0-9]{5}$/;
    if(reg1.test(stockcode)){
        return stockcode;
    } else if (reg2.test(stockcode)) {
        return 'sh'+stockcode;
    } else if (reg3.test(stockcode)) {
        return 'sz'+stockcode;
    } else {
        return false;
    }
}
//******************************
//Get the time of trading status.
//0 : is not trading day
//1 : before 9:20 in trading day
//2 : after 9:20 before 11:30
//3 : after 11:30 before 13:00
//4 : after 13:00 before 15:00
//5 : after 15:00
//******************************
function isTrading() {
    let inweek = Z.getTime('inweek');
    if (inweek == 6 || inweek == 7) {
        return 0;
    }
    let hour = Z.getTime('hour');
    let minute = Z.getTime('minute');
    if (hour < 9 || (hour == 9 && minute < 20)) {
        return 1;
    }
    if ((hour == 9 && minute >= 20) || hour == 10 || (hour == 11 && minute <= 30)) {
        return 2;
    }
    if (hour == 12 || (hour == 11 && minute >= 30)) {
        return 3;
    }
    if (hour == 13 || hour == 14) {
        return 4;
    }
    return 5;
}

window.stock = {
        transCode : transCode,
        isTrading : isTrading,
    };
})();
