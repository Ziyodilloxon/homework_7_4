import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/todos/userSlice";
import todosReducer from "../features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});
