import React from "react";
import PropTypes from "prop-types";
import css from "./Table.module.css";
import useMainTemplate from "./useMainTemplate";
import useHeaderTemplate from "./useHeaderTemplate";
import useStatisticTemplate from "./TableRow/useStatisticTemplate";

function Table({ tableType }) {
  const header = useHeaderTemplate(tableType);
  const tableData =
    tableType === "table" ? useMainTemplate() : useStatisticTemplate();

  return (
    <div id={css["main-table"]}>
      <table className="highlight">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody id={css["table-body-main"]}>{tableData}</tbody>
      </table>
    </div>
  );
}

export default Table;

Table.propTypes = {
  tableType: PropTypes.string,
};
