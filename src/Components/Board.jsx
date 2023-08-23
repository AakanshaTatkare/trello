import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Swimlane from "./Swimlane";
import "./Board.css"; // Import custom styles for the board

const initialData = {
  todo: [],
  inProgress: [],
  completed: [],
};

const Board = () => {
  const [data, setData] = useState(initialData);
  const [newTask, setNewTask] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceSwimlane = result.source.droppableId;
    const destinationSwimlane = result.destination.droppableId;

    const movedCard = data[sourceSwimlane][result.source.index];

    const sourceCards = [...data[sourceSwimlane]];
    const destinationCards = [...data[destinationSwimlane]];

    sourceCards.splice(result.source.index, 1);
    destinationCards.splice(result.destination.index, 0, movedCard);

    setData({
      ...data,
      [sourceSwimlane]: sourceCards,
      [destinationSwimlane]: destinationCards,
    });
  };

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() === "") return;

    const newCard = { id: `card-${Date.now()}`, title: newTask };
    setData({
      ...data,
      todo: [...data.todo, newCard],
    });
    setNewTask("");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        <div className="task-input">
          <form onSubmit={handleNewTaskSubmit}>
            <input
              type="text"
              placeholder="Enter new task"
              value={newTask}
              onChange={handleNewTaskChange}
            />
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="swimlanes">
          <Swimlane title="To Do" cards={data.todo} droppableId="todo" />
          <Swimlane
            title="In Progress"
            cards={data.inProgress}
            droppableId="inProgress"
          />
          <Swimlane
            title="Completed"
            cards={data.completed}
            droppableId="completed"
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
