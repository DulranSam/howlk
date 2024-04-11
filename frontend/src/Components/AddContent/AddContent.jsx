/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";

const AddContent = () => {
  const { setLoading, loading, status, setStatus, BASE } =
    useContext(UserContext);
  const [fields, setFields] = useState({
    heading: "",
    preDesc: "",
    content: [],
    postDesc: "",
    category: "mains",
  });

  const navigator = useNavigate();

  const handleContentChange = (index, value) => {
    const updatedContent = [...fields.content];
    updatedContent[index] = value;
    setFields({ ...fields, content: updatedContent });
  };

  const addContentPoint = () => {
    if (fields.content.length < 10) {
      setFields({
        ...fields,
        content: [...fields.content, ""],
      });
    } else {
      setStatus("You can only add up to 10 content points.");
    }
  };

  const removeContentPoint = (index) => {
    const updatedContent = [...fields.content];
    updatedContent.splice(index, 1);
    setFields({
      ...fields,
      content: updatedContent,
    });
  };

  async function uploadContent(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/mains/adds`, fields);
      if (response.status === 200) {
        alert("Nice!");
        navigator("/");
      }
    } catch (err) {
      if (err.status === 404) {
        setStatus("No results found!");
      }else if(err.status===500){setStatus("Some issue!")} else {
        setStatus("Error!");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <h1>Add Content</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <form onSubmit={uploadContent}>
            <input
              onChange={handleChange}
              name="heading"
              placeholder="Enter Heading..."
              type="text"
              minLength={5}
            ></input>
            <input
              onChange={handleChange}
              name="preDesc"
              placeholder="Enter Pre Description"
              type="text"
            ></input>
            {fields.content.map((point, index) => (
              <div key={index}>
                <input
                  value={point}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder="Enter Content Point"
                  type="text"
                ></input>
                <button type="button" onClick={() => removeContentPoint(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addContentPoint}>
              Add Content Point
            </button>
            <input
              onChange={handleChange}
              name="postDesc"
              placeholder="Enter Post Description"
              type="text"
            ></input>
            <select
              onChange={handleChange}
              name="category"
              defaultValue={"mains"}
              required
            >
              <option value="main">Main</option>
              <option value="side">Side</option>
            </select>
            <button type="submit" disabled={loading}>
              Add
            </button>
          </form>
        )}
        {/* <h1>{status}</h1> */}
      </div>
    </div>
  );
};

export default AddContent;
