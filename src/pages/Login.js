import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import AuthCard from '../components/AuthCard';
import { API } from '../config/api';

// Formik Validations for React Input for email & password
const formValidationSchema = yup.object({
  email: yup
    .string()
    .min(5, 'Please enter a valid email address')
    .max(30, 'Enter an alternate email address')
    .required('Please provide a email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid format'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Character limit exceeded')
    .required('Please enter your password')
    .matches(/\d/, 'Password must contain atleast one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain atleast one special character'
    ),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Formik function to handleSubmit
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: (user, { resetForm }) => {
      loginUser(user, { resetForm });
    },
  });
  // Fetch to POST data to API and display response through React Toastify
  const loginUser = (newUser, { resetForm }) => {
    setLoading(true);

    fetch(`${API}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then(({ accessToken }) => {
        resetForm();
        setLoading(false);
        if (!accessToken) {
          toast.error('Error occured.Please try again');
          return;
        }
        localStorage.clear();
        localStorage.setItem('user-token', accessToken);
        navigate('/dashboard');
      })
      .catch((errorPromise) => {
        // Handle error
        setLoading(false);
        errorPromise
          .then((errorData) => {
            // Display the error message in the toast
            const errorMessage =
              errorData?.error?.message ||
              'An error occurred during registration.';
            toast.error(errorMessage);
          })
          .catch(() => {
            // Fallback error message
            toast.error('An error occurred during registration.');
          });
      });
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <AuthCard>
          <div className='form-wrapper col'>
            {/* Toastify */}
            <form className='form' onSubmit={formik.handleSubmit}>
              {/* Login */}
              <div className='form-floating'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='name@example.com'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className='error'>
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ''}
                </p>
                <label>Email address</label>
              </div>
              <div className='form-floating'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className='error'>
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ''}
                </p>
                <label>Password</label>
              </div>
              <button type='submit' className='button2'>
                Login
              </button>
              <h6>
                <Link to='/auth/forgot-password'>Forgot Password</Link>
              </h6>
              <h6>
                <Link to='/auth/signup'>Don't have an account?</Link>
              </h6>
            </form>
          </div>
        </AuthCard>
      )}
    </>
  );
};

export default Login;
