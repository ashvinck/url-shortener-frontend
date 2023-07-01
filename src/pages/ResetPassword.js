import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/api';
import Loading from '../components/Loading';
import AuthCard from '../components/AuthCard';

// Formik Validations for React Input for password & confirmPassword
const formValidationSchema = yup.object({
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

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords doesnot match'),
});

const ResetPassword = () => {
  const { _id, token } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const navigate = useNavigate();

  // Fetch data from API to check if user exists
  const getInfo = () => {
    fetch(`${API}/auth/reset-password/${_id}/${token}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    getInfo();
  }, []);

  // Formik function to handleSubmit
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: (reset, { resetForm }) => {
      // console.log('onsubmit', reset);
      resetpassword(reset, resetForm);
    },
  });

  // Fetch to POST data to API and display response through React Toastify
  const resetpassword = (reset, { resetForm }) => {
    fetch(`${API}/auth/reset-password/${_id}/${token}`, {
      method: 'POST',
      body: JSON.stringify(reset),
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
      .catch((error) => {
        // Catch the error thrown above
        setLoading(false);
        const errorMessage =
          error?.message || 'An error occurred during registration.';
        toast.error(errorMessage);
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
            <form onSubmit={formik.handleSubmit} className='form'>
              <p>Reset Password for {data.email}</p>
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
              <div className='form-floating'>
                <input
                  type='confirmPassword'
                  className='form-control'
                  id='confirmPassword'
                  placeholder='Confirm Password'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className='error'>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : ''}
                </p>
                <label>Confirm Password</label>
              </div>
              <button type='submit' className='button1'>
                Reset Password
              </button>
            </form>
          </div>
        </AuthCard>
      )}
    </>
  );
};

export default ResetPassword;
