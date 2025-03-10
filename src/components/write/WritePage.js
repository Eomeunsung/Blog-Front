import ReactQuill from "react-quill";
import React, { useEffect, useState } from "react";
import { formats } from "../../config/quill/editor/ToobarOption";
import Form from "react-bootstrap/Form";
import { BiSolidEditAlt } from "react-icons/bi";
import WriteModal from "./WriteModal";
import { changeImg } from "../../config/ChangeImg";
import { modules } from "../../config/moudle/QuillModules";
import { initState } from "../../config/initState";
import "../../css/Write.css"; // 추가된 CSS 파일
import { IoSend } from "react-icons/io5";

function WritePage(props) {
    let flag = false;
    const [urlimgList, setUrlimgList] = useState([]);
    const [nameImg, setNameImg] = useState([]);
    const [modal, setModal] = React.useState(false);
    const [blog, setBlog] = useState({ ...initState });

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleChangeTitle = (e) => {
        blog[e.target.name] = e.target.value;
    };

    const handleChangeBody = (e) => {
        blog["content"] = e;
    };

    useEffect(() => {
        if (urlimgList.length > 0) {
            blog["imgUrl"] = nameImg;
            console.log("이미지 이름들 " + blog["imgUrl"]);
        }
    }, [nameImg]);

    const handleChangeImg = () => {
        const { updatedContent, newUrlimgList, newNameimg } = changeImg(blog["content"]);
        setUrlimgList((prevList) => [...prevList, ...newUrlimgList]);
        setNameImg((prevList) => [...prevList, ...newNameimg]);
        blog["content"] = updatedContent;
        flag = true;
    };

    return (
        <div>
            {/* Title Input */}
            <div className="write-container">
                <Form.Control
                    name="title"
                    type="text"
                    placeholder="제목을 입력하세요..."
                    className="custom-title-input"
                    onChange={handleChangeTitle}
                />

                {/* ReactQuill Editor */}
                <ReactQuill
                    name="content"
                    modules={modules}
                    formats={formats}
                    placeholder="내용을 입력하세요..."
                    onChange={handleChangeBody}
                    className="blog-textarea"
                />
            </div>

            {/* 제출 버튼 */}
            <IoSend
                onClick={() => {
                    handleChangeImg();
                    setModal(flag);
                }}
                className="submit-icon"
            />

            {modal && <WriteModal blog={blog} closeModal={handleCloseModal} urlimgList={urlimgList} />}
        </div>
    );
}

export default WritePage;
