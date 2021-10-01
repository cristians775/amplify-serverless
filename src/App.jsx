import logo from "./logo.svg";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { listTodos } from "./graphql/queries";
import { useState, useCallback, useEffect } from "react";
Amplify.configure(awsconfig);
const  App =()=> {
  const [todos, setTodos] = useState([]);

  const fetchTodo = useCallback(async () => {
    const todoListData = await API.graphql(graphqlOperation(listTodos));
    const todoList = todoListData.data.listTodos.items;
    console.log("Todo list", todoList);
    setTodos(todoList);
  }, []);

  useEffect(() => fetchTodo(), [fetchTodo]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
