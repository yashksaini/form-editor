import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Categorize = (props) => {
  const { questionData } = props;
  const [answer, setAnswer] = useState([]);
  const [leftItems, setLeftItems] = useState([]);

  function onDragEnd(result) {
    if (!result.destination) return;
    let id = result.draggableId;
    const destination = result.destination;
    let categoryData = questionData.categories.find(
      (category) => category.id === destination.droppableId
    );
    if (categoryData) {
      let arr = [...leftItems];
      arr = arr.filter((item) => item.id !== id);
      setLeftItems(arr);
      let ans = [...answer];
      let data = {
        item: questionData.items.find((item) => item.id === id).name,
        category: categoryData.content,
      };
      let itemIndex = ans.findIndex((x) => x.item === data.item);
      if (itemIndex === -1) {
        ans.push(data);
      } else {
        ans[itemIndex] = { ...data };
      }
      setAnswer(ans);
    }
  }
  useEffect(() => {
    setLeftItems(questionData.items);
  }, [questionData]);
  return (
    <div className="border border-dashed p-4 rounded-md my-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <h1 className="my-4 text-xl px-4">{questionData.desc}</h1>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full p-4 flex flex-wrap gap-2  justify-start items-start"
            >
              {leftItems &&
                leftItems?.map((item, index) => {
                  return (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={item.id}
                          className="py-2 px-4 border bg-blue-500 text-white rounded-md inline-flex"
                        >
                          {item.name}
                        </span>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="grid grid-cols-2 gap-4 p-4">
          {questionData?.categories?.map((category) => {
            return (
              <div key={category.id}>
                <h1 className="text-xl my-2 font-semibold">
                  {category.content}
                </h1>
                <Droppable droppableId={category.id} key={category.id}>
                  {(provided) => (
                    <div
                      className="min-h-[160px] rounded-xl bg-gray-100 p-8"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {questionData.items &&
                        questionData.items
                          ?.filter((temp) => {
                            if (
                              answer.find(
                                (a) =>
                                  a.item === temp.name &&
                                  a.category === category.content
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          })
                          .map((item, index) => {
                            return (
                              <Draggable
                                draggableId={item.id}
                                index={index}
                                key={item.id}
                              >
                                {(provided) => (
                                  <span
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    key={item.id}
                                    className="py-2 px-4 border bg-blue-500 text-white rounded-md inline-flex"
                                  >
                                    {item.name}
                                  </span>
                                )}
                              </Draggable>
                            );
                          })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Categorize;
