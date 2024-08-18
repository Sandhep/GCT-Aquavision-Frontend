import {createSlice} from "@reduxjs/toolkit";

export const sensordataSlice = createSlice({
    name:'sensordata',
    initialState:{value:{
        OHT_Float:"OFF",
        UGT_Float:"OFF"
    }},
    reducers:{
        setsensordata:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const{setsensordata} = sensordataSlice.actions;
export default sensordataSlice.reducer;