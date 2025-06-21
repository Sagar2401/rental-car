import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    typeId: "",
    vehicleId: "",
    dateRange: [null, null],
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <FormContext.Provider
      value={{
        step,
        setStep,
        form,
        setForm,
        vehicleTypes,
        setVehicleTypes,
        vehicles,
        setVehicles,
        error,
        setError,
        success,
        setSuccess,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
