import {createSlice} from "@reduxjs/toolkit";

export const statusSlice = createSlice({
    name:'status',
    initialState:{value:"Offline"},
    reducers:{
        setstatus:(state,action)=>{
            state.value=action.payload.status;
        }
    }
})

export const{setstatus} = statusSlice.actions;
export default statusSlice.reducer;