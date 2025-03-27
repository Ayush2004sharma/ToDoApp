import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { fetchWeather } from "../redux/weatherSlice";
import { addTodo, setFilter, setSort, selectFilteredSortedTodos } from "../redux/todoSlice";
import ToDolist from "./ToDolist";
import gsap from "gsap";
import { FcTodoList } from "react-icons/fc";

const ToDo = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredSortedTodos);
  const { filter, sort } = useSelector((state) => state.todo);
  const { temp, city, icon, status } = useSelector((state) => state.weather);
  const [priority, setPriority] = useState("Low");
  const inputRef = useRef();
  const cardRef = useRef();

  useEffect(() => {
    dispatch(fetchWeather());

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, [dispatch]);

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) return;

    const newToDo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      priority: priority,
    };

    dispatch(addTodo(newToDo));
    inputRef.current.value = "";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 sm:px-6">
      <div
        ref={cardRef}
        className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl p-5 sm:p-7 rounded-3xl backdrop-blur-lg bg-white/80 shadow-xl border border-blue-300 text-gray-900"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
          <FcTodoList size={28} className="text-blue-500" />
            <h1 className="text-2xl font-bold">To-Do</h1>
          </div>

          {/* Weather Section */}
          <div className="flex items-center gap-2 text-gray-700">
            {status === "loading" ? (
              <p className="text-sm">Fetching weather...</p>
            ) : status === "failed" ? (
              <p className="text-red-400 text-sm">Weather Unavailable</p>
            ) : (
              <>
                <img src={icon} alt="weather" className="w-6 h-6 animate-pulse" />
                <p className="text-sm">{city} {temp}°C</p>
              </>
            )}
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="text-red-500 hover:text-red-400 transition text-sm"
          >
            Logout
          </button>
        </div>

        {/* Input Section */}
        <div className="flex flex-wrap items-center gap-3 bg-blue-100 rounded-2xl p-3">
          <input
            type="text"
            placeholder="Add your task..."
            className="bg-transparent text-gray-800 placeholder:text-gray-500 flex-1 px-3 py-2 outline-none w-full sm:w-auto"
            ref={inputRef}
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              className="bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer w-full sm:w-auto"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition w-full sm:w-auto"
              onClick={add}
            >
              Add +
            </button>
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
          <select
            className="border border-blue-300 bg-blue-100 text-gray-800 px-3 py-2 rounded-lg w-full sm:w-auto"
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>

          <select
            className="border border-blue-300 bg-blue-100 text-gray-800 px-3 py-2 rounded-lg w-full sm:w-auto"
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Priority">Priority</option>
          </select>
        </div>

        {/* To-Do List */}
        <div className="mt-4 space-y-2">
          {todos.map((todo) => (
            <ToDolist key={todo.id} {...todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
