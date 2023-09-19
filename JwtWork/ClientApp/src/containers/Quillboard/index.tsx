import { useState, type FunctionComponent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Quillboard: FunctionComponent = () => {
  const [quillvalue, setQuillvalue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{size:[]}],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image","video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="section quill-wrapper">
      <div className="container">
        <h3 className="title is-3">Quill Rich Text Editor</h3>
        <div className="box container-box">
          <ReactQuill
            theme="snow"
            value={quillvalue}
            onChange={setQuillvalue}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
    </div>
  );
};

export default Quillboard;
