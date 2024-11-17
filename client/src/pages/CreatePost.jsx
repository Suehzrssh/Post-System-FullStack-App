import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import '../scss/CreatePost.scss';
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';

const CreatePost = () => {

  const navigate = useNavigate();

  const initialValues = {
    title: "",
    posttext: "",
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3).max(30).required(),
    posttext: Yup.string().required("post is a required field"),
  });

  const onSubmit = async (data) => {
    await Axios.post('http://localhost:8080/posts', data, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res) => {
      navigate('/');
    });
  }
  return (
    <motion.div
    initial={{ scale:.5}}
    animate={{ scale:1}}
    transition={{duration: .5}}
     className='createPost'>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className='form'>
          <h2>Create a Post</h2>
          <div className="item">
            <label htmlFor="title">Title: </label>
            <ErrorMessage name="title" component="span" className="error"/>
            <Field
            className="inp"
            id="title"
            name="title"
            autoComplete="off"
            placeholder='Enter the title of the post...'
             />
          </div>

          <div className="item">
            <label htmlFor="posttext">Post: </label>
            <ErrorMessage name="posttext" component="span" className="error"/>
            <Field
            className="inp"
            id="posttext"
            name="posttext"
            autoComplete="off"
            placeholder='Enter the post...'
             />
          </div>
          <button type='submit'>create the post</button>
        </Form>
      </Formik>
    </motion.div>
  )
}

export default CreatePost;