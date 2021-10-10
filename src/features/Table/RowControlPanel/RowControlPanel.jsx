import React from "react";
import editIcon from "./../pictures/editIcon.png";
import archiveIcon from "./../pictures/archiveIcon.png";
import deleteIcon from "./../pictures/deleteIcon.png";
import css from "./../Table.module.css";
import { batch, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { archiveRow, deleteRow, updateStatistic } from "../tableSlice";

function RowControlPanel({ index, setIsDisabled }) {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.table.view);

  function handleDeleteRow() {
    batch(() => {
      dispatch(deleteRow(index));
      dispatch(updateStatistic());
    });
  }

  function handleArchiveRow() {
    batch(() => {
      dispatch(archiveRow(index));
      dispatch(updateStatistic());
    });
  }

  function toggleEditMode() {
    setIsDisabled((prevState) => !prevState);
  }

  return (
    <>
      {view === "main" && (
        <img
          onClick={toggleEditMode}
          className={css["action-btn"]}
          src={editIcon}
        />
      )}
      <img
        onClick={handleArchiveRow}
        className={css["action-btn"]}
        src={archiveIcon}
      />
      <img
        onClick={handleDeleteRow}
        className={css["action-btn"]}
        src={deleteIcon}
      />
    </>
  );
}

export default RowControlPanel;

RowControlPanel.propTypes = {
  index: PropTypes.number,
  setIsDisabled: PropTypes.func,
};
