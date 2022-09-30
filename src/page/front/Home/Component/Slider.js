import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { productLink, sliderData } from "../../../../utils/Data";

const perSlider = 1;
const totalPage = [
  ...Array(Math.ceil(sliderData.length / perSlider)).keys(),
].map((item) => item + 1);

function Slider() {
  const navigate = useNavigate();
  const [sliderImage, setSliderImage] = useState({});
  const [sliderLink, setSliderLink] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const stepId = useRef(null);
  const handleOnChange = useCallback((current) => {
    const max = current * perSlider;
    const min = max - perSlider + 1;
    setSliderImage(
      ...sliderData.filter(
        (data, index) => index + 1 >= min && index + 1 <= max
      )
    );
    setSliderLink(
      ...productLink.filter(
        (data, index) => index + 1 >= min && index + 1 <= max
      )
    );
  }, []);
  const handleClickGoPage = () => {
    navigate(sliderLink.link);
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
        <img src={sliderImage.src} alt={sliderImage.id} />
        <div className="slider-link" onClick={handleClickGoPage}>
          <p>{sliderLink.title}</p>
        </div>
        <ul>
          {totalPage.map((item) => (
            <li key={item}></li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Slider;
