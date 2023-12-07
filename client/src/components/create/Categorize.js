import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Categorize = (props) => {
  const { questionData, index, updateQuestion } = props;
  const [message, setMessage] = useState("");
  const [lastCatId, setLastCatId] = useState(2);
  const [lastItemId, setLastItemId] = useState(2);
  const [question, setQuestion] = useState({});
  function onDragEnd(result) {
    if (!result.destination) return;

    const newItems = Array.from(question.categories);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setQuestion({ ...question, categories: newItems });
  }
  function onDragEndItem(result) {
    if (!result.destination) return;

    const newItems = Array.from(question.items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setQuestion({ ...question, items: newItems });
  }
  const addItem = () => {
    let x = lastItemId + 1;
    setLastItemId(x);

    let data = {
      id: x.toString(),
      name: "Item " + x,
      category: "",
    };
    let arr = [...question.items];
    arr.push(data);
    setQuestion({ ...question, items: arr });
  };
  const addCategory = () => {
    let x = lastCatId + 1;
    setLastCatId(x);

    let data = {
      id: x.toString(),
      content: "Category " + x,
    };
    let arr = [...question.categories];
    arr.push(data);
    setQuestion({ ...question, categories: arr });
  };

  const saveData = () => {
    let finalQuestion = {
      ...question,
      lastCatId: lastCatId,
      lastItemId: lastItemId,
    };
    updateQuestion(finalQuestion, index);
    setMessage("Saved");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  useEffect(() => {
    setQuestion({ ...questionData });
    setLastCatId(questionData.lastCatId);
    setLastItemId(questionData.lastItemId);
  }, [questionData]);

  return (
    <>
      <div className="border-2 p-6 my-4 border-dashed rounded-xl">
        <button
          onClick={saveData}
          className="py-2 px-4 rounded-full bg-blue-400 text-white mb-4"
        >
          Save Question
        </button>
        <small className="inline ml-4">{message}</small>
        <input
          type="text"
          onChange={(e) => {
            setQuestion({ ...question, desc: e.target.value });
          }}
          value={question.desc}
          placeholder="Description ..."
          className="mb-4 block w-full border px-4 py-2"
        />
        <h1 className="mt-4 mb-6 font-semibold text-xl">Categories</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {question.categories &&
                  question.categories.map((category, index) => (
                    <Draggable
                      draggableId={category.id}
                      index={index}
                      key={category.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={category.id}
                          className="w-[50%] flex gap-2 justify-start items-center mb-4"
                        >
                          <span className="material-symbols-outlined hover:cursor-move">
                            drag_indicator
                          </span>
                          <input
                            type="text"
                            value={category.content}
                            onChange={(e) => {
                              let arr = [...question.categories];
                              arr[index] = {
                                ...arr[index],
                                content: e.target.value,
                              };
                              setQuestion({ ...question, categories: arr });
                            }}
                            className=" block w-full border px-4 py-2"
                          />
                          <span
                            className="material-symbols-outlined hover:cursor-pointer"
                            id={index}
                            onClick={() => {
                              let arr = [...question.categories];
                              arr.splice(index, 1);
                              setQuestion({ ...question, categories: arr });
                            }}
                          >
                            close
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          onClick={addCategory}
          className="my-2 border rounded-full py-2 px-3 flex justify-center items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span> Add Category
        </button>

        <div className="flex justify-between items-start mb-3 font-semibold text-xl mt-6">
          <h1>Item</h1>
          <h1>Belong To</h1>
        </div>
        <DragDropContext onDragEnd={onDragEndItem}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {question.items &&
                  question.items.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={item.id}
                          className="flex justify-between items-start mb-2"
                        >
                          <div className="flex gap-2 items-center justify-start mt-4">
                            <span className="material-symbols-outlined hover:cursor-move">
                              drag_indicator
                            </span>
                            <input
                              type="text"
                              value={item.name}
                              className=" block  border px-4 py-2"
                              onChange={(e) => {
                                let arr = [...question.items];
                                arr[index] = {
                                  ...arr[index],
                                  name: e.target.value,
                                };
                                setQuestion({ ...question, items: arr });
                              }}
                            />
                            <span
                              className="material-symbols-outlined hover:cursor-pointer"
                              onClick={() => {
                                let arr = [...question.items];
                                arr.splice(index, 1);
                                setQuestion({ ...question, items: arr });
                              }}
                            >
                              close
                            </span>
                          </div>
                          <select
                            value={item.category}
                            className="mt-4 block  border px-4 py-2"
                            onChange={(e) => {
                              let arr = [...question.items];
                              arr[index] = {
                                ...arr[index],
                                category: e.target.value,
                              };
                              setQuestion({ ...question, items: arr });
                            }}
                          >
                            <option value="">Choose Category</option>
                            {question.categories.map((data, i) => {
                              return (
                                <option value={data.content} key={i}>
                                  {data.content}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          onClick={addItem}
          className="mt-4 mb-2 border rounded-full py-2 px-3 flex justify-center items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span> Add Item
        </button>
      </div>
    </>
  );
};

export default Categorize;
