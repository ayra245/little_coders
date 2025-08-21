import React, { useState } from "react";
import "./DragDropWorkspace.css";

const elements = [
  { id: 1, type: "container", label: "Container", code: (val) => `let variable = ${val || "''"};` },
  { id: 2, type: "plus", label: "+", code: (a, b) => `${a} + ${b}` },
  { id: 3, type: "minus", label: "-", code: (a, b) => `${a} - ${b}` },
];

const DragDropWorkspace = () => {
  const [workspaceElements, setWorkspaceElements] = useState([]);
  const [containerValues, setContainerValues] = useState({});

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData("element", JSON.stringify(element));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const element = JSON.parse(e.dataTransfer.getData("element"));
    const newId = Date.now();
    setWorkspaceElements([...workspaceElements, { ...element, uniqueId: newId }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleValueChange = (id, value) => {
    setContainerValues({ ...containerValues, [id]: value });
  };

  const generateCode = () => {
    let containers = workspaceElements.filter((el) => el.type === "container");

    if (containers.length === 0) return "// No containers available. Please add one.";

    let codeLines = [];
    let varNames = [];

    containers.forEach((c, i) => {
      const val = containerValues[c.uniqueId] || "''";
      const varName = `var${i + 1}`;
      varNames.push(varName);
      codeLines.push(`let ${varName} = ${val};`);
    });

    workspaceElements.forEach((el) => {
      if (el.type === "plus" && varNames.length >= 2) {
        codeLines.push(`${varNames[0]} + ${varNames[1]};`);
      }
      if (el.type === "minus" && varNames.length >= 2) {
        codeLines.push(`${varNames[0]} - ${varNames[1]};`);
      }
    });

    return codeLines.join("\n") || "// Nothing to generate yet.";
  };

  return (
    <div className="main-layout">
      <div className="elements-palette">
        <h3>Elements</h3>
        {elements.map((el) => (
          <div
            key={el.id}
            draggable
            onDragStart={(e) => handleDragStart(e, el)}
            className="draggable-element"
          >
            {el.label}
          </div>
        ))}
      </div>

      <div
        className="workspace"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3>Workspace</h3>
        {workspaceElements.map((el) => (
          <div key={el.uniqueId} className="workspace-element">
            {el.type === "container" ? (
              <div>
                <span>{el.label}:</span>
                <input
                  type="text"
                  placeholder="Enter value"
                  value={containerValues[el.uniqueId] || ""}
                  onChange={(e) => handleValueChange(el.uniqueId, e.target.value)}
                />
              </div>
            ) : (
              <span>{el.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="source-code">
        <h3>Generated Code</h3>
        <pre>{generateCode()}</pre>
      </div>
    </div>
  );
};

export default DragDropWorkspace;
