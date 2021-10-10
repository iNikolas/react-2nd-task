import React, { useEffect } from "react";
import Table from "./features/Table/Table";
import CreateNoteButton from "./features/CreateNoteButton/CreateNoteButton";
import { useDispatch } from "react-redux";
import { updateStatistic } from "./features/Table/tableSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateStatistic());
  }, []);
  return (
    <>
      <Table tableType="table" />
      <CreateNoteButton />
      <Table tableType="statistic" />
    </>
  );
}

export default App;
