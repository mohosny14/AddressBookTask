export interface EmployeeModel {
    fullName: string;
    mobileNumber: string;
    birthDate : Date;
    adress: string;
    email : string;
    password : string;
    photo: File;
    jobId: number;
    departmentId : number
  }

export interface Employee {
    id: number;
    fullName: string;
    mobileNumber: string;
    birthDate: Date;
    adress: string;
    email: string;
    password: string;
    age: number;
    JobName: string;
    DepartmentName: string;
    PhotoUrl: string; 
  }
  