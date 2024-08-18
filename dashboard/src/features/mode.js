import {createSlice} from "@reduxjs/toolkit";

export const modeSlice = createSlice({
    name:'mode',
    initialState:{value:{
        mode:false,
        modestate:"MANUAL"
    }},
    reducers:{
        setmode:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const{setmode} = modeSlice.actions;
export default modeSlice.reducer;