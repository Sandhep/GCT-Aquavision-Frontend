import {createSlice} from "@reduxjs/toolkit";

export const timerSlice = createSlice({
    name:'timer',
    initialState:{value:{
        mode:false,
        modestate:"DISABLED"
    }},
    reducers:{
        settimer:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const{settimer} = timerSlice.actions;
export default timerSlice.reducer;