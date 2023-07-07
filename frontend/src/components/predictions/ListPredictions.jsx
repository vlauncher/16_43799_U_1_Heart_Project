import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPredictions } from '../../features/Slices/predictionSlice';
import { Link } from 'react-router-dom'

const ListPredictions = () => {
  const dispatch = useDispatch();
  const predictions = useSelector((state) => state.prediction.predictions);
  const loading = useSelector((state) => state.prediction.loading);

  useEffect(() => {
    dispatch(fetchPredictions());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
     <div>
      <h2>Results</h2>
      <table className="table" style={{ marginTop: "50px" }}>
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Age</th>
            <th scope="col">Sex</th>
            <th scope="col">Cp</th>
            <th scope="col">Thalach</th>
            <th scope="col">Exang</th>
            <th scope="col">Oldpeak</th>
            <th scope="col">Slope</th>
            <th scope="col">Ca</th>
            <th scope="col">Thal</th>
            <th scope="col">Results</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.age}</td>
              <td>{item.sex}</td>
              <td>{item.cp}</td>
              <td>{item.thalach}</td>
              <td>{item.exang}</td>
              <td>{item.oldpeak}</td>
              <td>{item.slope}</td>
              <td>{item.ca}</td>
              <td>{item.thal}</td>
              <td>{item.result}</td>
              <td><Link className='btn btn-primary' to={`/result/${item.id}`}>View Prediction</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
};

export default ListPredictions;
