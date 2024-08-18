import {configureStore } from "@reduxjs/toolkit";
import eventSlice from "../Redux/eventSlice"


const store = configureStore({
    reducer:{
              event:eventSlice,
    }
})


export default store;