import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormContext } from "../FormContext";

export default function WheelsStep() {
  const { form, setForm } = useFormContext();
  return (
    <FormControl>
      <RadioGroup
        value={form.wheels}
        onChange={(e) => setForm({ ...form, wheels: e.target.value })}
      >
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
      </RadioGroup>
    </FormControl>
  );
}
