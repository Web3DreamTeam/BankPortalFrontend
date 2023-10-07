export const parseDateOfBirth = (dob:string) => {
    //assumes YYYYMMDD format
    return dob.substring(0,4)+'-'+dob.substring(4,6)+'-'+dob.substring(6,8); 
}
// only format 5 or 6 figure salaries
export const parseSalary = (salary:string) => {
    if(salary.length === 5) {
        return '$'+salary.substring(0,2)+','+salary.substring(2);
    } else { // 6 figure
        return '$'+salary.substring(0,3)+','+salary.substring(3);
    }
}