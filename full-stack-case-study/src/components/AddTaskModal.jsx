import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Space, Typography } from "antd";
import { HttpClient } from "../helpers";

function AddTaskModal({ isOpen, setIsOpen, updated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [titleStatus, setTitleStatus] = useState("normal");
  const [descStatus, setDescStatus] = useState("normal");

  useEffect(() => {
    console.log("is open", isOpen);
    setIsModalOpen(isOpen);
  }, [isOpen]);
  const handleOk = () => {
    if (task.title === "" || task.description === "") {
      if (task.title === "") {
        setTitleStatus("error");
      }
      if (task.description === "") {
        setDescStatus("error");
      }
      return;
    }
    HttpClient.post("/api/tasks", task).then((res) => {
      console.log(res.data);
      updated();
      setIsModalOpen(false);
      setIsOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsOpen(false);
  };
  const handleTitleChange = (e) => {
    setTask({ ...task, title: e.target.value });
  };
  const handleDescChange = (e) => {
    setTask({ ...task, description: e.target.value });
  };
  return (
    <Modal
      title="Add Task"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Typography.Title level={5}>Task Title</Typography.Title>
      <Input
        status={titleStatus}
        size="large"
        placeholder="input name"
        onChange={handleTitleChange}
        value={task.title}
      />
      <Typography.Title level={5} className="mt-4">
        Task Description
      </Typography.Title>
      <Input
        status={descStatus}
        size="large"
        placeholder="input name"
        onChange={handleDescChange}
        value={task.description}
      />
    </Modal>
  );
}

export default AddTaskModal;
