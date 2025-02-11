import React from "react";
import { Button, Flex, Input, Tooltip, Select, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { HttpClient } from "../helpers";

function Task({ task, updated, noTasks }) {
  const [edit, setEdit] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(task.title);
  const [titleStatus, setTitleStatus] = React.useState("normal");
  const [newDesc, setNewDesc] = React.useState(task.description);
  const [descStatus, setDescStatus] = React.useState("normal");
  const [status, setStatus] = React.useState(task.status);

  const onEditClick = () => {
    console.log("task", task);
    setEdit(true);
  };
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setNewDesc(e.target.value);
  };

  const handleChange = (value) => {
    console.log("changed", value);
    setStatus(value);
  };
  const submitChanges = () => {
    if (newTitle === "" || newDesc === "") {
      if (newTitle === "") {
        setTitleStatus("error");
      }
      if (newDesc === "") {
        setDescStatus("error");
      }
      return;
    }

    HttpClient.put(`/api/tasks/${task._id}`, {
      title: newTitle,
      description: newDesc,
      status: status,
    }).then((res) => {
      updated();
      setEdit(false);
    });
  };

  const handleDelete = () => {
    HttpClient.delete(`/api/tasks/${task._id}`).then((res) => {
      updated();
    });
  };

  return (
    <div className="flex flex-row  items-center bg-white m-4 rounded p-2 w-full ">
      <div className="w-full">
        {edit ? (
          <div className="flex flex-col h-25 ">
            <Input
              status={titleStatus}
              size="small"
              placeholder="input name"
              onChange={handleTitleChange}
              value={newTitle}
            />
            <div className="my-2">
              <Input
                status={descStatus}
                size="small"
                placeholder="input name"
                onChange={handleDescChange}
                value={newDesc}
              />
            </div>
            <Select
              defaultValue="todo"
              onChange={handleChange}
              size="small"
              value={status}
              options={[
                { value: "todo", label: "To do" },
                { value: "started", label: "Started" },
                { value: "completed", label: "Completed" },
              ]}
            />
          </div>
        ) : (
          <>
            <h1 className="font-bold">{task.title}</h1>
            <p>{task.description}</p>
          </>
        )}
      </div>
      <div
        className="flex flex-row-reverse items-center justify-end
"
      >
        {noTasks ? (
          <></>
        ) : (
          <>
            {!edit && (
              <Tooltip title="delete task">
                <Button
                  type="primary"
                  shape="circle"
                  className="m-1"
                  icon={<DeleteOutlined />}
                  onClick={handleDelete}
                />
              </Tooltip>
            )}
            {edit ? (
              <Tooltip title="submit changes">
                <Button
                  type="primary"
                  shape="circle"
                  className="m-1"
                  icon={<CheckOutlined />}
                  onClick={() => submitChanges()}
                />
              </Tooltip>
            ) : (
              <Tooltip title="edit task">
                <Button
                  type="primary"
                  shape="circle"
                  className="m-1"
                  icon={<EditOutlined />}
                  onClick={() => onEditClick()}
                />
              </Tooltip>
            )}
            {!edit && (
              <div>
                <Tag
                  color={
                    status === "started"
                      ? "orange"
                      : status === "todo"
                      ? "gray"
                      : "green"
                  }
                >
                  {status}
                </Tag>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
