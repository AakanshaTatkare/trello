import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";

const Swimlane = ({ title, cards, droppableId }) => {
  return (
    <div className="swimlane">
      <h3>{title}</h3>
      <hr />
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="card-list"
          >
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card card={card} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Swimlane;
