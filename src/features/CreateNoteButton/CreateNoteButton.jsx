import React from "react";
import css from "./CreateNoteButton.module.css";
import { createNewEntry, updateStatistic } from "../Table/tableSlice";
import { useDispatch } from "react-redux";
import { batch } from "react-redux";

function CreateNoteButton() {
  const dispatch = useDispatch();

  function handleCreateNote() {
    batch(() => {
      dispatch(createNewEntry(new Date().toDateString()));
      dispatch(updateStatistic());
    });
  }

  return (
    <a
      onClick={handleCreateNote}
      id={css["createEntryBtn"]}
      className="waves-effect waves-light btn-small"
    >
      Create Note
    </a>
  );
}

export default CreateNoteButton;
