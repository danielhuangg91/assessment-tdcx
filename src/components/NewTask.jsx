import { useState } from "react";
import { Plus } from 'lucide-react';

export const NewTask = ({ toggleVisibility, addTask }) => {

const [taskName, setTaskName] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    addTask(taskName);       
    toggleVisibility();      
    setTaskName("");         
};

    return(
        <div>
            <h4 className="text-l font-medium mb-4 flex items-center">
                <Plus className="mr-2 w-4"/> 
                New Task
            </h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Task Name"
                    className="h-[40px] px-2 rounded bg-[#EEF1F8] text-sm  focus:outline-none"
                />
                <button
                    type="submit"
                    className="p-4 bg-[#5285EC] text-white h-[40px] flex items-center justify-center hover:cursor-pointer rounded-md text-white py-2 px-4 rounded text-center text-sm"
                >
                <Plus className="mr-1 w-4"/> New Task
                </button>
            </form>
        </div>
    )
}