import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../config/api';
import Loading from '../components/Loading';

const SummaryPage = () => {
  const [urlData, setUrlData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [urlsToday, setUrlsToday] = useState(0);
  const [urlsLast30Days, setUrlsLast30Days] = useState(0);
  const token = localStorage.getItem('user-token');

  const geturlData = () => {
    fetch(`${API}/url`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUrlData(data);
        const today = new Date();
        const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const urlsToday = data.filter((item) => {
          const createdOn = new Date(item.createdOn);
          return createdOn.toDateString() === today.toDateString();
        });

        const urlsLast30Days = data.filter((item) => {
          const createdOn = new Date(item.createdOn);
          return createdOn >= last30Days && createdOn <= today;
        });

        setUrlsToday(urlsToday.length);
        setUrlsLast30Days(urlsLast30Days.length);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    geturlData();
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div className='summary-container d-flex justify-content-center'>
          <div className='card'>
            <div className='card-body'>
              <div className='card-title'>
                <h4> URLs created</h4>
              </div>
              <div className='card-text'>
                <h6>URLs created today: {urlsToday}</h6>
                <h6>URLs created in the last 30 days: {urlsLast30Days}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryPage;
