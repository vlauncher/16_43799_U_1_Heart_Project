import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPrediction } from "../../features/Slices/predictionSlice";
import Spinner from "../../layouts/Spinner";
// import "../Sign-in/sign-in.scss";
import "../../StyleSheet/prediction.scss";
import { toast } from "react-toastify";

const CreatePrediction = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: ""
  });

  const {
    age,
    sex,
    cp,
    thalach,
    exang,
    oldpeak,
    slope,
    ca,
    thal
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { predictions, loading, error, isSuccess } = useSelector(
    (state) => state.prediction
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/results");
    }

  }, [predictions, error, loading, isSuccess, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(isSuccess){
      toast.success("Prediction Created")
    }
    const userData = {
      age,
      sex,
      cp,
      thalach,
      exang,
      oldpeak,
      slope,
      ca,
      thal
    };

    dispatch(createPrediction(userData));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="background">
      <div className="sign-up">
        <div className="containerp">
          <h1 className="sign-in-up-header text-center">Prediction Form</h1>
          <p className="text-center p-one">Fill in the required information <br /> Click the submit button below after filling the form</p>

          <form onSubmit={onSubmit}>
            <div className="input-field">
              <h4 className="form-text">Age</h4>
              <input type="number" name="age" placeholder="" value={age}
                onChange={onChange} />
            </div>
            <div className="input-field">
              <h4 className="form-text">Sex</h4>
              <input type="text" name="sex" placeholder="" value={sex}
                onChange={onChange} />
            </div>
            <div className="input-field">
              <h4 className="form-text">Cp</h4>
              <input type="number" name="cp" placeholder="" value={cp}
                onChange={onChange} />
            </div>
            <div className="input-field">
              <h4 className="form-text">Thalach</h4>
              <input type="number" name="thalach" placeholder="" value={thalach}
                onChange={onChange} />
            </div>
            <div className="input-field">
              <h4 className="form-text">Exang</h4>
              <input type="number" name="exang" placeholder="" value={exang}
                onChange={onChange} />
            </div>
            <div className="input-field">
              <h4 className="form-text">Oldpeak</h4>
              <input type="number" name="oldpeak" placeholder="" value={oldpeak}
                onChange={onChange} />
            </div>
            <div className="input-field">
              <h4 className="form-text">Slope</h4>
              <input type="number" name="slope" placeholder="" value={slope}
                onChange={onChange} />
            </div>
            <div className="input-field">
              <h4 className="form-text">Ca</h4>
              <input type="number" name="ca" placeholder="" value={ca}
                onChange={onChange} />
            </div>
            <div className="input-field">
              <h4 className="form-text">Thal</h4>
              <input type="number" name="thal" placeholder="" value={thal}
                onChange={onChange} />
            </div>
            <div className="submit">
              <input type="submit" name="submit" value="Predict" />
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CreatePrediction;
