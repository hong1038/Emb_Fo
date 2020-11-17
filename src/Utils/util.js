export default {
    

    isEmpty(str) {
        if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false ;
    },

    maxLen4(e){ //최대 4자 이하로구성
        return String(e).substring(0,4);
    },
   
    maxLen20(e){ //최대 50자이하로 구성
        return String(e).substring(0,20);
    },
   
    maxLen50(e){ //최대 50자이하로 구성
        return String(e).substring(0,100);
    },
   
    maxLen100(e){ //c최대 100자이하로 구성
        return String(e).substring(0,100);
    },
   
   
    isGoodDate(str) {
        let regExp = /^(19|20)\d{2}.(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[0-1])$/;
        return regExp.test(this.formatDate(str))
    },

    isGoodHour(str) {
        let regExp = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
        return regExp.test(str)
    },
    isGoodDateTime(str) {
        let regExp =  /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])\s([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
        return regExp.test(str)
    },
    formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    let cnvDate =  [year, month, day].join('-');
    return cnvDate;
  }
};

