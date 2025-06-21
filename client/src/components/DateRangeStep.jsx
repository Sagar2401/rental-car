import React from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useFormContext } from "../FormContext";

export default function DateRangeStep() {
  const { form, setForm } = useFormContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Start Date"
        endText="End Date"
        value={form.dateRange}
        onChange={(newValue) => setForm({ ...form, dateRange: newValue })}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} sx={{ mb: 2, mr: 1 }} />
            <TextField {...endProps} sx={{ mb: 2 }} />
          </>
        )}
      />
    </LocalizationProvider>
  );
}
