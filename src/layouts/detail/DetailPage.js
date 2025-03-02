import React, { useState } from 'react';
import '../../css/Detail.css';
import DeleteModal from "./DeleteModal";
import 'react-quill/dist/quill.snow.css';  // Quill 기본 스타일
import ModifyPage from "../modify/ModifyPage";
import {useNavigate} from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";

function DetailPage(props) {
    const navigate = useNavigate();
    const [deleteIs, setDeleteIs] = useState(false);
    const handleCloseModal = () => {
        setDeleteIs(false);
    }

    const data = {
        id:props.value.id,
        title: props.value.title,
        content: props.value.content,
    }
    const [showModify, setShowModify] = useState(false);
    console.log("받은 아이디 "+props.value.id)

    return (
        <div className={`blog-detail ${props.isHidingDetail ? "hide" : ""}`}>
            <div className="content">
                <h1>{props.value.title}</h1>
                <p dangerouslySetInnerHTML={{__html: props.value.content}}
                   style={{whiteSpace: 'pre-line'}}></p>
                <button className="close-button" onClick={props.onClose}>
                    <IoMdCloseCircleOutline />
                </button>
                {props.deleteBlog ? (
                    <>
                        <button className="close-button" onClick={() => {
                            setDeleteIs(true)
                        }}>
                            <MdDelete />
                        </button>
                        <button className="close-button" onClick={() => {
                            navigate('/modify', {state: data});
                        }}>
                            <FiEdit3 />
                        </button>
                    </>
                ):(
                    <></>
                )}


            </div>
            {
                deleteIs && (<DeleteModal blogId={props.value.id} deleteIs={handleCloseModal} handleRenewal={props.handleRenewal} handleLayout={props.handleLayout}/>)
            }
            {
                showModify && (<ModifyPage data={data}/>)
            }

        </div>
    );
}

export default DetailPage;
