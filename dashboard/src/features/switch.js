import {createSlice} from "@reduxjs/toolkit";

export const switchSlice = createSlice({
    name:'switch',
    initialState:{value:false},
    reducers:{
        toggle:(state,action)=>{
            state.value=action.payload.checked;
        }
    }
})

export const{toggle} = switchSlice.actions;
export default switchSlice.reducer;