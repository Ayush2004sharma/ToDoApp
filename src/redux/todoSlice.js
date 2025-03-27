import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  todos: localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [],
  filter: "All", // "All", "Completed", "Incomplete"
  sort: "Newest", // "Newest", "Oldest", "Priority"
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleComplete: (state, action) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, isComplete: !todo.isComplete } : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

// ✅ Memoized Selector using createSelector
export const selectFilteredSortedTodos = createSelector(
  [(state) => state.todo.todos, (state) => state.todo.filter, (state) => state.todo.sort],
  (todos, filter, sort) => {
    let filteredTodos = [...todos];

    // Apply filtering
    if (filter === "Completed") {
      filteredTodos = filteredTodos.filter(todo => todo.isComplete);
    } else if (filter === "Incomplete") {
      filteredTodos = filteredTodos.filter(todo => !todo.isComplete);
    }

    // Apply sorting
    if (sort === "Newest") {
      filteredTodos.sort((a, b) => b.id - a.id);
    } else if (sort === "Oldest") {
      filteredTodos.sort((a, b) => a.id - b.id);
    } else if (sort === "Priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      filteredTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    return filteredTodos; // ✅ Memoized result
  }
);

export const { addTodo, removeTodo, toggleComplete, setFilter, setSort } = todoSlice.actions;
export default todoSlice.reducer;
