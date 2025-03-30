import React from "react";
import '../../css/Modal.css';
import {imgUpload, writeBlog} from "../../api/BlogApi";
import {useNavigate} from "react-router-dom";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

const WriteModal = ({ blog, closeModal, urlimgList  }) => {
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
        // console.log("데이터 보낵기 "+blog.imgUrl+" "+blog.title+" "+blog.content)
        await writeBlog(blog)
            .then((result)=>{
            navigate("/myprofile")
        })
            .catch((err)=>{
                console.log("에러 "+err)
                localStorage.removeItem("jwt");
                localStorage.removeItem("name");
                localStorage.removeItem("email")
                alert("로그인 다시 진행해주십시오");
                navigate("/login")
            })

        closeModal(); // 모달 닫기
    };



    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="basic-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">게시물 올리시겠습니까?</h2>
                <div className="modal-buttons">
                    <button
                        className="modal-button modal-confirm"
                        onClick={handleAdd}
                    >
                        {/*<IoMdAdd/>*/}
                        O
                    </button>
                    <button
                        className="modal-button modal-cancel"
                        onClick={closeModal} // X 버튼 클릭 시 모달 닫기
                    >
                        {/*<RiSubtractFill/>*/}
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteModal;
