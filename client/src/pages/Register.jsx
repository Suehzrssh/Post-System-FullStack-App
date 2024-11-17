import React from 'react';
import Axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import '../scss/Register.scss';

const Register = () => {

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: ""
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required()
  });

  const onSubmit = async (data) => {
    await Axios.post('http://localhost:8080/auth/register', data).then((res) => {
      navigate('/signin');
    });
  }
  return (
    <motion.div
    initial={{x: 200,}}
    animate={{x: 0}}
    transition={{duration: .5}}
     className='registerPage'>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className='form'>
          <h2>Create an Account</h2>
          <div className="item">
            <label htmlFor="username">Username: </label>
            <ErrorMessage name="username" component="span" className="error"/>
            <Field
            className="inp"
            id="username"
            name="username"
            autoComplete="off"
            placeholder='Enter the the username...'
             />
          </div>

          <div className="item">
            <label htmlFor="password">Password: </label>
            <ErrorMessage name="password" component="span" className="error"/>
            <Field
            className="inp"
            id="password"
            name="password"
            autoComplete="off"
            type="password"
            placeholder='Enter the password...'
             />
          </div>
          <button type='submit'>sign up</button>
        </Form>
      </Formik>
    </motion.div>
  )
}

export default Register