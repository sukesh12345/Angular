export interface userinfo {
    Lastname: string,
    Gender: string,
    Dob: string,
    Email: string,
    Telephone: string,
    Password: string,
    Confirmpassword: string,
    Status: string,
    Firstname: string,
    ___kp_UserId: number,
    Type: string,
    Doorno: any,
    Streetname: any,
    City: any,
    State: any,
    Postalcode: any,
    ___kp_AddressId: any
    status:any;
}
export interface gender {
    name: string;

}
export interface usertype {
    name: string;
}
export interface jobdata {
    ___kp_JobId: any,
    Company: any,
    DriveDate: any,
    Drivedetails: any,
    __kf_UserId: any,
    CompanyWebsite: any,
    CompanyLocation: any,
    image:any
}
export interface skills{
    skillname:any;
}
export class  ImageSnippet {
    pending: boolean = false;
    status: string = 'init';
  
    constructor(public src: string, public file: File) {}
  }