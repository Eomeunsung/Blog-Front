import React from "react";
import '../../css/Modal.css';
import { deleteBlog } from "../../api/BlogApi";
import {useNavigate} from "react-router-dom";

const DeleteModal = ({ blogId, deleteIs, handleRenewal, handleLayout}) => {
    const navigate = useNavigate();

    const handleAdd = async () => {
        await deleteBlog(blogId)
            .then((res) => {
                console.log("삭제 성공 "+res)
                // 블로그 삭제 후 갱신
                handleRenewal(); // 블로그 삭제 후 갱신
                deleteIs(); // 모달 닫기
                handleLayout();
                // navigate("/myprofile");  // 삭제 후 프로필로 이동
            })
            .catch((err) => {
                alert("다시 시도해 주시기 바랍니다.")
            })
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
