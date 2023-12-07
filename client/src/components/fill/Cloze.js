import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateAnswers } from "../../redux/fill";
const Cloze = (props) => {
  const { questionData, queIndex } = props;
  const [leftItems, setLeftItems] = useState([]);
  const [line, setLine] = useState("");
  const [answer, setAnswer] = useState([]);
  const [parsedContent, setParsedContent] = useState([]);

  const dispatch = useDispatch();
  const { answers } = useSelector((state) => state.fillForm);

  function onDragEnd(result) {
    if (!result.destination) return;
    let dropId = result.destination.droppableId;
    if (dropId !== "droppable") {
      let itemValue = leftItems[result.source.index].content;
      let contentId = parseInt(dropId) + 100;
      let checkEmpty = answer.find((ans) => ans.id === contentId.toString());
      // Not filled

      let arr = [...answer];
      if (!checkEmpty) {
        let data = {
          id: contentId.toString(),
          content: itemValue,
        };
        arr.push(data);
        setAnswer(arr);
        let temp = [...leftItems];
        temp.splice(result.source.index, 1);
        setLeftItems(temp);
      } else {
        let prevData = questionData.words.find(
          (item) => item.content === arr[dropId - 1].content
        );
        let data = {
          id: contentId.toString(),
          content: itemValue,
        };
        arr[dropId - 1] = data;
        let temp = [...leftItems];
        temp.splice(result.source.index, 1);
        temp.push(prevData);
        setLeftItems(temp);
        setAnswer(arr);
      }
    }
  }

  useEffect(() => {
    const container = document.createElement("div");
    container.innerHTML = line;
    const nodes = Array.from(container?.childNodes[0]?.childNodes || []);
    let arr = [];
    nodes.forEach((node, index) => {
      if (node.nodeName.toLowerCase() === "u") {
        arr.push(index);
      }
      return null;
    });
    const parsedNodes = nodes.map((node, index) => {
      if (node.nodeName.toLowerCase() === "u") {
        return (
          <Droppable droppableId={`${arr.indexOf(index) + 1}`} key={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-40 h-10 align-middle bg-gray-100 rounded inline-flex justify-center items-center mx-2"
              >
                <span className="py-1 px-3 border bg-blue-500 text-white rounded-md inline-flex">
                  {answer[arr.indexOf(index)]?.content}
                </span>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      }
      return node.textContent;
    });

    setParsedContent(parsedNodes);
  }, [line, answer]);

  useEffect(() => {
    setLeftItems(questionData.words);
    setLine(questionData.underLineData);
  }, [questionData]);

  useEffect(() => {
    let arr = [...answers];
    arr[queIndex] = answer;
    dispatch(updateAnswers(arr));
  }, [answer]);

  useEffect(() => {
    setAnswer(answers[queIndex]);
  }, [answers]);

  return (
    <div className="border border-dashed p-4 rounded-md my-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full py-4 mb-8 flex flex-wrap gap-2  justify-start items-start"
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
                          className="py-1 px-3 border bg-blue-500 text-white rounded-md inline-flex"
                        >
                          {item.content}
                        </span>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="sentence">{parsedContent}</div>
      </DragDropContext>
    </div>
  );
};

export default Cloze;
