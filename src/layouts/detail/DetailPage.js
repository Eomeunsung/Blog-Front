import React, { useEffect, useState } from 'react';
import '../../css/Detail.css';
import DeleteModal from "./DeleteModal";
import 'react-quill/dist/quill.snow.css';  // Quill 기본 스타일
import ModifyPage from "../modify/ModifyPage";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { getDetailBlog } from "../../api/BlogApi";

function DetailPage(props) {
    console.log("블로그 아이디 "+props.value)
    const navigate = useNavigate();
    const [deleteIs, setDeleteIs] = useState(false);
    const [blogData, setBlogData] = useState({
        id: "",
        title: "",
        content: "",
        comments: []
    });
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]); // 댓글 목록 저장

    const handleCloseModal = () => {
        setDeleteIs(false);
    };

    // Fetch blog details when component mounts
    useEffect(() => {
        getDetailBlog(props.value)
            .then((res) => {
                console.log("불러오기 성공 "+res)

                // const { title, content, comment } = res.data;
                // setBlogData({ title, content, comments: comment || [] }); // Set blog data
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.value]); // Ensure it triggers on `props.value` change

    // 댓글 관리
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment) {
            setComments([...comments, comment]);
            setComment('');
        }
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
                        <button className="close-button" onClick={() => setDeleteIs(true)}>
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
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="댓글을 입력하세요"
                        rows="4"
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}
                    />
                    <button type="submit" className="comment-submit-button">댓글 남기기</button>
                </form>

                {/* 댓글 목록 */}
                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((c, index) => (
                            <div key={index} className="comment">
                                <p>{c}</p>
                            </div>
                        ))
                    ) : (
                        <p>댓글이 없습니다.</p>
                    )}
                </div>
            </div>

            {deleteIs && (
                <DeleteModal
                    blogId={blogData.id}
                    deleteIs={handleCloseModal}
                    handleRenewal={props.handleRenewal}
                    handleLayout={props.handleLayout}
                />
            )}
        </div>
    );
}

export default DetailPage;
