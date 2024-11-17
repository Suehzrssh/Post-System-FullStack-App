import React,{useState, useEffect, useContext} from 'react';
import Axios from 'axios';
import '../scss/Home.scss';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Auth} from '../context/Auth';

const Home = () => {
  const [post, setPost] = useState();
  const [postsLike, setPostslike] = useState();
  const {authState} = useContext(Auth);
  const navigate = useNavigate();


  useEffect(() => {
    
      const bringPosts = async () => {
        await Axios.get('http://localhost:8080/posts', {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          }
        }).then((res) => {
          setPost(res.data.postsList);
          setPostslike(res.data.likedPosts.map((like) => {
            return like.PostId;
          }));
        });
      }
      bringPosts();
    
  }, [post]);

  const likePost = (postId) => {
    Axios.post('http://localhost:8080/like', {PostId:postId}, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((res) => {
      setPost(post.map((val) => {
       if(val.id === postId) {
        return {...val, Likes: [...val.Likes, 0]}
        }else {
          return val;
        }
      }))
    })
  }
  return (
    <motion.div 
    initial={{x: 0, y:0, scale: 1.3}}
    animate={{x: 0, y: 0, scale: 1}}
    transition={{duration: 1}}
    className='homePage'>
      {post?.map((item) => {
        return (
          <div className="postsList" key={item?.id}>
            <h2>{item?.title}</h2>
            <p onClick={() => navigate(`/post/${item?.id}`)}>{item?.posttext}</p>
            <div className="cardBottom">
              <h4>@{item?.username}</h4>
              <div className="rightBottom">
                <button onClick={() => likePost(item.id)}> <FavoriteIcon className={postsLike.includes(item.id) ? "unlikeBtn" : "likeBtn"}/> </button>
                <label>{item?.Likes.length}</label>
              </div>
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}

export default Home;