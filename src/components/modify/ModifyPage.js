import React, {useEffect, useState} from 'react';
import {formats} from "../../config/quill/editor/ToobarOption";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import {BiSolidEditAlt} from "react-icons/bi";
import {useLocation} from "react-router-dom";
import ModifyModal from "./ModifyModal";
import {changeImg} from "../../config/ChangeImg";
import {modules} from "../../config/moudle/QuillModules";
import {initState} from "../../config/initState";

function ModifyPage(props) {
    const location = useLocation();
    const data = location.state;

    const [modifiedState, setModifiedState] = useState({
        ...initState, // 기존 기본값 복사
        id: data.id,
        title: data.title,
        content: data.content,
    });

    let flag = false;
    const [urlimgList, setUrlimgList] = useState([]);
    const [nameImg, setNameImg] = useState([]);

    const [modal,setModal] = React.useState(false);
    const [blog, setBlog] = useState({...modifiedState});
    const handleCloseModal = () => {
        setModal(false); // 모달 닫기
    };

    const handleChangeTitle = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleChangeBody = (value) => {
        setBlog({ ...blog, content: value });
    };

    useEffect(() => {
        if (urlimgList.length > 0) {
            blog["imgUrl"] = nameImg;
        }
    }, [nameImg]); // urlimgList가 변경될 때마다 실행됨


    const handleChangeImg=()=>{
        const {updatedContent, newUrlimgList, newNameimg} = changeImg(blog["content"])
        setUrlimgList((prevList) => [...prevList, ...newUrlimgList]);
        setNameImg((prevList) => [...prevList, ...newNameimg]);
        blog["content"] = updatedContent;
        flag = true
    }


    return (
        <div style={{display: "flex", flexDirection: "column", gap: "5px" }}>
            {/* Title Input */}
            <Form.Control
                name="title"
                type="text"
                placeholder="제목 입력"
                className="custom-title-input"
                value = {blog.title}
                onChange={handleChangeTitle}
                style={{width: "100%", marginTop:"20px"}}
            />

            {/* ReactQuill Editor */}
            <ReactQuill
                name="content"
                modules={modules}
                formats={formats}
                value={blog.content}
                placeholder={"내용을 입력하세요..."}
                onChange={handleChangeBody}
            />
            {/* 제출 버튼 */}
            <BiSolidEditAlt
                onClick={() => {
                    handleChangeImg();
                    setModal(flag); // 모달 열기
                }}
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
            {modal && (
                <ModifyModal blog={blog} closeModal={handleCloseModal} urlimgList={urlimgList} />
            )}
        </div>
    );
}

export default ModifyPage;