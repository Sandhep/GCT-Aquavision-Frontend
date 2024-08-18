import {createSlice} from "@reduxjs/toolkit";

export const statuscolorSlice = createSlice({
    name:'statuscolor',
    initialState:{value:"red"},
    reducers:{
        setcolor:(state,action)=>{
            state.value=action.payload.statuscolor;
        }
    }
})

export const{setcolor} = statuscolorSlice.actions;
export default statuscolorSlice.reducer;