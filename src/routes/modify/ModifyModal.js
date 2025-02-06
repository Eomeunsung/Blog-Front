import React from 'react';
import {useNavigate} from "react-router-dom";
import {blogUpdate, imgUpload} from "../../api/BlogApi";

function ModifyModal({ blog, closeModal, urlimgList  }) {
    const navigate = useNavigate();
    const formData = new FormData();
    if(urlimgList.length > 0){
        urlimgList.forEach((file) => {
            formData.append("files", file); // 여러 개의 파일 추가
        });
    }
    console.log("데이터 보낵기 전 "+blog.imgUrl+" "+blog.title+" "+blog.content)
    const handleAdd = async () => {
        if(urlimgList.length > 0){
            const imgurl = await imgUpload(formData)
            blog.imgUrl = imgurl;
        }
        await blogUpdate(blog)
        navigate("/")
        closeModal(); // 모달 닫기
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">게시물 수정하시겠습니까?</h2>
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
}

export default ModifyModal;