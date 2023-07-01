import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../config/api';
import Loading from '../components/Loading';

// Formik validation for url
const formValidationSchema = yup.object({
  url: yup
    .string()
    .url('Please enter a valid URL')
    .required('Please enter a URL'),
});

const CreateUrl = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('user-token');

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: (url, { resetForm }) => {
      createUrl(url, { resetForm });
    },
  });

  // POST request for creating URL
  const createUrl = (url, { resetForm }) => {
    setLoading(true);
    fetch(`${API}/url/createURL`, {
      method: 'POST',
      body: JSON.stringify(url),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
          navigate('/dashboard/viewURLs');
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
        <div className='create-url-wrapper d-flex justify-content-center'>
          <div className='card'>
            <div className='card-body'>
              <div className='card-title'>
                <h5>Please enter a url to shortify it.</h5>
              </div>
              <div className='form-wrapper'>
                <form className='form' onSubmit={formik.handleSubmit}>
                  {/* Login */}
                  <div className='form-floating'>
                    <input
                      type='url'
                      className='form-control'
                      id='url'
                      placeholder='Enter a url'
                      value={formik.values.url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className='error'>
                      {formik.touched.url && formik.errors.url
                        ? formik.errors.url
                        : ''}
                    </p>
                    <label>URL</label>
                  </div>
                  <button type='submit' className='button2'>
                    Create url
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUrl;
