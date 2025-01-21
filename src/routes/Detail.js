import React, { useState } from 'react';
import './../css/Detail.css';
import DeleteModal from "./DeleteModal";
import 'react-quill/dist/quill.snow.css';  // Quill 기본 스타일
import Modify from "./Modify";
import {useNavigate} from "react-router-dom";

function Detail(props) {
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

    return (
        <div className={`blog-detail ${props.isHidingDetail ? "hide" : ""}`}>
            <div className="content">
                <h1>{props.value.title}</h1>
                <p dangerouslySetInnerHTML={{__html: props.value.content}}
                   style={{whiteSpace: 'pre-line'}}></p>
                <button className="close-button" onClick={props.onClose}>
                    Close
                </button>
                <button className="close-button" onClick={() => {
                    setDeleteIs(true)
                }}>
                    Delete
                </button>
                <button className="close-button" onClick={() => {
                    navigate('/modify', {state: data});
                }}>
                    Modify
                </button>
            </div>
            {
                deleteIs && (<DeleteModal blogId={props.value.id} deleteIs={handleCloseModal} handleRenewal={props.handleRenewal}/>)
            }
            {
                showModify && (<Modify data={data}/>)
            }

        </div>
    );
}

export default Detail;
