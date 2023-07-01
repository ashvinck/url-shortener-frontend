import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthCard from '../components/AuthCard';
import { API } from '../config/api';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

// Formik Validation for React Input for firstName,email,password & confirmPassword
const formValidationSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'Please enter a valid firstName')
    .required('Please enter your First Name'),
  lastName: yup.string().required('Please enter your First Name'),
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

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

// Main Function

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Formik function to handleSubmit
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: (newUser, { resetForm }) => {
      // console.log('onsubmit', newUser);
      createUser(newUser, { resetForm });
    },
  });

  // Fetch to POST data to API and display response through React Toastify
  const createUser = (newUser, { resetForm }) => {
    setLoading(true);
    // Fetch to POST data to API and display response
    fetch(`${API}/auth/signup`, {
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
            {/* Toastify */}
            <form onSubmit={formik.handleSubmit} className='form'>
              {/* Register */}
              <div className='row g-1'>
                <div className='form-floating col-md-6'>
                  <input
                    type='text'
                    className='form-control'
                    id='firstName'
                    placeholder='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className='error'>
                    {formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : ''}
                  </p>
                  <label className='form-label'>First Name</label>
                </div>
                <div className='form-floating col-md-6'>
                  <input
                    type='text'
                    className='form-control'
                    id='lastName'
                    placeholder='Last Name'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className='error'>
                    {formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : ''}
                  </p>
                  <label className='form-label'>Last Name</label>
                </div>
                <div className='form-floating col-12'>
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
                <div className='form-floating col-12'>
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
                <div className='form-floating col-12'>
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
              </div>
              <div className='col-12 d-block mx-auto'>
                <button type='submit' className='button1'>
                  Sign up
                </button>
              </div>
              <h6>
                <Link to='/'>Already have an account?</Link>
              </h6>
            </form>
          </div>
        </AuthCard>
      )}
    </>
  );
};

export default Register;
