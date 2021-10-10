import React, { useEffect, useState } from "react";
import css from "./../Table.module.css";
import deleteIcon from "./../pictures/deleteIcon.png";
import mainTableIcon from "./../pictures/mainTableIcon.png";
import archiveIcon from "./../pictures/archiveIcon.png";
import { batch, useDispatch, useSelector } from "react-redux";
import { changeView, deleteEntries, updateStatistic } from "../tableSlice";

function TableMainNavigation() {
  const view = useSelector((state) => state.table.view);
  const dispatch = useDispatch();
  const [navigationIcon, setNavigationIcon] = useState();

  useEffect(() => {
    if (view === "main") {
      setNavigationIcon(archiveIcon);
    } else {
      setNavigationIcon(mainTableIcon);
    }
  }, [view]);

  function handleViewChange() {
    dispatch(changeView());
  }

  function handleDeleteTableEntries() {
    batch(() => {
      dispatch(deleteEntries());
      dispatch(updateStatistic());
    });
  }

  return (
    <>
      <img
        onClick={handleViewChange}
        className={css["action-btn"]}
        src={navigationIcon}
      />
      <img
        onClick={handleDeleteTableEntries}
        className={css["action-btn"]}
        src={deleteIcon}
      />
    </>
  );
}

export default TableMainNavigation;
