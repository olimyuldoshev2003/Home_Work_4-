import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state

export interface ITodo {
    id: number,
    title: string,
    complete:boolean
}


interface ITodoState {
    todo: ITodo[];
    title:string
}

// Define the initial state using that type

const initialState:ITodoState= {
    todo: [
        {
            id: 1,
            title: "Hello",
            complete:false
        },
        {
            id: 2,
            title: "Goodbye",
            complete:false
        }
    ],

    title: ""
}

export const Todo = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    addUser: (state, action) => {
      action.payload.preventDefault();
      let newObj = {
        id: Date.now(),
        title: state.title,
        complete: false,
      };

      state.todo = [...state.todo, newObj];
      state.title = "";
    },
    deleteUser: (state, action) => {
      state.todo = state.todo.filter((item) => {
        return item.id !== action.payload;
      });
    },
      completedUser: (state, action)=> {
          state.todo = state.todo.map((item) => {
              if (item.id === action.payload) {
                item.complete = !item.complete
              }
              return item;
        })
    }
  },
});


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.Todo;
export const { setTitle, addUser, deleteUser, completedUser } = Todo.actions;

export default Todo.reducer;