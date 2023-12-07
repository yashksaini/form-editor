import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTheBanner,
  changeTheTitle,
  addQuestion,
  updateQuestions,
} from "./../redux/create";
import Categorize from "./../components/create/Categorize";
import Cloze from "../components/create/Cloze";
import Comprehension from "../components/create/Comprehension";
import {
  categorizeData,
  clozeData,
  comprehensionData,
} from "../questionFormats";
import { serverURL } from "../utils";
import { Link } from "react-router-dom";

const Create = () => {
  const { banner, title, questions } = useSelector((state) => state.createForm);
  const dispath = useDispatch();
  const [questionType, setQuestionType] = useState("Categorize");

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const maxSize = 500 * 1024; // 500k KB

      if (file && file.size > maxSize) {
        alert("File size exceeds the limit (500 KB)");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          dispath(changeTheBanner(reader.result.split(",")[1]));
        };
      }
    }
  };
  const addNewQuestion = () => {
    if (questionType === "Categorize") {
      dispath(addQuestion(categorizeData));
    } else if (questionType === "Cloze") {
      dispath(addQuestion(clozeData));
    } else if (questionType === "Comprehension") {
      dispath(addQuestion(comprehensionData));
    }
  };
  const updateQuestion = (question, index) => {
    let arr = [...questions];
    arr[index] = question;
    dispath(updateQuestions(arr));
  };
  const addFormToDB = async () => {
    let finalForm = {
      title: title,
      banner: banner,
      questions: questions,
    };
    try {
      const response = await fetch(`${serverURL}/add-form`, {
        // Updated port to 8000
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalForm),
      });

      if (response.ok) {
        // Handle successful form submission
        alert("Form Submitted Successfully");
        window.location.reload();
      } else {
        // Handle errors
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="w-[900px] max-w-full m-auto py-4 md:px-0 px-4">
      <Link
        to="/preview"
        className="inline-flex my-4 border px-6 py-2 rounded-full"
      >
        Preview
      </Link>
      <div className="flex justify-between py-2 gap-3 ">
        <input
          className="focus:outline-none border-b-gray-200 px-4 py-3 border w-full rounded-xl font-semibold"
          type="text"
          placeholder="Form title here..."
          value={title}
          onChange={(e) => {
            dispath(changeTheTitle(e.target.value));
          }}
          onClick={(e) => {
            e.target.select();
          }}
        />
      </div>

      {/* Banner Start */}
      <div className="w-full my-4 h-40 border bg-gray-400 flex justify-center items-center rounded-2xl relative overflow-hidden">
        <img
          src={banner ? "data:image/png;base64," + banner : "./banner.png"}
          alt="Banner"
          className="absolute top-0 left-0 w-full min-h-[160px]"
        />
      </div>
      {/* Input Banner Image */}
      <div className="m-auto text-center">
        <label
          className=" w-10 flex justify-center items-center gap-2 border py-4 px-8 border-dashed border-gray-500 rounded-xl hover:cursor-pointer text-gray-500"
          htmlFor="bannerImg"
        >
          <span className="material-symbols-outlined text-[18px]">
            add_a_photo
          </span>
        </label>
        <input
          type="file"
          id="bannerImg"
          accept="image/*"
          className="hidden"
          onChange={onSelectFile}
        />
        <button
          onClick={addFormToDB}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Create Form
        </button>
      </div>

      {questions.map((data, index) => {
        return (
          <div key={index}>
            {data.type === "Comprehension" ? (
              <Comprehension
                questionData={data}
                updateQuestion={updateQuestion}
                index={index}
              />
            ) : data.type === "Cloze" ? (
              <Cloze
                questionData={data}
                updateQuestion={updateQuestion}
                index={index}
              />
            ) : (
              <Categorize
                questionData={data}
                updateQuestion={updateQuestion}
                index={index}
              />
            )}
          </div>
        );
      })}
      <div className="flex justify-between items-center my-4">
        <select
          onChange={(e) => {
            setQuestionType(e.target.value);
          }}
          value={questionType}
          className="px-2 py-2 border rounded-md"
        >
          <option value="Categorize">Categorize</option>
          <option value="Cloze">Cloze</option>
          <option value="Comprehension">Comprehension</option>
        </select>
        <button
          onClick={addNewQuestion}
          className="mt-4 mb-2 bg-blue-400 text-white rounded-full py-2 px-3 flex justify-center items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span> Add New
          Question
        </button>
      </div>
    </div>
  );
};

export default Create;
