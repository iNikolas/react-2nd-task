import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ideaImg from "./pictures/idea.png";
import thoughtImg from "./pictures/thought.png";
import taskImg from "./pictures/task.png";
import TableRow from "./TableRow/TableRow";

function useMainTemplate() {
  const tableDataset = useSelector((state) => state.table);
  const view = useSelector((state) => state.table.view);
  const [path, setPath] = useState("tableValues");

  useEffect(() => {
    if (view === "main") setPath("tableValues");
    if (view === "archive") setPath("archivedValues");
  }, [view]);
  return tableDataset[path].map((tableRow, index) => {
    let imgSrc;
    if (tableRow.category === "Idea") imgSrc = ideaImg;
    if (tableRow.category === "Random Thought") imgSrc = thoughtImg;
    if (tableRow.category === "Task") imgSrc = taskImg;

    return (
      <TableRow
        key={`${tableRow.name}_${index}`}
        img={imgSrc}
        tableRow={tableRow}
        index={index}
      />
    );
  });
}

export default useMainTemplate;
