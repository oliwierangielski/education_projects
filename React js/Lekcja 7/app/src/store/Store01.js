import { createSlice } from '@reduxjs/toolkit'


const store01 = {
    testValue: createSlice({
        name: 'value description',
        initialState: {
            value1: 1234,
        }
    }).reducer,
}

export default store01