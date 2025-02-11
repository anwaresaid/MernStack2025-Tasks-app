import React, { useEffect } from "react";
import { Button, Input, Space, Tooltip } from "antd";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";
import Task from "../components/Task";
import AddTaskModal from "../components/AddTaskModal";
import { HttpClient } from "../helpers";
function Landing() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    getTasks();
    // fetch tasks
  }, []);

  const getTasks = () => {
    HttpClient.get("/api/tasks").then((res) => {
      setTasks(res.data);
    });
    // fetch tasks
  };
  const handleAddTask = () => {
    setIsModalOpen(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("__AUTH_KEY__");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center  m-10 h-screen ">
      <AddTaskModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        updated={getTasks}
      />
      <div className="flex flex-col items-center  m-10 md:w-1/2 w-full h-full m-4">
        <div className="flex flex-row w-full  my-2">
          <h1 className="p-2  font-bold text-3xl w-full text-center">
            Current Tasks
          </h1>
          <div className="flex flex-row  ml-auto my-2">
            <Tooltip title="Add Task">
              <Button
                type="primary"
                shape="circle"
                className="mx-2"
                icon={<PlusOutlined />}
                onClick={() => handleAddTask()}
              />
            </Tooltip>
            <Tooltip title="Logout">
              <Button
                type="primary"
                shape="circle"
                className="mx-2"
                icon={<LogoutOutlined />}
                onClick={() => handleLogout()}
              />
            </Tooltip>
          </div>
        </div>

        <div className=" bg-gray-600 flex flex-col items-center border w-full h-5/6 rounded-lg px-4 overflow-auto">
          {tasks.length === 0 && (
            <Task
              task={{
                title: "No tasks",
                description: "No tasks available",
              }}
              noTasks={true}
            />
          )}
          {tasks.map((task) => (
            <Task
              key={task.title + task.description}
              task={task}
              updated={getTasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
