(function (){
var stock = {
    transCode: function(stockcode){
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
};
window.stock = stock;
})();
