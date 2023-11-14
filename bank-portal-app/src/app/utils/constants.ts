export const KYCCredentials = ['PassportCredential', 'UtilityBillCredential','EmploymentCredential']; 
export const KYBCredentials = ['BusinessLicenseCredential', 'IncomeStatementCredential','ReusableKYBCredential'];

export const verifierUsername = 'JPM'; 


export const PassportCredential = 'PassportCredential'; 
export const EmploymentCredential = 'EmploymentCredential';
export const UtilityBillCredential = 'UtilityBillCredential';
export const ReusableKYCCredential = 'ReusableKYCCredential'

export const BusinessLicenseCredential = 'BusinessLicenseCredential'; 
export const IncomeStatementCredential = 'IncomeStatementCredential'; 
export interface ReusableKYCCredential { 
    firstName:string; 
    lastName:string; 
    dateOfBirth:string; 
    address:string; 
    country:string;
    state:string;
    city:string
    zipCode:string;
    jobTitle:string; 
    employerName:string; 
    salary:string;
}