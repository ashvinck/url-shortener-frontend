import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessImg from '../Assets/Images/BlueTick.png';
import Loading from '../components/Loading';
import AuthCard from '../components/AuthCard';
import { API } from '../config/api';

const VerifyUser = () => {
  const { email, token } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const VerifyUser = () => {
    fetch(`${API}/auth/verify-user/${email}/${token}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    VerifyUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AuthCard>
          <ToastContainer />
          <div>
            <img className='tick' src={SuccessImg} alt='VerificationImage' />
            <h6>{data?.message}</h6>
            <div className='col-6 mx-auto'>
              <Link to='/'>
                <button type='submit' className='button2'>
                  Login
                </button>
              </Link>
            </div>
          </div>
        </AuthCard>
      )}
    </>
  );
};

export default VerifyUser;
