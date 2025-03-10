import React, { useEffect, useState } from 'react';
import '../../css/Detail.css';
import DeleteModal from "../delete/DeleteModal";
import 'react-quill/dist/quill.snow.css';  // Quill 기본 스타일
import ModifyPage from "../modify/ModifyPage";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { getDetailBlog, commentWrite } from "../../api/BlogApi";

function DetailPage(props) {

    const navigate = useNavigate();
    const [deleteIs, setDeleteIs] = useState(false);
    const [blogData, setBlogData] = useState({
        blogId:0,
        title: "",
        content: "",
        createAt:"",
        comments: []
    });
    const [comment, setComment] = useState('');
    const [commentFlag, setCommentFlag] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleDelete = (id) =>{
        console.log("삭제할 블로그 아이디 "+id)
        setDeleteId(id);
        setDeleteIs(!deleteIs);
    }

    const handleCloseModal = () => {
        setDeleteIs(false);
    };

    // Fetch blog details when component mounts
    useEffect(() => {
        if(props.value!=0){
            // console.log("블로그 아이디 "+props.value)
            getDetailBlog(props.value)
                .then((res) => {
                    console.log("디테일 받은 데이터 "+JSON.stringify(res));
                    setBlogData(res)
                    // console.log("성공 "+JSON.stringify(res))
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }, [props.value, commentFlag]); // Ensure it triggers on `props.value` change

    // 댓글 관리
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentWrite = () => {
        if (!comment.trim()) { // ✅ 댓글이 비어있을 경우 체크
            alert("댓글을 입력해 주세요.");
            return;
        }

        const commentData = {
            blogId: props.value,
            content: comment,
        };

        commentWrite(commentData)
            .then((res) => {
                setCommentFlag(!commentFlag);
                setComment(''); // 입력창 초기화
            })
            .catch((err) => {
                if(err===401){
                    alert("로그인 후 가능 합니다.");
                    window.location.href="/login";
                }
                // console.log(JSON.stringify(err))
            });
    };


    // Modify blog navigation
    const handleModifyClick = () => {
        navigate('/modify', { state: blogData });
    };

    return (
        <div className={`blog-detail ${props.isHidingDetail ? "hide" : ""}`}>
            <div className="content">
                <h1>{blogData.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: blogData.content }} style={{ whiteSpace: 'pre-line' }}></p>
                <button className="close-button" onClick={props.onClose}>
                    <IoMdCloseCircleOutline />
                </button>
                {props.deleteBlog ? (
                    <>
                        <button className="close-button" onClick={() => handleDelete(blogData.blogId)}>
                            <MdDelete />
                        </button>
                        <button className="close-button" onClick={handleModifyClick}>
                            <FiEdit3 />
                        </button>
                    </>
                ) : (
                    <></>
                )}
            </div>

            {/* 댓글 창 */}
            <div className="comment-section">
                <h3>댓글</h3>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="댓글을 입력하세요"
                    rows="4"
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}
                />
                <button className="comment-submit-button" onClick={()=>{handleCommentWrite()}}>댓글 남기기</button>

                {/* 댓글 목록 */}
                <div className="comments-list">
                    {(blogData.comments ?? []).length > 0 ?(
                        blogData.comments
                            .sort((a, b) => b.id - a.id) // ID를 기준으로 내림차순 정렬
                            .map((c, index) => (
                                <div key={index} className="comment-card">
                                    <div className="comment-header">
                                        <span className="comment-author">{c.name}</span>
                                        <span className="comment-date">{c.createAt}</span>
                                    </div>
                                    <p className="comment-content">{c.content}</p>
                                </div>
                            ))
                    ) : (
                        <p className="no-comments">댓글이 없습니다.</p>
                    )}
                </div>


            </div>

            {deleteIs && (
                <DeleteModal
                    blogId={deleteId}
                    deleteIs={handleCloseModal}
                    handleRenewal={props.handleRenewal}
                    onClose={props.onClose}
                />
            )}
        </div>
    );
}

export default DetailPage;
