import { useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useState } from "react";
import { Modal } from "./Modal";
import { NewTask } from "./NewTask"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Swal from 'sweetalert2';

export const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    setIsVisible(value !== undefined ? value : !isVisible);
    setIsModalOpen(false);
  }

  const widgetCard = 'p-4 shadow-md bg-white w-full rounded-md';

  const data = [
    { name: "Completed Tasks", value: 25 },
    { name: "Remaining Tasks", value: 75 },
  ];

  const pieColor = ["#4F86F7", "#E8EBED"]; // blue and light gray

//   const taskList = () => {
//     const [tasks, setTasks] = useState([
//         { id: 1, text: "Clean the room", completed: false },
//         { id: 2, text: "Buy some vegetables, chicken & chips", completed: false },
//         { id: 3, text: "Reinstall window on PC", completed: false },
//         { id: 4, text: "Start to work on new feature", completed: false },
//     ])
//   }

    // const taskList = [
    //     { id: 1, text: "Clean the room", completed: false },
    //     { id: 2, text: "Buy some vegetables, chicken & chips", completed: false },
    //     { id: 3, text: "Reinstall window on PC", completed: false },
    //     { id: 4, text: "Start to work on new feature", completed: false },
    // ]

    // const [tasks, setTasks] = useState(false);

    const [tasks, setTasks] = useState([
        { id: 1, text: "Clean the room", completed: false },
        { id: 2, text: "Buy some vegetables, chicken & chips", completed: false },
        { id: 3, text: "Reinstall window on PC", completed: false },
        { id: 4, text: "Start to work on new feature", completed: false },
    ]);

    //These will automatically update whenever tasks changes
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    const toggleComplete = (id) => {
        setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const addTask = (taskText) => {
    if (!taskText || taskText.trim() === "") return;

    const newTask = {
        id: Date.now(), // unique id
        text: taskText,
        completed: false,
    };

    setTasks([...tasks, newTask]);
    setIsModalOpen(false); // close modal after adding
    setIsVisible(true);    // show the dashboard view
    };

    const deleteTask = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
            setTasks(tasks.filter(task => task.id !== id));
            Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            }
        });
        
    };

    const editTask = async (id) => {
        const { value: newText } = await Swal.fire({
            title: "Edit your task",
            input: "text",
            inputLabel: "Update the task name",
            inputPlaceholder: "Enter new task name",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
            if (!value.trim()) {
                return "Task name cannot be empty!";
            }
            },
        });

        if (newText && newText.trim() !== "") {
            setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            )
            );

            Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Your task has been edited successfully.",
            timer: 1500,
            showConfirmButton: false,
            });
        }
    };

    const [searchTerm, setSearchTerm] = useState("");

    // ✅ Derived filtered tasks
    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section id="dashboard">
        <div className="container mx-auto">
            <div className="fixed top-0 left-0 w-full h-[42px] flex items-center p-8 bg-white">
                <div
                    className="w-[40px] h-[40px] overflow-hidden bg-[url(./src/assets/img/daniel-yie.jpg)] bg-center bg-cover rounded-full bg-origin-padding"
                >
                </div>
                <div
                    className="ml-4 font-semibold"
                >
                    {userName}
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="absolute right-8 p-4 bg-[#333] text-white h-[36px] flex items-center font-medium hover:cursor-pointer hover:bg-[#444] rounded-md text-sm"
                >
                    Logout
                </button>
            </div>
            
            {!isVisible ? 
                <div className="flex items-center justify-center w-full min-h-[100vh]">
                <div className="w-full bg-white shadow-lg rounded-lg max-w-[280px] min-h-[158px] flex items-center justify-center flex-col">
                    <p className="text-lg">You have no task.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 p-4 bg-[#5285EC] text-white h-[36px] flex items-center text-sm hover:cursor-pointer rounded-md"
                    >
                        <Plus className="mr-1 w-4"/> Add New Task
                    </button>
                </div>
            </div>
            :
            <div className="p-4 pt-[64px]">
                <div
                    className="flex mt-4 flex-col md:flex-row gap-4"
                >
                    <div
                        className={`${widgetCard} flex justify-center flex-col`} /* By doing this we can combine variable class + custom css*/
                    >
                        <div className="text-xl text-[#537178] font-medium tracking-wide">Task Completed</div>
                        <div>
                            <span className="relative top-[-6px] text-[54px] font-medium text-[#5285EC]">{completedTasks}</span>
                            / {totalTasks}
                        </div>
                    </div>
                    <div
                        className={widgetCard}
                    >
                        <div className="text-xl text-[#537178] font-medium tracking-wide mb-4">Latest Created Task</div>
                        <ul className="list-disc list-inside space-y-1 text-[#8F9EA2] md:text-[14px]">
                            {tasks
                            // .filter((_, index) => index !== 3) // hides the 4th item since index starts at 0
                            .map((task) => (
                            <li
                                key={task.id}
                                className={`${task.completed ? "line-through text-gray-500" : ""}`}
                            >
                                {task.text}
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className={widgetCard}
                    >
                        <div className="relative flex justify-center items-center h-full">
                            <div className="relative">
                                <PieChart width={100} height={100}>
                                    <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={50}
                                    fill="#8884d8"
                                    dataKey="value"
                                    >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColor[index % pieColor.length]} />
                                    ))}
                                    </Pie>
                                    {/* If we want to use legend, must change width to 300 */}
                                    {/* <Legend
                                        verticalAlign="middle"
                                        align="right"
                                        layout="vertical"
                                        iconType="circle"
                                    /> */}
                                </PieChart>
                                {/* If we want to use arrow label */}
                                <div className="absolute top-[10px] right-[-82px] text-[#8884d8] text-xs tracking-wide">
                                    Completed<br/>Task
                                    <div className="absolute bottom-[8px] left-[-26px] w-[25px] h-[1px] bg-[#8884d8] rotate-135"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-col md:flex-row md:mt-6">
                    <div className="text-xl text-[#537178] font-medium tracking-wide mt-4 text-center">Tasks</div>
                    <div className="relative bg-[#D9DFEB] w-full h-[40px] flex items-center rounded-md md:w-[250px] md:absolute md:right-[120px] md:top-[10px]">
                        <div className="absolute left-0 top-0 w-[40px] h-[40px] flex items-center justify-center">                            
                            <Search className="w-4" />
                        </div>
                        <input 
                            type="text"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="absolute left-0 pl-[40px] focus:outline-none w-full pr-4 text-center text-sm tracking-wide md:text-left"
                            placeholder="Search by task name"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-3 p-4 bg-[#5285EC] text-white h-[36px] flex items-center text-sm hover:cursor-pointer rounded-md justify-center md:absolute md:right-[0px]"
                    >
                        <Plus className="mr-1 w-4"/> New Task
                    </button>
                </div>
                <div>
                    <div className="bg-white p-4 shadow-md rounded-md mt-4">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-3 w-full gap-4 border-b border-blue-100 last:border-b-0"
                        >
                            <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleComplete(task.id)}
                                className="appearance-none w-4 h-4 border border-gray-400 cursor-pointer bg-white border border-black rounded checked:bg-blue-500 checked:border-blue-500 checked:before:content-['✓'] checked:before:text-xs checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center"
                            />
                            <span
                                className={`${
                                task.completed ? "line-through text-gray-500" : ""
                                } text-[#5285EC]`}
                            >
                                {task.text}
                            </span>
                            </div>

                            <div className="flex gap-2">
                            <button
                                onClick={() => editTask(task.id)}
                                className="text-[#647278] cursor-pointer hover:text-black"
                            >
                                <Pencil className="w-4" />
                            </button>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-[#647278] cursor-pointer hover:text-black"
                            >
                                <Trash2 className="w-4" />
                            </button>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No tasks found.</p>
                    )}
                    </div>
                </div>
            </div>
            }
        </div>

        {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={handleClose}>
                <NewTask toggleVisibility={toggleVisibility} addTask={addTask} />
            </Modal>
        )}
    </section>
  );
}
