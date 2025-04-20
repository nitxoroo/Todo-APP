
import { useState,useEffect } from 'react' 
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  
  const [todo, setTodo] = useState("")
  const [showfinished, setshowFinished] = useState(true)
  const [todos, setTodos] = useState(() => {
    // ✅ Load from localStorage or return an empty array
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  
  

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));  // ✅ Save even when empty
  }, [todos]);
  
  

  const handleadd = () => {
    if (todo.trim() !== "") {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      setTodo(""); // Clear input field
    }
  };

  const handleEdit = (e, id) => {
    const toEdit = todos.find((item) => item.id === id);
    setTodo(toEdit.todo);
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{return item.id!==id;})
    setTodos(newTodos)
    
  };

const handleChange=(e)=>{
    setTodo(e.target.value)
    
  }
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
  };
  const handleshowfinished=()=>{
    setshowFinished(!showfinished)
  }
  const handleEnter=(e)=>{
    if(e.key=="Enter"){
      if (todo.trim() !== "") {
        const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
        setTodos(newTodos);
        setTodo(""); // Clear input field
      }
      
    }
  }
  



  return (
    <>
      <Navbar/>
      <div className='w-[95vw] mx-3 md:container  md:mx-auto my-5 p-5 bg-gray-600 rounded-xl min-h-[80vh] md:w-[80vw]'>
      <h1 className='font-bold text-xl text-center'>ADD YOUR TASKS</h1>
        <div className="addTodo text-center flex gap-3 m-4">
          
          <input onChange={handleChange} onKeyDown={handleEnter} value={todo} className='bg-white border-none rounded-xl p-[5px] w-[85vw] outline-none ' type='text' placeholder='Add a Task'></input>
          <button onClick={handleadd}  className='bg-gray-800 text-white h-[35px] w-[20vw] rounded-xl  font-bold hover:bg-gray-900 m-auto'>SAVE</button>
        </div>
        <div className='flex gap-3 my-3'>
          <input onClick={handleshowfinished} type="checkbox" checked={showfinished} />
          <div className='font-bold text-white'>Show Finished Tasks</div>
        </div>
        <h1 className='font-bold text-xl text-center'>TODO LIST</h1>
        
        {todos.map(item=>{

        
        return(showfinished || !item.isCompleted) && <div key={item.id} className="todos md:w-full flex justify-center">
          <div className="todo flex m-4 w-[80vw] md:w-[40vw] justify-between ">
            <div className='flex gap-[10px] justify-center items-center'>
            <input className='w-[15px] h-[15px]' name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted}  id='' />
            <div className={`${item.isCompleted ? "line-through" : ""} text-slate-900 text-lg font-medium`}>{item.todo}</div>
            </div>
            
            <div>
            <button onClick={(e)=>{handleEdit(e,item.id)}} className=' text-white  rounded-md mx-[5px] items-center hover:text-black'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className=' text-white  rounded-md mx-[5px] text-center hover:text-black'><MdDelete /></button>
            </div>
            
          </div>
        </div>
      })}

      </div>
    </>
  )
}

export default App
