import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../config/api';
import Loading from '../components/Loading';
import AuthCard from '../components/AuthCard';
import { useNavigate } from 'react-router-dom';

// Formik Validation Schema
const formValidationSchema = yup.object({
  email: yup
    .string()
    .min(5, 'Please enter a valid email address')
    .max(30, 'Enter an alternate email address')
    .required('Please provide a email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid format'),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: (user, { resetForm }) => {
      // console.log('onsubmit', user);
      ForgotPassword(user, { resetForm });
    },
  });

  const ForgotPassword = (user, { resetForm }) => {
    setLoading(true);
    // FETCH POST
    fetch(`${API}/auth/forgot-password`, {
      method: 'POST',
      body: JSON.stringify(user),
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
      .then((data) => {
        setLoading(false);
        toast.success(data.message);
        resetForm();
      })
      .then(() => {
        setTimeout(() => {
          navigate('/');
        }, 6000);
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
              <button type='submit' className='button2'>
                Reset Password
              </button>
            </form>
          </div>
        </AuthCard>
      )}
    </>
  );
};

export default ForgotPassword;
