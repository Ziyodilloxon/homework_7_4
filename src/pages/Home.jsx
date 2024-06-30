import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  addTodo,
  removeTodo,
  changeStatusTodo,
} from "../features/todos/todosSlice";
import TodoInput from "../components/TodoInput";
import { useCollection } from "../hooks/useCollection";

function Home() {
  // Tema
  const [theme, setTheme] = useState(themeFromLocalStorage());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function themeFromLocalStorage() {
    return localStorage.getItem("theme") || "light";
  }

  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Redux
  const { todos, completedCount, unCompletedCount } = useSelector(
    (state) => state.todos
  );
  const dispatch = useDispatch();
  // useRef
  const inputText = useRef("");
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputText.current.value.trim();
    if (value) {
      dispatch(
        addTodo({
          id: uuidv4(),
          value,
          completed: false,
        })
      );
      toast.success("Muvaffaqiyatli qo'shildi");
    } else {
      toast.error("Iltimos, biror narsa yozing");
    }
    inputText.current.value = "";
  };

  const { data } = useCollection("todos");

  return (
    <div className="p-8">
      <div
        style={{ position: "absolute", top: "18px", right: "170px" }}
        className="navbar-end flex gap-4"
      >
        <label className="swap swap-rotate">
          <input
            onClick={handleTheme}
            type="checkbox"
            checked={theme === "dark"}
            readOnly
          />
          <IoMdSunny className="swap-on fill-current w-10 h-10" />
          <IoMdMoon className="swap-off fill-current w-10 h-10" />
        </label>
      </div>
      <div className="flex mb-10 gap-8 font-bold text-xl">
        <h2>Bajarilgan✅ : {completedCount}</h2>
        <h2>Bajarilmagan❌ : {unCompletedCount}</h2>
      </div>
      <div className="grid grid-cols-1 mb-4">
        <TodoInput handleSubmit={handleSubmit} inputText={inputText} />
        <div className="mt-8">
          <div className="grid grid-cols-5 gap-4 font-semibold text-lg border-b-2 pb-2 mb-4">
            <h2 className="text-center font-medium text-3xl">#</h2>
            <h2 className="text-center font-medium text-2xl">Vazifa Nomi</h2>
            <h2 className="text-center font-medium text-2xl">Holati</h2>
            <h2 className="text-center font-medium text-2xl">Tahrirlash</h2>
            <h2 className="text-center font-medium text-2xl">O'chirish</h2>
          </div>
          <div className="space-y-4">
            {data &&
              data.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 gap-4 items-center border-b p-2"
                >
                  <h3 className="text-center font-bold text-xl pr-6">
                    {index + 1}
                  </h3>
                  <h4 className="text-center font-bold text-xl">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-center">
                    <div className="flex gap-3 items-center">
                      <button
                        className={`btn btn-outline ${
                          item.completed ? "btn-success" : "btn-warning"
                        }`}
                      >{`${
                        item.completed ? "Bajarildi ✅" : "Jarayonda ⌚️"
                      }`}</button>
                      <input
                        className="checkbox checkbox-success"
                        type="checkbox"
                        onChange={() => dispatch(changeStatusTodo(item.id))}
                        checked={item.completed}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="text-blue-500 btn btn-outline btn-primary">
                      <FaEdit />
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => dispatch(removeTodo(item.id))}
                      className="btn btn-outline"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="space-y-4">
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                className="grid grid-cols-5 gap-4 items-center border-b p-2"
              >
                <h3 className="text-center font-bold text-xl pr-6">
                  {index + 1}
                </h3>
                <h4 className="text-center font-bold text-xl">{todo.value}</h4>
                <div className="flex items-center justify-center">
                  <div className="flex gap-3 items-center">
                    <button
                      className={`btn btn-outline ${
                        todo.completed ? "btn-success" : "btn-warning"
                      }`}
                    >{`${
                      todo.completed ? "Bajarildi ✅" : "Jarayonda ⌚️"
                    }`}</button>
                    <input
                      className="checkbox checkbox-success"
                      type="checkbox"
                      onChange={() => dispatch(changeStatusTodo(todo.id))}
                      checked={todo.completed}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button className="text-blue-500 btn btn-outline btn-primary">
                    <FaEdit />
                  </button>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="btn btn-outline"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
