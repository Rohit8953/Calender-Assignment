import { createSlice } from "@reduxjs/toolkit";

const eventSlice=createSlice({
    name:"event",
    initialState:{
        eventdetail:[]
    },
    reducers:{
        geteventdetail:(state,action)=>{
            state.eventdetail=action.payload;
        }, 
    }
})

export const {geteventdetail}=eventSlice.actions;
export default eventSlice.reducer;