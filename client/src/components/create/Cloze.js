import React, { useEffect, useState } from "react";
import RichTextEditor from "react-rte";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const Cloze = (props) => {
  const toolbarConfig = {
    display: ["INLINE_STYLE_BUTTONS"],
    INLINE_STYLE_BUTTONS: [{ label: "Underline", style: "UNDERLINE" }],
  };
  const [message, setMessage] = useState("");
  const { questionData, updateQuestion, index } = props;
  const [question, setQuestion] = useState({});
  const [extraId, setExtraId] = useState(0);
  const [finalValue, setFinalValue] = useState("");
  const [options, setOptions] = useState([]);

  const [extraOptions, setExtraOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [editorContent, setEditorContent] = useState(
    RichTextEditor.createEmptyValue()
  );
  const handleOnChange = (value) => {
    setEditorContent(value);
    let htmlString = value.toString("html");
    const withoutNbsp = htmlString.replace(/&nbsp;/g, "").replace(/<br>/g, "");
    const withoutPTags = withoutNbsp.replace(/<p>|<\/p>/g, "");
    const replacedString = withoutPTags.replace(/<u>(.*?)<\/u>/g, () =>
      "_ ".repeat(4)
    );
    setFinalValue(replacedString);
    let words = extractWordsInUTags(htmlString);
    updateOptions(words);
  };
  const updateOptions = (words) => {
    let id = 100;
    let newWords = words.map((data) => {
      id++;
      return {
        isAnswer: true,
        id: id.toString(),
        content: data,
      };
    });
    setAnswers(newWords);
    mergeArrays(newWords, "answer");
  };

  const mergeArrays = (newArr, type) => {
    let arr;
    if (type === "answer") {
      arr = [...newArr, ...extraOptions];
    } else {
      arr = [...answers, ...newArr];
    }
    setOptions(arr);
  };
  function extractWordsInUTags(text) {
    const matches = text.match(/<u>(.*?)<\/u>/g); // Matches text within <u> tags
    if (matches) {
      const underlinedWords = matches.map((match) => {
        const wordInUTag = match.replace(/<\/?u>/g, ""); // Remove <u> and </u> tags
        return wordInUTag;
      });
      return underlinedWords;
    }
    return [];
  }
  function onDragEnd(result) {
    if (!result.destination) return;

    const newItems = Array.from(options);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setOptions(newItems);
  }
  const addOption = () => {
    let arr = [...extraOptions];
    let id = extraId + 1;
    setExtraId(id);
    let data = {
      isAnswer: false,
      id: id.toString(),
      content: "New Option",
    };
    arr.push(data);
    setExtraOptions(arr);
    mergeArrays(arr, "option");
  };
  useEffect(() => {
    let obj = {
      questionText: finalValue,
      words: [...options],
      extraId: extraId,
      underLineData: editorContent.toString("html"),
      type: "Cloze",
    };
    setQuestion({ ...obj });
  }, [finalValue, options, extraId, editorContent]);

  useEffect(() => {
    setFinalValue(questionData.questionText);
    setOptions(questionData.words);
    setExtraId(questionData.extraId);

    const data = RichTextEditor.createValueFromString(
      questionData.underLineData,
      "html"
    );
    setEditorContent(data);

    let arr = [...questionData.words];
    let arr2 = [...questionData.words];
    let answersData = arr.filter((data) => {
      return data.isAnswer === true;
    });
    let extraOptionsData = arr2.filter((data) => {
      return data.isAnswer === false;
    });
    setAnswers(answersData);
    setExtraOptions(extraOptionsData);
  }, [questionData]);

  const saveData = () => {
    updateQuestion(question, index);
    setMessage("Saved");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  return (
    <div className="border-2 p-6 my-4 border-dashed rounded-xl">
      <button
        onClick={saveData}
        className="py-2 px-4 rounded-full bg-blue-400 text-white mb-4"
      >
        Save Question
      </button>
      <small className="inline ml-4">{message}</small>
      <label className="block text-xl font-semibold my-4">Preview</label>
      <input
        type="text"
        disabled
        value={finalValue}
        className="w-full h-10 rounded-md border px-4"
      />
      <label className="block text-xl font-semibold my-4">Sentence</label>
      <RichTextEditor
        value={editorContent}
        onChange={handleOnChange}
        toolbarConfig={toolbarConfig}
      />
      <label className="block text-xl font-semibold my-4">Options</label>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {options.length > 0 &&
                options.map((option, index) => (
                  <Draggable
                    draggableId={option.id}
                    index={index}
                    key={option.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={option.id}
                        className="w-[50%] flex gap-2 justify-start items-center mb-4"
                      >
                        <span className="material-symbols-outlined hover:cursor-move">
                          drag_indicator
                        </span>
                        {option.isAnswer ? (
                          <input
                            type="text"
                            value={option.content}
                            disabled
                            className=" block w-full border px-4 py-2"
                          />
                        ) : (
                          <>
                            {" "}
                            <input
                              type="text"
                              value={option.content}
                              onChange={(e) => {
                                let arr = [...options];
                                arr[index].content = e.target.value;
                                setOptions(arr);
                              }}
                              className=" block w-full border px-4 py-2"
                            />
                            <span
                              className="material-symbols-outlined hover:cursor-pointer"
                              id={index}
                              onClick={() => {
                                let arr = [...options];
                                let arr2 = [...extraOptions];

                                let findIndex = extraOptions.findIndex(
                                  (data) => data.id === arr[index].id
                                );
                                arr.splice(index, 1);
                                arr2.splice(findIndex, 1);
                                setExtraOptions(arr2);
                                setOptions(arr);
                              }}
                            >
                              close
                            </span>
                          </>
                        )}
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
        onClick={addOption}
        className="mt-4 mb-2 border rounded-full py-2 px-3 flex justify-center items-center gap-2"
      >
        <span className="material-symbols-outlined">add</span> Add Option
      </button>
    </div>
  );
};

export default Cloze;
