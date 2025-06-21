import React from "react";
import { TextField, Box } from "@mui/material";
import { useFormContext } from "../FormContext";

export default function NameStep() {
  const { form, setForm } = useFormContext();
  return (
    <Box>
      <TextField
        label="First Name"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        fullWidth
      />
    </Box>
  );
}
