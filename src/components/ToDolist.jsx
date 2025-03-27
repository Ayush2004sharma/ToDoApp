import React from "react";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeTodo, toggleComplete } from "../redux/todoSlice";

const ToDolist = ({ text, priority, isComplete, id }) => {
  const dispatch = useDispatch();

  const priorityStyles = {
    High: "bg-red-500 text-white",
    Medium: "bg-yellow-400 text-gray-800",
    Low: "bg-green-400 text-white",
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-3 rounded-lg border border-blue-300 hover:shadow-lg transition sm:gap-3">
      {/* Left Section: Checkbox & Task */}
      <div
        className="flex items-center cursor-pointer gap-3 flex-1"
        onClick={() => dispatch(toggleComplete(id))}
      >
        {isComplete ? (
          <FaCheckCircle size={22} className="text-blue-500" />
        ) : (
          <FaRegCircle size={22} className="text-blue-400 hover:text-blue-500 transition" />
        )}
        <p className={`text-base font-medium ${isComplete ? "line-through text-gray-500" : "text-gray-900"}`}>
          {text}
        </p>
      </div>

      {/* Right Section: Priority & Delete */}
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityStyles[priority]}`}>
          {priority}
        </span>
        <MdDelete
          size={22}
          className="cursor-pointer text-gray-500 hover:text-red-500 transition"
          onClick={() => dispatch(removeTodo(id))}
        />
      </div>
    </div>
  );
};

export default ToDolist;
