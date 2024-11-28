import React, { useState } from 'react';
import './../css/Detail.css';
import DeleteModal from "./DeleteModal";

function Detail(props) {
    const [deleteIs, setDeleteIs] = useState(false);
    const handleCloseModal = () => {
        setDeleteIs(false);
    }
    return (
        <div className={`blog-detail ${props.isHidingDetail ? "hide" : ""}`}>
            <div className="content">
                <h1>{props.value.title}</h1>
                <p>{props.value.content}</p>
                <button className="close-button" onClick={props.onClose}>
                    Close
                </button>
                <button className="close-button" onClick={()=>{setDeleteIs(true)}}>
                    Delete
                </button>
            </div>
            {
                deleteIs && (<DeleteModal blogId={props.value.id} deleteIs={handleCloseModal}/>)
            }

        </div>
    );
}

export default Detail;
