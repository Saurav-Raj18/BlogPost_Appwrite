/*after configureStore make createSlice*/
import { createSlice} from "@reduxjs/toolkit";

/*This page is mainly to check userlogin credentials aur authorisation store*/
const initialState={
     status:false,
     userData:null
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       login:(state,action)=>{
           state.status=true;
           state.userData=action.payload.userData;
       },

       logout:(state)=>{
             state.status=false;
             state.userData=null
       }
    }
})

/*we have to export two thing one is all reducer using authSlice.actions and other is default authSlice.reducer*/
export const {login, logout} =authSlice.actions;

export default authSlice.reducer; 