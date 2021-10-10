import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES } from "../../common/constants";

const initialState = {
  tableHeader: ["Name", "Created", "Category", "Content", "Dates"],
  statisticHeader: ["Name Category", "Active", "Archived"],
  tableValues: [
    {
      name: "Learn Java Script.",
      created: "Apr 20, 2020",
      category: "Idea",
      content:
        "If I learn JavaScript I will discover more opportunities in my life.",
      dates: "",
    },
    {
      name: "Shroud thoughts",
      created: "May 08, 2021",
      category: "Random Thought",
      content: "Banana is big but the peel is much bigger",
      dates: "",
    },
    {
      name: "My elaborate plan of learning JavaScript",
      created: "Jan 15, 2021",
      category: "Task",
      content:
        "If I finally start learning JS today 15.01.2021, until my next birthday on 25.03.1989 I will be a great programmer",
      dates: "15.01.2021, 25.03.1989.",
    },
    {
      name: "Shopping List",
      created: "Oct 20, 2021",
      category: "Task",
      content: "Cream, apples, potato, beer.",
      dates: "",
    },
    {
      name: "New feature",
      created: "May 05, 2021",
      category: "Idea",
      content: "Make modal popups",
      dates: "",
    },
    {
      name: "Old feature",
      created: "Feb 25, 2021",
      category: "Random Thought",
      content: "Old feature better new twos.",
      dates: "",
    },
    {
      name: "I know a little about this life",
      created: "Oct 31, 2021",
      category: "Random Thought",
      content:
        "If life were predictable it would cease to be life, and be without flavor. ",
      dates: "",
    },
  ],
  archivedValues: [],
  statistic: {},
  view: "main",
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    changeView: (state) => {
      if (state.view === "main") {
        state.view = "archive";
      } else {
        state.view = "main";
      }
    },
    deleteEntries: (state) => {
      if (state.view === "main") {
        state.tableValues = [];
      } else if (state.view === "archive") {
        state.archivedValues = [];
      }
    },
    createNewEntry: (state, action) => {
      state.view = "main";
      const dateStamp = action.payload
        .matchAll(/(?<monthAndDay>\w{3} \d{2})(?<year> \d{4})/g)
        .next().value.groups;
      state.tableValues.push({
        name: "",
        created: `${dateStamp.monthAndDay},${dateStamp.year}`,
        category: CATEGORIES[0],
        content: "",
        dates: "",
      });
    },
    deleteRow: (state, action) => {
      if (state.view === "main") {
        state.tableValues = state.tableValues.filter(
          (_, index) => index !== action.payload
        );
      } else if (state.view === "archive") {
        state.archivedValues = state.archivedValues.filter(
          (_, index) => index !== action.payload
        );
      }
    },
    archiveRow: (state, action) => {
      if (state.view === "main") {
        state.archivedValues.push(state.tableValues[action.payload]);
        state.tableValues = state.tableValues.filter(
          (_, index) => index !== action.payload
        );
      } else if (state.view === "archive") {
        state.tableValues.push(state.archivedValues[action.payload]);
        state.archivedValues = state.archivedValues.filter(
          (_, index) => index !== action.payload
        );
      }
    },
    updateRow: (state, action) => {
      let extractedDates;
      try {
        extractedDates = action.payload.content
          .match(/\d{1,2}[.,/\\]\d{1,2}[.,/\\]\d{2,4}/g)
          .reduce((accumulator, value, index, array) => {
            const prefix = index === array.length - 1 ? "." : ", ";
            return accumulator + value + prefix;
          }, "");
      } catch (e) {
        extractedDates = "";
      }

      state.tableValues[action.payload.index] = {
        ...state.tableValues[action.payload.index],
        ...{
          name: action.payload.name,
          category: action.payload.category,
          content: action.payload.content,
          dates: extractedDates,
        },
      };
    },
    updateStatistic: (state) => {
      state.statistic = {};
      CATEGORIES.forEach((category) => {
        let mainCounter = 0;
        let archiveCounter = 0;
        state.tableValues.forEach((value) => {
          if (value.category === category) mainCounter++;
        });
        state.archivedValues.forEach((value) => {
          if (value.category === category) archiveCounter++;
        });
        if (mainCounter | archiveCounter)
          state.statistic[category] = { mainCounter, archiveCounter };
      });
    },
  },
});

export const {
  changeView,
  deleteEntries,
  createNewEntry,
  deleteRow,
  archiveRow,
  updateRow,
  updateStatistic,
} = tableSlice.actions;

export default tableSlice.reducer;
