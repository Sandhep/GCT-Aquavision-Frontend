import {createSlice} from "@reduxjs/toolkit";

export const timerbuttonSlice = createSlice({
    name:'timerbutton',
    initialState:{value:{
        bt_state:"SET TIME"
    }},
    reducers:{
        set_timerbutton:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const{set_timerbutton} = timerbuttonSlice.actions;
export default timerbuttonSlice.reducer;