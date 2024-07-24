import React from "react";

export const Total = ({ parts }) => {
  const totalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );
  return <p>Total number of exercises = {totalExercises}</p>;
};
