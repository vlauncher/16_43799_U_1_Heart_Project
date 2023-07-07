import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../features/Slices/authSlice';

const Verification = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyEmail({ uid, token }));
  }, [dispatch, uid, token]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Email verified successfully.</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Verification;
