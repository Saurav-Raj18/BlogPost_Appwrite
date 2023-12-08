import conf from "../config/conf";
import { Client, Account,ID } from "appwrite";
//Making class in javascript for testing purposes...
export class AuthService {
    client=new Client();
    account;
    //Making constructor when user will create the object then account will be initialsed and client will be set 
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL) 
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    // function for creating a new account
    async createAccount({email, password,name}){
        try {
           const userAccount= await this.account.create(ID.unique(),email,password,name);
           //if user created account successfully then direct login the user 
           if(userAccount){
             return this.login(email,password);
           }
           else {
           return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }
    //function for login 
    async login({email,password}){
        try {
           return  await this.account.createEmailSession(email,password);
        } catch (error) {
           throw error;   
        }
    }

    //to check wheather the user is loggged in or not after landing in home page.

    async getCurrentUser(){
        try {
            return await this.account.get();
            
        } catch (error) {
            throw error;
        }

        return null;
    }

    //to make user logout
    async logout(){
        try {
          return   await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
};

const authService=new AuthService();//making object using new keyword
export default authService;