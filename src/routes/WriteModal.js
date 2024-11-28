import React from "react";
import './../css/Modal.css';
import { writeBlog } from "./../api/BlogApi";

const WriteModal = ({ blog, closeModal }) => {

    const handleAdd = () => {
        writeBlog(blog);
        closeModal(); // 모달 닫기
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">게시물 올리시겠습니까?</h2>
                <div className="modal-buttons">
                    <button
                        className="modal-button modal-confirm"
                        onClick={handleAdd}
                    >
                        O
                    </button>
                    <button
                        className="modal-button modal-cancel"
                        onClick={closeModal} // X 버튼 클릭 시 모달 닫기
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteModal;
