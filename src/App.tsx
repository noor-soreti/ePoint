// import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from '@aws-amplify/ui-react';
// import { SideBar } from "./components/SideBar/SideBar";
// import { Outlet } from "react-router";
import Dashboard from "./dashboard/Dashboard";
import { useEffect } from "react";

const client = generateClient<Schema>();

function App() {

  useEffect(() => {
    const { data } =  await client.queries.myFirstFunction({
      name: "Amplifyyyyy"
    })
    
    console.log(data);
  },[])
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  // const { signOut } = useAuthenticator();

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id })
  // }

  return (
    <main>
      <Dashboard/>
    </main>
  );
}

export default App;
