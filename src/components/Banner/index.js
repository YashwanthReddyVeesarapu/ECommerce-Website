import React, { useState, useEffect } from "react";
import { Button, MobileStepper, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const MyCollection = [
  {
    label: "First Picture",
    imgPath:
      "https://media.geeksforgeeks.org/wp-content/uploads/20210208000010/1.png",
  },
  {
    label: "Second Picture",
    imgPath:
      "https://media.geeksforgeeks.org/wp-content/uploads/20210208000009/2.png",
  },
  {
    label: "Third Picture",
    imgPath:
      "https://media.geeksforgeeks.org/wp-content/uploads/20210208000008/3.png",
  },
];

const Banner = () => {
  const size = MyCollection.length;
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      if (index >= 0 && index < size - 1) {
        setIndex(index + 1);
      }
    }, 5000);
  }, [index]);

  const goToNextPicture = () => {
    setIndex((prevActiveStep) => prevActiveStep + 1);
  };
  const goToPrevPicture = () => {
    setIndex((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div className="banner">
      <img
        src={MyCollection[index].imgPath}
        style={{
          height: 233,
          width: "100%",
          objectFit: "cover",
          display: "block",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
        alt={MyCollection[index].label}
      />

      <MobileStepper
        position="static"
        activeStep={index}
        index={index}
        steps={size}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          transform: "translateY(-100%)",
          position: "absolute",
          width: "100%",
        }}
        backButton={
          <Button size="small" onClick={goToPrevPicture} disabled={index === 0}>
            {theme.direction == "ltr" && <KeyboardArrowLeft fontSize="large" />}
          </Button>
        }
        nextButton={
          <Button
            size="small"
            onClick={goToNextPicture}
            disabled={index === size - 1}
          >
            {theme.direction !== "rtl" && (
              <KeyboardArrowRight fontSize="large" />
            )}
          </Button>
        }
      />
    </div>
  );
};

export default Banner;
