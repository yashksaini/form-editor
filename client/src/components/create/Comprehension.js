import React, { useEffect, useState } from "react";
const Comprehension = (props) => {
  const { questionData, updateQuestion, index } = props;

  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [question, setQuestion] = useState({});
  const emptyQuestion = {
    text: "This is a sample mcq question",
    options: [
      { id: "1", content: "Option A" },
      { id: "2", content: "Option B" },
      { id: "3", content: "Option C" },
      { id: "4", content: "Option D" },
    ],
    answer: 1, // index (0 to length - 1)
  };
  const [mcqs, setMcqs] = useState([]);
  const addMcq = () => {
    let arr = [...mcqs];
    arr.push(emptyQuestion);
    setMcqs(arr);
  };

  useEffect(() => {
    let data = {
      text: text,
      questions: [...mcqs],
      type: "Comprehension",
    };
    setQuestion(data);
  }, [mcqs, text]);

  useEffect(() => {
    setText(questionData.text);
    setMcqs(questionData.questions);
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
      <label className="block text-xl font-semibold my-4">
        Comprehension Text
      </label>
      <textarea
        className="w-full min-h-[120px] resize-y max-h-[400px] border p-4 "
        placeholder="Add comrehesion here..."
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
      />
      {mcqs &&
        mcqs.map((question, index) => {
          return (
            <div
              className="border-2 p-6 my-4 border-dotted rounded-xl"
              key={index}
            >
              <div className="flex items-center gap-1 mb-4">
                <button
                  onClick={() => {
                    let arr = [...mcqs];
                    arr.splice(index, 1);
                    setMcqs(arr);
                  }}
                  className="border rounded-full w-10 h-10 inline-flex justify-center items-center gap-2"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
                <label className=" ml-4 inline-flex text-xl font-semibold h-10 items-center leading-[0px]">
                  Question {index + 1}
                </label>
              </div>

              <input
                type="text"
                value={question.text}
                onChange={(e) => {
                  let arr = [...mcqs];
                  arr[index].text = e.target.value;
                  setMcqs(arr);
                }}
                className="mb-4 block w-full border px-4 py-2"
              />
              {question.options.length > 0 &&
                question.options.map((option, i) => {
                  return (
                    <div
                      key={option.id}
                      className="w-full flex gap-2 justify-start items-center mb-4"
                    >
                      <span
                        className="material-symbols-outlined hover:cursor-pointer"
                        onClick={() => {
                          let arr = [...mcqs];
                          arr[index].answer = i;
                          setMcqs(arr);
                        }}
                      >
                        {i === question.answer
                          ? "radio_button_checked"
                          : "radio_button_unchecked"}
                      </span>
                      <input
                        type="text"
                        value={option.content}
                        onChange={(e) => {
                          let mainArr = [...mcqs];
                          let arr = [...question.options];
                          let data = mcqs[index];

                          arr[i].content = e.target.value;
                          data.options = [...arr];
                          mainArr[index] = data;
                          setMcqs(mainArr);
                        }}
                        className=" block w-full border px-4 py-2"
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
      <button
        onClick={addMcq}
        className="mt-4 mb-2 border rounded-full py-2 px-3 flex justify-center items-center gap-2"
      >
        <span className="material-symbols-outlined">add</span> Add New Question
      </button>
    </div>
  );
};

export default Comprehension;
