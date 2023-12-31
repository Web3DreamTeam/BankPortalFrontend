export const parseDateOfBirth = (dob:string) => {
    //assumes YYYYMMDD format
    return dob.substring(0,4)+'-'+dob.substring(4,6)+'-'+dob.substring(6,8); 
}
// only format 5,6 or 7 figure
// export const parseDollarAmount = (amount:string) => {
//     if(amount.length === 5) {
//         return '$'+amount.substring(0,2)+','+amount.substring(2);
//     } else if(amount.length === 6) { // 6 figure
//         return '$'+amount.substring(0,3)+','+amount.substring(3);
//     } else {
//         return '$'+amount.substring(0,1)+','+amount.substring(1,4)+','+amount.substring(4,7);
//     }
// }

export const parseDollarAmount = (amount:string) => {
    if(amount === undefined) return
    return amount.replace(/\D/g, '');
}

export const parseAddress = (address: string, part:string ) => {
    if(address === undefined) return
    if(part == 'Address Line'){
        return address.split(',')[0]
    }else if(part == "Country"){
        return "United States"
    }else if(part == "City"){
        return address.split(',')[1]
    }else if(part == "State"){
        console.log(address.split(',')[2].split(" "))
        return address.split(',')[2].split(" ")[1]
    }else if(part == "Zip Code"){
        return address.split(',')[2].split(" ")[2] 
    }
}