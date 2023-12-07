import React from "react";
import { useSelector } from "react-redux";
import Categorize from "../components/preview/Categorize";
import Cloze from "../components/preview/Cloze";
import Comprehension from "../components/preview/Comprehension";
import { Link } from "react-router-dom";

const Preview = () => {
  const { banner, title, questions } = useSelector((state) => state.createForm);

  return (
    <div className="w-[900px] max-w-full m-auto py-4 md:px-0 px-4">
      <Link
        to="/create"
        className="inline-flex my-4 border px-6 py-2 rounded-full"
      >
        Back to Create
      </Link>
      <div>
        <h1 className="text-xl my-2 font-semibold">{title}</h1>
        {banner ? (
          <div className="w-full my-4 h-40 border bg-gray-400 flex justify-center items-center rounded-2xl relative overflow-hidden">
            <img
              src={banner ? "data:image/png;base64," + banner : "./banner.png"}
              alt="Banner"
              className="absolute top-0 left-0 w-full min-h-[160px]"
            />
          </div>
        ) : null}
        <div>
          {questions.map((question, index) => {
            if (question.type === "Categorize") {
              return <Categorize questionData={question} key={index} />;
            } else if (question.type === "Cloze") {
              return <Cloze questionData={question} key={index} />;
            } else if (question.type === "Comprehension") {
              return <Comprehension questionData={question} key={index} />;
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Preview;
