import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../config/api';
import Loading from '../components/Loading';

const ViewUrl = () => {
  const [urlData, setUrlData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('user-token');

  const geturlData = () => {
    fetch(`${API}/url`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUrlData(data))
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
        <div className='urls-container'>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>SlNo.</th>
                  <th scope='col'>URL</th>
                  <th scope='col'>Shortified URL</th>
                  <th scope='col'>Views</th>
                </tr>
              </thead>
              <tbody>
                {urlData?.map(({ url, shortURL, views }, index) => (
                  <tr key={url}>
                    <td>{index + 1}</td>
                    <td>{url}</td>
                    <td>{`${API}/url/${shortURL}`}</td>
                    <td>{views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUrl;
