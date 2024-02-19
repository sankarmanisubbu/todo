import React, { useState, useEffect, useCallback } from "react";
import './App.css';

interface Item {
  id: number;
  text: string;
  selected: boolean;
}
const Todos: React.FC = () => {
  const [todos, setTodos] = useState
    <{
      input: string;
      items: Item[];
      filteredItems: Item[];
    }>({
      input: "",
      items: [],
      filteredItems: [],
    })
  const { input, items, filteredItems } = todos;
  const itemhanle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem();
  }
  const addItem = useCallback(() => {
    console.log('item added');
    if (input.trim() !== "") {
      let value: Item[] = [];
      value.push({ id: Date.now(), text: input, selected: false });
      setTodos({
        items: [...items, ...value],
        input: " ",
        filteredItems: [...filteredItems, ...value],
      });
    }
  }, [input]);

  const removeItem = useCallback((index: number) => {
    let deleteItem = [...items];
    deleteItem.splice(index, 1);
    setTodos((prevItems: { input: string; items: Item[] }) => ({
      ...prevItems,
      items: deleteItem,
      filteredItems: deleteItem,
    }));
  }, [items]);

  const checkboxStatus = useCallback((id: number) => {
    console.log('checkbox changed');
    let selectedItem: Item[] = items.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setTodos((prevItems: { input: string; items: Item[] }) => ({
      ...prevItems,
      items: selectedItem,
      filteredItems: selectedItem,
    }));
  }, [items]);

  useEffect(() => {
    setTodos((prevItems: { input: string; items: Item[] }) => ({
      ...prevItems,
      filteredItems: items,
    }))
  }, [items]);

  const filterItems = useCallback((isChange: boolean, ifSelected?: boolean) => {
    if (isChange === true) {
      const filtered = items.filter((item) => item.selected === ifSelected);
      setTodos((prevItems: { input: string; items: Item[] }) => ({
        ...prevItems,
        filteredItems: filtered,
      }));
    } else {
      setTodos((prevItems: { input: string; items: Item[] }) => ({
        ...prevItems,
        filteredItems: items,
      }));
    }
  }, [filteredItems]);

  const inputhandle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(
      (prevItems: {
        input: string;
        items: Item[];
        filteredItems: Item[];
      }) => ({
        ...prevItems,
        input: e.target.value,
      })
    );
  }, [input]);

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-10 bg-grey-500">To Do Items List</h1>
      <div className="form_submission">
        <form className="todo_form" onSubmit={(e) => itemhanle(e)}>
          <input className="shadow appearance-none font-bold 
                    border rounded w-75% py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none 
                    focus:shadow-outline" type="text" onChange={(e) => inputhandle(e)} value={input}></input>
                    <button className="bg-blue-500 font-bold text-white px-2 py-2 mt-4 rounded-md" onClick={addItem}>Add</button>
        </form>
      </div>
      <ul>
        {filteredItems.map((todo, index) => (
          <div className="bg-green-300 px-2 py2 w-1/4 mx-auto mt-4">
            <div className="md:inline-flex w-full">
              <div className="md:inline-flex w-8/12 float-left font-bold">
                <input type="checkbox" value='' checked={todo.selected} onChange={() => checkboxStatus(todo.id)}></input>
                <li className="m-5 bg-yellow" key={todo.id}>{todo.text}</li>
              </div>
              <div className="w-4/12 flaot-right">
              <button className="bg-red-500 text-white font-bold m-2 py-2 px-4 rounded-md" onClick={() => removeItem(index)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <button className="bg-green-500 text-white font-bold m-2 py-2 px-4 rounded-md hover:bg-green-700 active:bg-green-700" onClick={() => filterItems(false)}>All</button>
      <button className="bg-red-500 text-white font-bold m-2 py-2 px-4 rounded-md hover:bg-red-700 active:bg-red-700" onClick={() => filterItems(true, true)}>Completed</button>
      <button className="bg-yellow-500 text-white font-bold m-2 py-2 px-4 rounded-md hover:bg-yellow-700 active:bg-yellow-700" onClick={() => filterItems(true, false)}>Pending</button>
    </div>
  )
}
export default Todos;
