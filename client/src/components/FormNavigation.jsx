import React from "react";
import { Box, Button } from "@mui/material";
import { useFormContext } from "../FormContext";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const steps = [
  "Name",
  "Number of Wheels",
  "Type of Vehicle",
  "Specific Model",
  "Date Range",
];

export default function FormNavigation() {
  const { step, setStep, form, setError, setSuccess, setForm } =
    useFormContext();

  const handleNext = async () => {
    setError("");
    // Validation
    if (step === 0 && (!form.firstName || !form.lastName)) {
      setError("Please enter your first and last name.");
      return;
    }
    if (step === 1 && !form.wheels) {
      setError("Please select number of wheels.");
      return;
    }
    if (step === 2 && !form.typeId) {
      setError("Please select a vehicle type.");
      return;
    }
    if (step === 3 && !form.vehicleId) {
      setError("Please select a vehicle.");
      return;
    }
    if (step === 4 && (!form.dateRange[0] || !form.dateRange[1])) {
      setError("Please select a date range.");
      return;
    }
    if (step === 4) {
      // Submit
      try {
        await axios.post(`${API_URL}/bookings`, {
          firstName: form.firstName,
          lastName: form.lastName,
          vehicleId: form.vehicleId,
          startDate: form.dateRange[0],
          endDate: form.dateRange[1],
        });
        setSuccess("Booking successful!");
        setTimeout(() => {
          setStep(0);
          setForm({
            firstName: "",
            lastName: "",
            wheels: "",
            typeId: "",
            vehicleId: "",
            dateRange: [null, null],
          });
          setSuccess("");
        }, 2000);
      } catch (e) {
        setError(e.response?.data?.error || "Booking failed.");
      }
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

  return (
    <Box mt={2} display="flex" justifyContent="space-between">
      <div>{step > 0 && <Button onClick={handleBack}>Back</Button>}</div>
      <Button variant="contained" onClick={handleNext}>
        {step === steps.length - 1 ? "Submit" : "Next"}
      </Button>
    </Box>
  );
}
