import React from "react";

const Part = (props) => {
  return (
    <>
      <p>
        {props.part}
        {props.exercises}
      </p>
    </>
  );
};

export const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <div key={part.id}>
            <Part part={part.name} exercises={part.exercises}></Part>
          </div>
        );
      })}
    </>
  );
};
