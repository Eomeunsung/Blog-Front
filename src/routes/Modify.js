import React, {useEffect, useState} from 'react';
import {formats, toolbarOptions} from "../editor/ToobarOption";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import {BiSolidEditAlt} from "react-icons/bi";
import WriteModal from "./WriteModal";
import {useLocation} from "react-router-dom";



function Modify(props) {
    const location = useLocation();
    const data = location.state;

    const initState = {
        title: data.title,
        content: data.content,
        imgUrl:'',
    };
    let flag = false;
    const [urlimgList, setUrlimgList] = useState([]);
    const [nameImg, setNameImg] = useState([]);

    const modules = {
        toolbar: toolbarOptions.toolbar,
        imageActions: toolbarOptions.imageActions,
        imageFormats: toolbarOptions.imageFormats
    };

    const [modal,setModal] = React.useState(false);
    const [blog, setBlog] = useState({...initState});
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
            console.log("이미지 이름들 "+blog["imgUrl"]);
        }
    }, [nameImg]); // urlimgList가 변경될 때마다 실행됨

    function changeImg() {
        const gainSource = /<img[^>]*src\s*=\s*['"]([^'"]+)['"][^>]*>/g;

        let match;
        let updatedContent = blog["content"];
        const newUrlimgList = []; // 새로운 이미지 URL 리스트
        const newNameimg = [];
        while ((match = gainSource.exec(blog["content"])) != null) {
            const base64 = match[1];
            if (base64.startsWith("data:image") && base64.includes(";base64,")) {
                const byteString = atob(base64.split(",")[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ia], { type: "image/png" });
                // const blobUrl = URL.createObjectURL(blob); // Blob URL 생성
                const uniqueFileName = `${crypto.randomUUID()}.png`;
                const urlName = `${process.env.REACT_APP_URL}/${uniqueFileName}`;
                console.log("urlName "+urlName);
                const file = new File([blob], uniqueFileName, {type: "image/png"});
                updatedContent = updatedContent.replace(base64, urlName);
                newUrlimgList.push(file);
                newNameimg.push(urlName);
            }
        }
        setUrlimgList((prevList) => [...prevList, ...newUrlimgList]);
        setNameImg((prevList) => [...prevList, ...newNameimg]);
        blog["content"] = updatedContent
        flag = true;
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
                    changeImg();
                    setModal(flag); // 모달 열기
                }}
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
            {modal && (
                <WriteModal blog={blog} closeModal={handleCloseModal} urlimgList={urlimgList} />
            )}
        </div>
    );
}

export default Modify;