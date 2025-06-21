import React from "react";
import { FormProvider } from "../FormContext";
import FormSteps from "../components/FormSteps";

export default function HomePage() {
  return (
    <FormProvider>
      <FormSteps />
    </FormProvider>
  );
}
