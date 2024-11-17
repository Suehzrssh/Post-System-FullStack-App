import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Axios from 'axios';
import {Auth} from '../context/Auth';
import moment from 'moment';
import "../scss/Post.scss";

const Post = () => {
    let {id} = useParams();
    const [post, setPost] = useState({});
    const [comment, setComment] = useState([]);
    const [newComment, setNewcomment] = useState("");
    const {authState} = useContext(Auth);
    const navigate = useNavigate();
    

    useEffect(() => {
        Axios.get(`http://localhost:8080/posts/byId/${id}`).then((res) => {
            setPost(res.data);
        });

        Axios.get(`http://localhost:8080/comments/${id}`).then((res) => {
            setComment(res.data);
        });
    }, []);

    const addComment = () => {
        Axios.post('http://localhost:8080/comments', {commentBody: newComment, PostId: id}, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            if(res.data.error) {
                alert(res.data.error)
            }else {
                const commentAdd = {commentBody: newComment, username: res.data.username}
                setComment([...comment, commentAdd]);
                setNewcomment('');
            }
        });
    }

    const delComment = (id) => {
        Axios.delete(`http://localhost:8080/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(() => {
           setComment(comment.filter((value) => {
            return value.id != id
           }))
        })
    }

    const delPost = (id) => {
        Axios.delete(`http://localhost:8080/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            navigate('/');
        })
    }
  return (
    <div className='PostPage'>
        <div className="container">
        <div className="left">
            <h2>{post?.title}</h2>
            {authState.username === post.username && <button onClick={() => delPost(post.id)}>&#128465;</button>}
            <p>{post?.posttext}</p>
            <div className="postBottom">
                <h3>{moment(post?.createdAt).format("ll")}</h3>
                <h4>@{post?.username}</h4>
            </div>
        </div>

        <div className="right">
            <div className="addcomment">
                <input type="text" value={newComment} onChange={e=> setNewcomment(e.target.value)}/>
                <button onClick={addComment}>+</button>
            </div>
            <div className="commentSection">
                {comment?.map((item) => {
                    return (
                        <div className="comment" key={item.id}>
                            <p>{item?.commentBody}</p>
                            <h4>@{item?.username}</h4>
                            {authState.username == item.username && 
                            <button onClick={() => delComment(item.id)}>X</button>}
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Post;