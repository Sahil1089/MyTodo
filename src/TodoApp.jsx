import React, { ChangeEvent, useState } from 'react'
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa'



const todokeys = "reacttodo";
const heading="My schedule "

function TodoApp() {

    const [task,settask] = useState("")
     const [deadline ,setdeadline]=useState();
     const [isEditable,setisEditable]=useState();
     const [isToggle,setisToggle]=useState(true);
     const [todo,setTodo]=useState(()=>{
        const rawtodo=localStorage.getItem(todokeys);
        if(!rawtodo) return [];
        return JSON.parse(rawtodo)
     });







     function editTodo(key){
        let newEditeditem = todo.find((elem)=>{
           return elem.key===key
     });
        console.log(newEditeditem)
        setisToggle(false)
        settask(newEditeditem.tasktodo);
        setdeadline(newEditeditem.deadline);
        setisEditable(key)
       



     }



//      function handleChange(e:ChangeEvent<HTMLInputElement>){
//    e.preventDefault();
//    settask(e.target.value)
//    setdeadline(Number(e.target.value))

//      }

     const AddTask =()=>{
        if(!task && !deadline){
            alert("plz fill your task")
      }
        else if(
            task && deadline && !isToggle
        ){
            setTodo(
                todo.map((elem)=>{
                    if (elem.key===isEditable){
                        return{...elem,tasktodo:task,deadline:deadline}
                    }
                })
            )
            settask("");
            setdeadline("");
            setisToggle(true);
        }
        // else{
        //     if(!task&& !deadline){alert (" both fields are mandatory")}
        //     task?alert("deadline field is mandatory"):alert("task is mandatory")
        //     ()
        // }
        else{
            const allinput ={key:new Date().getTime().toString(),tasktodo:task,deadline:deadline}
            setTodo([...todo,allinput])
            settask("")
            setdeadline("")
            console.log(todo)}

     }
         //  setting data to local storage
    localStorage.setItem("reacttodo",JSON.stringify(todo));

     function deleteItem(index){
        let updatedtask = todo.filter((elem)=>{
            return index !== elem.key;

        });
        setTodo(updatedtask)
       


     }




  return (
    


<div className='admincontainer '>
        <main className='coupon-container'>
          
            <div className="todocontainer">
                <div className="head">
              <h2>{heading}</h2>
                <div className="todonav">
                    <input type="text" 
                    placeholder='your task'
                    value={task}
                    onChange={(e)=>{
                        settask(e.target.value)
                    }
                    }
                    />
                    <input type="date" 
                    
                    value={deadline}
                    onChange={(e)=>{
                        setdeadline((e.target.value))
                    }
                    } />
                    {/* after toggle icons edit*/}
                    {
                        isToggle?<FaPlusCircle className='add' onClick={AddTask}/>:
                        <FaEdit className='green' onClick={AddTask}/>



                    }
                    {/*  */}
                </div>
                </div>
                <div className="todolistitem">
            {todo.length>0?
                todo.map((task)=>{
                    return <div className='todoitem' key={task.key}>
                            <div className='task'>{task.tasktodo}</div>
                            <h2 > {task.deadline}</h2>
                            <FaEdit className='green' onClick={()=>editTodo(task.key)}/>
                            <button onClick={()=>deleteItem(task.key)}><FaTrash className='red' /></button>
                           </div>
                    
}):<span className='inittodo'><h1>no task is scheduled</h1></span>
            }
           </div>
            </div>
   
            </main>
        </div>










 
  )
}

export default TodoApp;