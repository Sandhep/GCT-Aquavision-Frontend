import {createSlice} from "@reduxjs/toolkit";

export const timeSlice = createSlice({
    name:'time',
    initialState:{value:{
        starttime:"",
        endtime:""
    }},
    reducers:{
        settime:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const{settime} = timeSlice.actions;
export default timeSlice.reducer;