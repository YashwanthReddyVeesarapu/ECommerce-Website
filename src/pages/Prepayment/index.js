import { Box, Button, makeStyles, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';


const steps = ['Summary', 'Shipping Details', 'Payment'];

const useStyles = makeStyles(() => ({
    root: {
        padding: '20px 20%',
        "@media (max-width: 980px)": {
            padding: 0
        }
    }
}))


const Prepayment = (data) => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(1);

    useEffect(() => {
        setActiveStep(data.step)
    }, [data])


    return (
        <Box sx={{ width: '100%' }}>
            <div className={classes.root} >
                <Stepper activeStep={activeStep - 1} >
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel  {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>


            </div>
        </Box>
    )
}

export default Prepayment;

