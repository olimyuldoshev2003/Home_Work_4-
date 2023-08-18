import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state

export interface ITodo {
  id: number;
  title: string;
  complete: boolean;
}

interface IAction {
    payload: any;
    type: string;
}

interface ITodoState {
  todo: ITodo[];
  title: string;
  modal: boolean;
  text: string;
  idx: number;
}

// Define the initial state using that type

const initialState: ITodoState = {
  todo: [
    {
      id: 1,
      title: "Hello",
      complete: false,
    },
    {
      id: 2,
      title: "Goodbye",
      complete: false,
    },
  ],

  title: "",
  modal: false,
  text: "",
  idx: 0,
};

export const Todo = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    setTitle: (state: ITodoState, action: IAction) => {
      state.title = action.payload;
    },
    addUser: (state: ITodoState, action: IAction) => {
      action.payload.preventDefault();
      let newObj = {
        id: Date.now(),
        title: state.title,
        complete: false,
      };

      state.todo = [...state.todo, newObj];
      state.title = "";
    },
    deleteUser: (state: WritableDraft<ITodoState>, action: IAction) => {
      state.todo = state.todo.filter((item) => {
        return item.id !== action.payload;
      });
    },
    completedUser: (state: WritableDraft<ITodoState>, action: IAction) => {
      state.todo = state.todo.map((item) => {
        if (item.id === action.payload) {
          item.complete = !item.complete;
        }
        return item;
      });
    },

    openModal: (state: WritableDraft<ITodoState>, action: IAction) => {
      state.modal = true;
      state.text = action.payload.title;
      console.log(state.text);

      state.idx = action.payload.id;
      console.log(state.idx);
    },

    setModal: (state: WritableDraft<ITodoState>) => {
      state.modal = false;
    },
    setText: (state: WritableDraft<ITodoState>, action: IAction) => {
      state.text = action.payload;
    },
    editUser: (state: WritableDraft<ITodoState>, action: IAction) => {
      action.payload.preventDefault();

      state.todo = state.todo.map((item: WritableDraft<ITodo>) => {
        if (state.idx === item.id) {
          item.title = state.text;
        }
        return item;
      });
      state.modal = false;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.Todo;
export const {
  setTitle,
  addUser,
  deleteUser,
  completedUser,
  openModal,
  setModal,
    setText,
  editUser
} = Todo.actions;

export default Todo.reducer;
