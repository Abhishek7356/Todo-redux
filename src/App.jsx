import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, editTask } from './redux/taskSlice';
import { editDone, taskHistory } from './redux/taskHistorySlice';
import { finishedTask } from './redux/finishedSlice';

function App() {
  const [task, setTask] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [editingTask, setEditingTask] = useState("");
  const [showTask, setShowTask] = useState("1");
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskReducer)
  const allTask = useSelector((state) => state.taskHistoryReducer)
  const finishedTaskes = useSelector((state) => state.finishedTaskReducer)
  console.log(allTask);

  const handleSubmit = () => {
    dispatch(addTask(task))
    dispatch(taskHistory({ task, isDone: false }))
    setTask('')
  }

  const handleUpdate = (task) => {
    setTask(task);
    setIsUpdate(true)
    setEditingTask(task)
  }

  const handleEdit = () => {
    dispatch(editTask({ editingTask, task }))
    setIsUpdate(false);
    setTask("")
  }
  const handleFinishedTask = (item) => {
    dispatch(deleteTask(item));
    dispatch(finishedTask(item));
    dispatch(editDone(item))
  }

  const allTaskList = taskList.map((item, key) => {
    return (
      <div className='flex w-full text-gray-100 justify-between items-center rounded-md px-5 py-3 bg-gray-600'>
        <h2 className='font-bold text-md w-[450px]'>{item}</h2>
        <div className='flex gap-4'>
          <i onClick={() => handleUpdate(item)} class="fa-solid py-1 px-3 hover:bg-slate-200 rounded-sm hover:text-black duration-150 cursor-pointer fa-pen-to-square text-xl"></i>
          <i onClick={() => handleFinishedTask(item)} class="fa-solid py-1 px-3 hover:bg-slate-200 rounded-sm hover:text-black duration-150 cursor-pointer fa-calendar-check text-xl"></i>
        </div>
      </div>
    )
  })
  const showAllTask = allTask.map((item, key) => {
    return (
      <div className='flex w-full text-gray-100 justify-between items-center rounded-md px-5 py-4 bg-gray-600'>
        <h2 className='font-bold text-md w-[450px]'>{item.task}</h2>
        {item.isDone ? <i class="fa-solid text-green-500 mr-2 fa-circle-check"></i> : <span>Pending...</span>}
      </div>
    )
  })
  const allFinishedTask = finishedTaskes.map((item, key) => {
    return (
      <div className='flex w-full text-gray-100 justify-between items-center rounded-md px-5 py-4 bg-gray-600'>
        <h2 className='font-bold text-md w-[450px]'><i class="fa-solid text-green-500 mr-2 fa-circle-check"></i>{item}</h2>
      </div>
    )
  })

  return (
    <div style={{ minHeight: '100vh' }} className=" relative bg-slate-100 flex  gap-3 flex-col items-center pt-32">
      <div className=' w-[600px] flex justify-end gap-1'>
        <button onClick={() => setShowTask('1')} className='py-1 rounded-full px-4 hover:bg-blue-500 hover:text-white flex-1 text-blue-500 duration-150 bg-transparent border-2 border-blue-500  font-bold '>TO DO</button>
        <button onClick={() => setShowTask('2')} className='py-1 rounded-full px-4 hover:bg-blue-500 hover:text-white flex-1 text-blue-500 duration-150 bg-transparent border-2 border-blue-500  font-bold '>TASK HISTORY</button>
        <button onClick={() => setShowTask('3')} className='py-1 rounded-full px-4 hover:bg-blue-500 hover:text-white flex-1 text-blue-500 duration-150 bg-transparent border-2 border-blue-500  font-bold '>FINISHED TASK</button>
      </div>
      {showTask == "1" &&
        <div className='text-gray-800 border bg-white shadow-md  rounded-md p-5 flex flex-col gap-6 w-[600px]'>
          <h1 className=' text-xl font-bold text-center tracking-wide'>Get Things Done</h1>
          <div className='flex border-2 rounded-full border-gray-300'>
            <input onChange={(e) => setTask(e.target.value)} value={task} className='px-5 outline-none py-3 flex-1 bg-transparent' type="text" placeholder='What is the task today?' />
            {task.length > 0 && (isUpdate ? <button onClick={handleEdit} className='bg-gray-600 rounded-full px-5 text-gray-100 text-xs font-bold'>EDIT</button> : <button onClick={handleSubmit} className='bg-gray-600 rounded-full text-gray-100 px-3 text-xs font-bold'>ADD TASK</button>)}
          </div>
          {allTaskList.length > 0 ? allTaskList :
            <h1 className='text-center text-gray-900'>No task to show!</h1>
          }
        </div>
      }
      {showTask == "2" &&
        <div className='text-gray-800  bg-white  shadow-md  rounded-md p-5 flex flex-col gap-6 w-[600px]'>
          <h1 className=' text-xl font-bold text-center tracking-wide'>All Tasks (History)</h1>
          {showAllTask.length > 0 ? showAllTask : <span className='text-center'>There is no task</span>}
        </div>
      }
      {showTask == "3" &&
        <div className='text-gray-800  bg-white  shadow-md rounded-md p-5 flex flex-col gap-6 w-[600px]'>
          <h1 className=' text-xl font-bold text-center tracking-wide'>Finished Task</h1>
          {allFinishedTask.length > 0 ? allFinishedTask : <span className='text-center'>nothing has finished yet</span>}
        </div>
      }

      <h1 className='absolute top-0 left-0  p-5 font-bold text-xl'> <img style={{ width: '50px', marginBottom: "5px" }} src="https://4.bp.blogspot.com/-P5WCyATJj58/VGUDE-SoUBI/AAAAAAAAAPg/lsKWaAP3Ydo/s1600/to-do.jpg" alt="" />Todo App</h1>

    </div>
  );
}

export default App;
