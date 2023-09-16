import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
// Type for our state
export interface BooksState {
    booksState: any[];
    message:{
        msg:string,
        severity:string
    }
}

// Initial state
const initialState: BooksState = {
    booksState: [],
    message:{
        msg:"",
        severity:"info"
    }
};

// Actual Slice
export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        createBookToState(state, action) {
            if (!/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(action.payload.price)){
                state.message ={
                    msg:"price is invalid, please double check",
                    severity:"error"
                }
            }else{
                state.booksState = [...state.booksState,{
                    id:Math.random().toString(16).slice(2),
                    name: !!action.payload.name ? action.payload.name: "no name" ,
                    price:!!action.payload.price ? action.payload.price: "no price",
                    category:!!action.payload.category ? action.payload.category: "no category",
                    description:!!action.payload.description ? action.payload.description: "no description",
                }]
                state.message ={
                    msg:"the book is added successfully",
                    severity:"success"
                }
            }


        },

        updateBookToState(state, action) {
            if (!/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(action.payload.price)){
                state.message ={
                    msg:"the price is invalid, please double check",
                    severity:"error"
                }
            }else{
                let index = state.booksState.findIndex((obj => obj.id === action.payload.id));
                state.booksState[index].name =!!action.payload.name ? action.payload.name: "no name"
                state.booksState[index].price =!!action.payload.price ? action.payload.price: "no price",
                state.booksState[index].category =!!action.payload.category ? action.payload.category: "no category",
                state.booksState[index].description =!!action.payload.description ? action.payload.description: "no description",

                state.message ={
                    msg:"the book is updated successfully",
                    severity:"success"
                }
            }


        },



        deleteBookfromState(state, action) {
            const result = state.booksState.filter((book) => book.id !== action.payload.id);
            state.booksState = [...result]
            state.message ={
                msg:"the book is deleted successfully",
                severity:"success"
            }
        },




        setIniMsg(state, action) {
            state.message ={
                msg:"",
                severity:"info"
            }
        }

    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.books,
            };
        },
    },
});

export const { createBookToState,deleteBookfromState,updateBookToState, setIniMsg} = booksSlice.actions;

export const selectAuthState = (state: AppState) => state.books.booksState;
export const selectMsg = (state: AppState) => state.books.message;

export default booksSlice.reducer;
