import { IBankAccount } from "./ibank-account"

export interface IUser {
    id:number,
    firstName:string,
    lastName:string,
    username:string,
    email:string,
    isActive:boolean,
    bankAccounts: IBankAccount[]
}
