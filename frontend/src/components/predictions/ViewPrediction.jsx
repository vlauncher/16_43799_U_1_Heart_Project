import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePrediction, printPrediction } from '../../features/Slices/predictionSlice';
import { useParams } from 'react-router-dom';

import "../../StyleSheet/prediction.scss";
import "../../StyleSheet/result.scss";
// import Vector from "../../Assets/Vector.png";

const ViewPrediction = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singlePrediction = useSelector(
    (state) => state.prediction.singlePrediction
  );
  const loading = useSelector((state) => state.prediction.loading);

  useEffect(() => {
    dispatch(fetchSinglePrediction(id));
    console.log(id)
  }, [dispatch, id]);

  const handlePrint = () => {
    dispatch(printPrediction(id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
      <div className="sign-up">
        <div className="containerR">
          <h1 className="sign-in-up-header text-center">Result Slip</h1>
          <p className="text-center p-one">Below is the result of the prediction <br /> Click the print button below to print out the slip</p>

          <div>
            {singlePrediction && (<>
              <div className="result-field">
                <h4 className="form-text">Age     : </h4>
                <h4>{singlePrediction.age}</h4>
              </div>
              <div className="result-field">
                <h4 className="form-text">Sex : </h4>
                <h4>{singlePrediction.sex}</h4>
              </div>
              <div className="result-field">
                <h4 className="form-text">Cp : </h4>
                <h4>{singlePrediction.cp}</h4>
              </div>
              <div className="result-field">
                <h4 className="form-text">Thalach : </h4>
                <h4>{singlePrediction.thalach}</h4>
              </div>
              <div className="result-field">
                <h4 className="form-text">Exang : </h4>
                <h4>{singlePrediction.exang}</h4>
              </div>
              <div className="result-field">
                <h4 className="form-text">Oldpeak : </h4>
                <h4>{singlePrediction.oldpeak}</h4>
              </div>
              <div className="result-field">
                <h4 className="form-text">Slope : </h4>
                <h4>{singlePrediction.slope}</h4>
              </div>
              <div className="result-field">
                <h4 className="form-text">CA : </h4>
                <h4>{singlePrediction.ca}</h4>
              </div>
              <div className="result-field">
                <h4 className="form-text">Thal : </h4>
                <h4>{singlePrediction.thal}</h4>
              </div>
              <div className="field">
                <h4 className="">{singlePrediction.result}</h4>
              </div>
            </>)}

            <div className="submit">
              <button className="btn btn-primary" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewPrediction;

