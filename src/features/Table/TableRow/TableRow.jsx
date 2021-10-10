import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "../Table.module.css";
import { CATEGORIES } from "../../../common/constants";
import RowControlPanel from "../RowControlPanel/RowControlPanel";
import PropTypes from "prop-types";
import { batch, useDispatch } from "react-redux";
import { updateRow, updateStatistic } from "../tableSlice";

function TableRow({ img, tableRow, index }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState(tableRow.name);
  const [category, setCategory] = useState(tableRow.category);
  const [content, setContent] = useState(tableRow.content);
  const dispatch = useDispatch();

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }
  function handleContentChange(e) {
    setContent(e.target.value);
  }

  const rowContent = useMemo(
    () => ({
      name,
      category,
      content,
      index,
    }),
    [name, category, content]
  );

  const prevRowContent = useRef(rowContent);

  useEffect(() => {
    if (prevRowContent.current !== rowContent) {
      batch(() => {
        dispatch(updateRow(rowContent));
        dispatch(updateStatistic());
      });
      prevRowContent.current = rowContent;
    }
  }, [isDisabled]);

  function handleKeyPress(e) {
    if (e.key === "Enter") setIsDisabled(true);
  }

  return (
    <tr onKeyPress={handleKeyPress}>
      <td>
        <input
          onChange={handleNameChange}
          disabled={isDisabled}
          name={`name`}
          type="text"
          value={name}
        />
        <img src={img} className={css["categories-icons"]} />
      </td>
      <td>
        <input
          disabled={true}
          name={`created`}
          type="text"
          value={tableRow.created}
        />
      </td>
      <td>
        <select
          onChange={handleCategoryChange}
          defaultValue={category}
          disabled={isDisabled}
          name={`created`}
          type="text"
        >
          {CATEGORIES.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          onChange={handleContentChange}
          disabled={isDisabled}
          name={`content`}
          type="text"
          value={content}
        />
      </td>
      <td>
        <input
          disabled={true}
          name={`dates`}
          type="text"
          value={tableRow.dates}
        />
      </td>
      <td>
        <RowControlPanel index={index} setIsDisabled={setIsDisabled} />
      </td>
    </tr>
  );
}

export default TableRow;

TableRow.propTypes = {
  img: PropTypes.string,
  tableRow: PropTypes.object,
  index: PropTypes.number,
};
