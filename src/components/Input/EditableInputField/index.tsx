"use client";
import React, { useState } from "react";

const EditableInputField = ({ initialText }) => {
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Save the changes or perform any required actions here
  };

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          className="dark:bg-zinc-800"
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default EditableInputField;
