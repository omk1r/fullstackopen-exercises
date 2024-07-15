import React from "react";

export const Total = (props) => {
  return (
    <p>
      Total number of exercises ={" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};
