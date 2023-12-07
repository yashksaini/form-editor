import React, { useState, useEffect } from "react";
import { serverURL } from "../utils";
import { Link } from "react-router-dom";
const Forms = () => {
  const [allForms, setAllForms] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${serverURL}/get-forms`);
        if (response.ok) {
          const data = await response.json();
          setAllForms(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="w-[900px] max-w-full m-auto py-4 md:px-0 px-4">
      {allForms.length > 0 ? (
        allForms.map((form) => {
          return (
            <div className="w-full p-4 border rounded-xl mb-4" key={form._id}>
              <h1 className="text-xl font-semibold leading-[1.6]">
                {form.title}
              </h1>
              <Link className="my-2 text-blue-600" to={"/fillForm/" + form._id}>
                Fill Form
              </Link>
              <p className="float-right text-gray-500">
                Total Questions: {form?.questions?.length}
              </p>
            </div>
          );
        })
      ) : (
        <div>No Forms to display</div>
      )}
      {}
    </div>
  );
};

export default Forms;
