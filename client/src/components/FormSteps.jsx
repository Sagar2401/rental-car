import React from "react";
import {
  Box,
  Typography,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useFormContext } from "../FormContext";
import NameStep from "./NameStep";
import WheelsStep from "./WheelsStep";
import TypeStep from "./TypeStep";
import ModelStep from "./ModelStep";
import DateRangeStep from "./DateRangeStep";
import FormNavigation from "./FormNavigation";

const steps = [
  { title: "Enter Name", label: "Name", component: NameStep },
  {
    title: "Select Number of Wheels",
    label: "Number of Wheels",
    component: WheelsStep,
  },
  {
    title: "Select Type of Vehicle",
    label: "Type of Vehicle",
    component: TypeStep,
  },
  {
    title: "Select Specific Model",
    label: "Specific Model",
    component: ModelStep,
  },
  {
    title: "Select Date Range",
    label: "Date Range",
    component: DateRangeStep,
  },
];

export default function FormSteps() {
  const { step, error, success } = useFormContext();
  const StepComponent = steps[step].component;
  const stepLabels = steps.map((s) => s.label);

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" mb={1}>
        Vehicle Rental Form
      </Typography>
      <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
        {stepLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {success ? (
        <Alert severity="success">{success}</Alert>
      ) : (
        <>
          <Typography variant="subtitle1" align="center" mb={2}>
            {steps[step].title}
          </Typography>
          {error && (
            <Box>
              {" "}
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <StepComponent />
          </Box>
          <FormNavigation />
        </>
      )}
    </Box>
  );
}
