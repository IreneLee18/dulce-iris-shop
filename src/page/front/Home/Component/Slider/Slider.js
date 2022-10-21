import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sliderData } from "../../../../../utils/Data";

const perSlider = 1;

function Slider() {
  const navigate = useNavigate();
  const [sliderItem, setSliderItem] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const stepId = useRef(null);
  const handleOnChange = useCallback((current) => {
    const max = current * perSlider;
    const min = max - perSlider + 1;
    setSliderItem(
      ...sliderData.filter(
        (data, index) => index + 1 >= min && index + 1 <= max
      )
    );
  }, []);
  const handleClickGoPage = () => {
    navigate(sliderItem.link);
  };
  useEffect(() => {
    handleOnChange(currentStep);
  }, [currentStep, handleOnChange]);

  // slider (2sec switch image)
  useEffect(() => {
    stepId.current = setInterval(() => {
      setCurrentStep((prev) => prev + 1);
      if (currentStep >= sliderData.length) {
        setCurrentStep(() => 1);
      }
    }, 2000);
    return () => {
      clearInterval(stepId.current);
      stepId.current = null;
    };
  }, [currentStep]);

  return (
    <>
      <div className="slider">
        <img src={sliderItem.src} alt={sliderItem.id} />
        <div className="slider-link">
          <p>{sliderItem.context}</p>
          <button onClick={handleClickGoPage}>{sliderItem.id}</button>
        </div>
      </div>
    </>
  );
}

export default Slider;
