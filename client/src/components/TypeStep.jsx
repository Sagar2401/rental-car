import React, { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import { useFormContext } from "../FormContext";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function TypeStep() {
  const {
    form,
    setForm,
    vehicleTypes,
    setVehicleTypes,
    isLoading,
    setIsLoading,
  } = useFormContext();

  useEffect(() => {
    if (form.wheels) {
      setIsLoading(true);
      axios
        .get(`${API_URL}/vehicles/types?wheels=${form.wheels}`)
        .then((res) => {
          setVehicleTypes(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [form.wheels, setVehicleTypes, setIsLoading]);

  return (
    <FormControl>
      {isLoading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <RadioGroup
          value={form.typeId}
          onChange={(e) => setForm({ ...form, typeId: e.target.value })}
        >
          {vehicleTypes.map((type) => (
            <FormControlLabel
              key={type.id}
              value={type.id.toString()}
              control={<Radio />}
              label={type.name}
            />
          ))}
        </RadioGroup>
      )}
    </FormControl>
  );
}
