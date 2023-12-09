import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function TextForm(props) {
  const [previewStyle, setpreviewStyle] = useState({
    display: "block",
  });

  const [previewButton, setpreviewButton] = useState("Show Preview");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  
  
  const handlePreview = () => {
    if (previewStyle.display !== "block") {
      setpreviewStyle({
        display: "block",
      });
      // props.handleAlert("You can see your preview here ", "success");
    } else {
      setpreviewStyle({
        display: "none",
      });
    }
  };
  const [text, setText] = useState("");
  const [textStyle, setTextStyle] = useState("normal");
  
  const handleBold = () => {
    // setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    setText(RichUtils.toggleInlineStyle(text, 'BOLD'));

  };
  const toUppercase = () => {
    const newText = text.toUpperCase();
    setText(newText);
    props.handleAlert("Converted to Uppercase ", "success");
  };
  const toLowercase = () => {
    alert("Enter value in Uppercase");
    const newText = text.toLowerCase();
    setText(newText);
    props.handleAlert("Converted to Lowercase ", "success");
  };

  const trim = () => {
    const newText = text.trim();
    setText(newText);
    alert(
      props.handleAlert("Removed spaces using trim() function ", "success")
    );
  };

  const handleOnchange = (event) => {
    console.log("handleOnchange");
    setText(event.target.value);
  };
  const clear = () => {
    setText("");
    props.handleAlert("Cleared the Working area ", "success");
  };

  const handleExtraSpaces = () => {
    const newText = text.split(/[" "]+/);
    setText(newText.join(""));
    props.handleAlert(
      ` removed extra spaces from ${text} and converted it to ${newText}`,
      "success"
    );
  };



  const handleBoldClick = () => {
    setTextStyle("bold");
  };
  
  const handleUnderlineClick = () => {
    setTextStyle("underline");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setText(text + "\n");
    } else if (event.key === "b") {
      setTextStyle("bold");
    } else if (event.key === "u") {
      setTextStyle("underline");
    }
  };

  return (
    <div className="container">
      <h1 className="mx-auto my-4 ">{props.myheading}</h1>
      <div className="mb-3">
        <label
          htmlFor="exampleFormControlTextarea1"
          className="form-label"
        ></label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={text}
          onChange={handleOnchange}
          onKeyDown={handleKeyDown}
          placeholder="Enter here please"
        ></textarea>
      </div>

      <div className="container">
        <button className="btn btn-outline-info mx-1" onClick={toUppercase}>
          convert To Uppercase
        </button>
        <button className="btn btn-outline-warning mx-1" onClick={trim}>
          Remove Space from Sides
        </button>
        <button className="btn btn-outline-success mx-1" onClick={toLowercase}>
          convert To Lowercase
        </button>
        <button
          className=" mx-1 btn btn-outline-primary"
          onClick={handleExtraSpaces}
        >
          Remove all extra spaces
        </button>
        <button
          type="button"
          onClick={handlePreview}
          className="btn btn-outline-info mx-1"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          {previewButton}
        </button>
        <button className="btn btn-outline-danger mx-1" onClick={clear}>
          Clear Area
        </button>
        {/* <button onClick={handleBoldClick} >Bold</button>
        <button onClick={handleUnderlineClick}>UnderLine</button> */}
      </div>

      <div className="text-analytics">
        <h1
          className={`analytics-title mx-auto my-4 text-${
            props.mode === "light" ? "dark" : "light"
          } `}
        >
          Text Analytics
        </h1>
        <ul className="list-group">
          <li
            className={`analytics-data  text-${
              props.mode === "light" ? "dark" : "light"
            } `}
          >
            <i style={{ fontSize: "1.5rem" }}>Number of Words written are: </i>
            <b style={{ fontSize: "1.5rem" }}>
              {" "}
              {
                text.split(" ").filter((element) => {
                  return element.length !== 0;
                }).length
              }{" "}
            </b>
          </li>

          <li className="analytics-data">
            <i style={{ fontSize: "1.5rem" }}>
              {" "}
              The total number of characters are:
            </i>{" "}
            <b className="analytics-value" style={{ fontSize: "1.5rem" }}>
              {text.length}
            </b>
          </li>

          <li className={`analytics-data  text-${
              props.mode === "light" ? "dark" : "light"
            } `}>
            <i style={{ fontSize: "1.5rem" }}> Your Reading Speed is:</i>{" "}
            <b className="analytics-value" style={{ fontSize: "1.5rem" }}>
              {0.008 * text.split("").length}
            </b>
          </li>
        </ul>
      </div>

     
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">{text}</div>
            <div className="modal-body">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
              >
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
