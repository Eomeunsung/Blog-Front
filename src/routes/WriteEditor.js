import ReactQuill from "react-quill";
import React, {useState} from 'react';
import {toolbarOptions, formats} from '../editor/ToobarOption'
import Form from "react-bootstrap/Form";
import { BiSolidEditAlt } from "react-icons/bi";
import WriteModal from "./WriteModal";

const initState = {
    title:'',
    content:'',
    imgUrl:'',
};

function WriteEditor(props) {

    let urlimgList; //base64 디코딩 이미지 리스트

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
    const handleChangeTitle=(e)=>{
        blog[e.target.name]=e.target.value
    }
    const handleChangeBody=(e)=>{
        blog["content"] = e;
    }

    async function changeImg(){
        urlimgList = [];
        console.log("changeImg 함수 진입");
        const gainSource = /<img[^>]*src\s*=\s*['"]([^'"]+)['"][^>]*>/g;

        let match;
        let updatedContent = blog["content"];

        while((match = gainSource.exec(blog["content"]))!=null){
            const base64 = match[1];
            if (base64.startsWith("data:image") && base64.includes(";base64,")) {
                const byteString = atob(base64.split(",")[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ia], {type: "image/png"});
                const blobUrl = URL.createObjectURL(blob); // Blob URL 생성
// 기존 Base64 데이터를 Blob URL로 교체
                updatedContent = updatedContent.replace(base64, blobUrl);
                urlimgList.push(blobUrl);
            }
        }
        blog["content"] = updatedContent;


    }
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "5px" }}>
            {/* Title Input */}
            <Form.Control
                name="title"
                type="text"
                placeholder="제목 입력"
                className="custom-title-input"
                onChange={handleChangeTitle}
                style={{width: "100%", marginTop:"20px"}}
            />

            {/* ReactQuill Editor */}
            <ReactQuill
                name="content"
                modules={modules}
                formats={formats}
                placeholder={"내용을 입력하세요..."}
                onChange={handleChangeBody}
            />
            {/* 제출 버튼 */}
            <BiSolidEditAlt
                onClick={() => {
                    setModal(true); // 모달 열기
                    changeImg();
                }}
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
            {modal && (
                <WriteModal blog={blog} closeModal={handleCloseModal} urlimgList={urlimgList} />
            )}
        </div>
    );
}

export default WriteEditor;