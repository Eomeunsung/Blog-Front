import React, { useState } from 'react';
import './../css/Detail.css';
import DeleteModal from "./DeleteModal";
import 'react-quill/dist/quill.snow.css';  // Quill 기본 스타일

function Detail(props) {
    const [deleteIs, setDeleteIs] = useState(false);
    const handleCloseModal = () => {
        setDeleteIs(false);
    }
    console.log(props.value.content)
    return (
        <div className={`blog-detail ${props.isHidingDetail ? "hide" : ""}`}>
            <div className="content">
                <h1>{props.value.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: props.value.content }}
                   style={{ whiteSpace: 'pre-line' }} ></p>
                <button className="close-button" onClick={props.onClose}>
                    Close
                </button>
                <button className="close-button" onClick={()=>{setDeleteIs(true)}}>
                    Delete
                </button>
            </div>
            {
                deleteIs && (<DeleteModal blogId={props.value.id} deleteIs={handleCloseModal} handleRenewal={props.handleRenewal}/>)
            }

        </div>
    );
}

export default Detail;
