import { createSlice } from '@reduxjs/toolkit'

export const textSlice = createSlice({
    name: 'text slice',
    initialState: {
        value: "",
    },
    reducers: {
        addRandomLetter: (state) => {
            let alphabet = "abcdefghijklmnoupqrstuwvxyz"
            state.value += alphabet[Math.floor(Math.random() * alphabet.length)]
        },
        removeFirstLetter: (state) => {
            state.value = state.value.substring(1)
        },
        removeLastLetter: (state) => {
            state.value = state.value.substring(0, state.value.length-1)
        },
    },
})

export const { addRandomLetter, removeFirstLetter, removeLastLetter } = textSlice.actions
export default textSlice.reducer