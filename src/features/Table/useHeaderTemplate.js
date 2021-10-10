import React from "react";
import { useSelector } from "react-redux";
import TableMainNavigation from "./TableMainNavigation/TableMainNavigation";

function useHeaderTemplate(tableType) {
  const isMainTable = tableType === "table" ? true : false;
  const path = tableType === "table" ? "tableHeader" : "statisticHeader";
  const tableHeaders = useSelector((state) => state.table[path]);
  return (
    <>
      {tableHeaders.map((th) => (
        <th key={th}>{th}</th>
      ))}
      {isMainTable && (
        <th>
          <TableMainNavigation />
        </th>
      )}
    </>
  );
}

export default useHeaderTemplate;
