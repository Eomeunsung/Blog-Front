import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './../css/Write.css';
import { writeBlog } from "./../api/BlogApi";
import { BiSolidEditAlt } from "react-icons/bi";
import WriteModal from "./WriteModal";

const initState = {
    title: '',
    content: '',
    imgUrl: '',
};

function Write(props) {
    const [blog, setBlog] = useState({ ...initState });
    const [result, setResult] = useState(false); // 모달 열림 상태 관리

    const handleChangeBlog = (e) => {
        blog[e.target.name] = e.target.value;
        setBlog({ ...blog });
    };

    const handleCloseModal = () => {
        setResult(false); // 모달 닫기
    };

    return (
        <div className="blog-input-container">
            <h2 className="mb-4">Create a New Blog Post</h2>
            <Form>
                {/* 제목 입력 */}
                <Form.Group className="mb-3" controlId="blogTitle">
                    <Form.Label>Blog Title</Form.Label>
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Enter the title"
                        className="custom-title-input"
                        onChange={handleChangeBlog}
                    />
                </Form.Group>

                {/* 본문 입력 */}
                <Form.Group className="mb-4" controlId="blogContent">
                    <Form.Label>Blog Content</Form.Label>
                    <Form.Control
                        name="content"
                        as="textarea"
                        rows={20} /* 줄 수 설정 */
                        placeholder="Write your blog post here..."
                        className="blog-textarea"
                        onChange={handleChangeBlog}
                    />
                </Form.Group>

                {/* 제출 버튼 */}
                <BiSolidEditAlt
                    onClick={() => {
                        setResult(true); // 모달 열기
                    }}
                    style={{ width: "40px", height: "40px", cursor: "pointer" }}
                />
            </Form>

            {/* 모달 표시 */}
            {result && (
                <WriteModal blog={blog} closeModal={handleCloseModal} />
            )}
        </div>
    );
}

export default Write;
