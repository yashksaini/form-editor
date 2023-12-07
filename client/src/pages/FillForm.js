import React, { useEffect, useState } from "react";
import { serverURL } from "../utils";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateAnswers } from "../redux/fill";
import Categorize from "../components/fill/Categorize";
import Cloze from "../components/fill/Cloze";
import Comprehension from "../components/fill/Comprehension";

const FillForm = () => {
  const [formData, setFormData] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const { id } = useParams();
  const { answers } = useSelector((state) => state.fillForm);
  const dispath = useDispatch();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`${serverURL}/get-form/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
          let len = data.questions.length;
          let arr = Array(len).fill([]);
          dispath(updateAnswers(arr));
          if (data.banner) {
            setImgURL(`data:image/png;base64,${data.banner}`);
          }
        } else {
          throw new Error("Failed to fetch form");
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchFormData();
  }, [id]);
  const submitForm = async () => {
    let finalData = {
      formId: id,
      answers: answers,
    };
    try {
      const response = await fetch(`${serverURL}/submit-form`, {
        // Updated port to 8000
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
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
      {formData ? (
        <div>
          <h1 className="text-xl my-2 font-semibold">{formData.title}</h1>
          {imgURL ? (
            <div className="w-full my-4 h-40 border bg-gray-400 flex justify-center items-center rounded-2xl relative overflow-hidden">
              <img
                src={imgURL}
                alt="Banner"
                className="absolute top-0 left-0 w-full min-h-[160px]"
              />
            </div>
          ) : null}
          <div>
            {formData.questions.map((question, index) => {
              if (question.type === "Categorize") {
                return (
                  <Categorize
                    questionData={question}
                    key={index}
                    queIndex={index}
                  />
                );
              } else if (question.type === "Cloze") {
                return (
                  <Cloze questionData={question} key={index} queIndex={index} />
                );
              } else if (question.type === "Comprehension") {
                return (
                  <Comprehension
                    questionData={question}
                    key={index}
                    queIndex={index}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <button
            onClick={submitForm}
            className="w-40 px-8 py-2 rounded-full bg-blue-500 text-white block m-auto my-8"
          >
            Submit Form
          </button>
        </div>
      ) : (
        <p>Loading form ...</p>
      )}
    </div>
  );
};

export default FillForm;
