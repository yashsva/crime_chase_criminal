exports.date_to_YYYY_MM_DD = (date) => {

    let day=date.getDate();
    day=((day/10<1)?'0':'')+day.toString();
    
    let month=date.getMonth()+1;
    month=((month/10<1)?'0':'')+month.toString();

    new_date = date.getFullYear()+'-' + month+'-' + day;
    return new_date;
}