import React from "react";
import '../../css/Modal.css';
import { deleteBlog } from "../../api/BlogApi";

const DeleteModal = ({ blogId, deleteIs, handleRenewal}) => {

    const handleAdd = async () => {
        await deleteBlog(blogId);
        handleRenewal()

        deleteIs(); // 모달 닫기
    };

    return (
        <div className="modal-overlay" onClick={deleteIs}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">게시물 삭제하시겠습니까?</h2>
                <div className="modal-buttons">
                    <button
                        className="modal-button modal-confirm"
                        onClick={handleAdd}
                    >
                        O
                    </button>
                    <button
                        className="modal-button modal-cancel"
                        onClick={deleteIs} // X 버튼 클릭 시 모달 닫기
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
