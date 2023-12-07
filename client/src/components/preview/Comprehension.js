import React, { useEffect, useState } from "react";

const Comprehension = (props) => {
  const { questionData } = props;
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let arr = Array(questionData.length).fill(null);
    setSelected(arr);
  }, [questionData]);
  return (
    <div className="border border-dashed p-4 rounded-md my-4">
      <h1 className="text-xl font-semibold mb-4">Comprehesion Text</h1>
      <p className="mb-4 text-gray-600 leading-[1.5]">{questionData.text}</p>
      {questionData.questions &&
        questionData.questions.map((question, index) => {
          return (
            <div
              className="border-2 p-6 my-4 border-dotted rounded-xl"
              key={index}
            >
              <div className="flex items-center gap-1 mb-4">
                <label className=" ml-4 inline-flex text-xl font-semibold h-10 items-center leading-[0px]">
                  Question {index + 1}
                </label>
              </div>
              <p className="mb-4 block w-full border px-4 py-2">
                {question.text}
              </p>
              {question.options.length > 0 &&
                question.options.map((option, i) => {
                  return (
                    <div
                      key={option.id}
                      className="w-full flex gap-2 justify-start items-center mb-4 hover:cursor-pointer"
                      onClick={() => {
                        let arr = [...selected];
                        arr[index] = i;
                        setSelected(arr);
                      }}
                    >
                      <span
                        className="material-symbols-outlined hover:cursor-pointer"
                        onClick={() => {}}
                      >
                        {i === selected[index]
                          ? "radio_button_checked"
                          : "radio_button_unchecked"}
                      </span>
                      <p className=" block w-full border px-4 py-2">
                        {option.content}
                      </p>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default Comprehension;
