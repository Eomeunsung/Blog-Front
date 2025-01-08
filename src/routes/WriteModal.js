import React, {useEffect} from "react";
import './../css/Modal.css';
import {imgUpload, writeBlog} from "./../api/BlogApi";
import {useNavigate} from "react-router-dom";

const WriteModal = ({ blog, closeModal, urlimgList  }) => {
    const navigate = useNavigate();
    const formData = new FormData();

    console.log("폼데이터 사이즈 "+urlimgList.length)
    if(urlimgList.length > 0){
        urlimgList.forEach((file) => {
            formData.append("files", file); // 여러 개의 파일 추가
        });
        console.log("폼데이터 리스트 "+formData.getAll("files"));

    }


    const handleAdd = async () => {
        await writeBlog(blog);
        await imgUpload(formData);
        navigate("/")
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
