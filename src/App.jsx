import React, { useState } from "react";
import Card from "./components/card/Card";
import Input from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";
import TextArea from "./components/input/TextArea";
import Button from "./components/button/Button";
import Modal from "./components/modal/Modal";
import "./App.css";

const TODOS_MOCK = [
  {
    id: "1",
    title: "Todo 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo repellendus non maiores in pariatur aliquam iure fugit amet!",
    completed: false,
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, ipsa!",
    completed: false,
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, ea.",
    completed: true,
  },
  {
    id: "4",
    title: "Todo 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, voluptatibus?",
    completed: true,
  },
];

function App() {
  const [todos, setTodos] = useState(TODOS_MOCK);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (currentTodo) {
      setTodos(todos.map(todo =>
        todo.id === currentTodo.id ? { ...todo, title, description } : todo
      ));
    } else {
      const newTodo = {
        id: (todos.length + 1).toString(),
        title,
        description,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
    setCurrentTodo(null);
  };

  const handleTodoStatusChange = (id, completed) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <div className="app-container">
        <Modal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false);
          setCurrentTodo(null);
          setTitle("");
          setDescription("");
        }}>
          <Card>
            <h2>{currentTodo ? "Edit Todo" : "Create Todo"}</h2>
            <form onSubmit={handleCreateTodo}>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" type="text" />
              <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
              <Button type="submit">{currentTodo ? "Edit" : "Create"}</Button>
            </form>
          </Card>
        </Modal>

        <Card>
          <h1>My todos</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add +</Button>
          <div className="list-container">
            {todos.filter(todo => !todo.completed).map(todo => (
              <TodoItem key={todo.id} {...todo}
                onStatusChange={handleTodoStatusChange} 
                onDelete={handleDeleteTodo}
                onEdit={() => handleEditTodo(todo)}
              />
            ))}
          </div>

          <div className="separator"></div>

          <h2>Completed</h2>
          <div className="list-container">
            {todos.filter(todo => todo.completed).map(todo => (
              <TodoItem key={todo.id} {...todo}
                onStatusChange={handleTodoStatusChange} 
                onDelete={handleDeleteTodo}
                onEdit={() => handleEditTodo(todo)}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
