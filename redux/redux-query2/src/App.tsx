import { useEffect, useState } from "react";
import "./App.css";
import { Todo, todoApi } from "./redux/rtk/store";
function TodoApp() {
  const [form, setForm] = useState<Todo>({
    username: "",
    title: "",
    content: "",
  });
  const [createTodo] = todoApi.useCreateTodoMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createTodo(form);
    console.log(response);
    setForm({
      username: "",
      title: "",
      content: "",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.username}
          name="username"
          onChange={handleChange}
        />
        <input
          type="text"
          value={form.title}
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={form.content}
          name="content"
          onChange={handleChange}
        />
        <button>전송</button>
      </form>
    </div>
  );
}

function App() {
  const { data, refetch, isFetching, isLoading } = todoApi.useGetAllQuery();

  useEffect(() => {
    console.log(data, isLoading);
  }, [data]);

  return <TodoApp />;
}

export default App;
