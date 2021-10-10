import React from "react";
import ideaImg from "./../pictures/idea.png";
import thoughtImg from "./../pictures/thought.png";
import taskImg from "./../pictures/task.png";
import { useSelector } from "react-redux";
import css from "../Table.module.css";

function useStatisticTemplate() {
  const statistics = useSelector((state) => state.table.statistic);
  const renderStatistic = [];
  for (const statistic in statistics) {
    let imgSrc;
    if (statistic === "Idea") imgSrc = ideaImg;
    if (statistic === "Random Thought") imgSrc = thoughtImg;
    if (statistic === "Task") imgSrc = taskImg;

    renderStatistic.push(
      <tr key={statistic}>
        <td>
          <input disabled name={statistic} type="text" value={statistic} />
          <img src={imgSrc} className={css["categories-icons"]} />
        </td>
        <td>
          <input
            disabled
            name={statistics[statistic].mainCounter}
            type="text"
            value={statistics[statistic].mainCounter}
          />
        </td>
        <td>
          <input
            disabled
            name={statistics[statistic].archiveCounter}
            type="text"
            value={statistics[statistic].archiveCounter}
          />
        </td>
      </tr>
    );
  }
  return renderStatistic;
}

export default useStatisticTemplate;
