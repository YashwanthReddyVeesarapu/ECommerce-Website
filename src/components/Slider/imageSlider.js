import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
//import { FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';
import "./styles.scss";

const ImageSlider = ({ data, color }) => {
  const [current, setCurrent] = useState(0);
  const length = Object.keys(data).length;
  console.log(color);

  useEffect(() => {
    const colorIndex = Object.keys(data).indexOf(color);
    console.log(colorIndex);
    if (colorIndex !== -1) setCurrent(colorIndex);
  }, [color]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  return (
    <section className="slider">
      <ArrowLeft className="left-arrow" fontSize="large" onClick={prevSlide} />
      <ArrowRight
        className="right-arrow"
        fontSize="large"
        onClick={nextSlide}
      />
      {Object.values(data).map((url, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && <img className="image" src={url} />}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
