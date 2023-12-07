export const categorizeData = {
  desc: "",
  lastCatId: 2,
  lastItemId: 2,
  type: "Categorize",
  categories: [
    { id: "1", content: "Category 1" },
    { id: "2", content: "Category 2" },
  ],
  items: [
    {
      id: "1",
      name: "Item 1",
      category: "",
    },
    {
      id: "2",
      name: "Item 2",
      category: "",
    },
  ],
};
export const clozeData = {
  questionText: "",
  type: "Cloze",
  words: [],
  extraId: 0,
  underLineData: "",
};

export const comprehensionData = {
  type: "Comprehension",
  text: "",
  questions: [],
};
