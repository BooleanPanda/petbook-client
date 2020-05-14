export default function deleteSinglePhoto (date:string) {
    let dt = new Date(date);
    return `${dt.getHours()}:${dt.getMinutes()} ${dt.getDate()}.${dt.getMonth()+1}.${dt.getFullYear()}`;
};