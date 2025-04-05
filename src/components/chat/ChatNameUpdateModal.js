import React, {useState} from 'react';
import "./../../css/chat/ChatNameUpdate.css"
import {chatNameUpdate} from "./../../api/ChatApi";

function ChatNameUpdateModal({data, onClose}) {
    const init ={
        id: data.id,
        name: ""
    }

    const [newName, setNewName] = useState("");
    const [error, setError] = useState(null);
    const handleNameUpdateApi = () =>{
        if(newName==="" || newName===null){
            setError("이름을 입력해 주세요")
            return
        }
        init.name = newName;
        chatNameUpdate(init)
            .then((res)=>{
                console.log("방 수정 응답 "+res.code)
                if(res.code===200  || res.status === 200){
                    onClose();
                }
            })
            .catch((err)=>{

            })
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>채팅방 이름 수정</h3>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={data.name}
                />
                <div className="modal-buttons">
                    <button onClick={()=>{handleNameUpdateApi()}}>저장</button>
                    <button onClick={onClose}>취소</button>
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}

export default ChatNameUpdateModal;