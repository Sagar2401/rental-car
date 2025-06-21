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

export default function ModelStep() {
  const { form, setForm, vehicles, setVehicles, isLoading, setIsLoading } =
    useFormContext();

  useEffect(() => {
    if (form.typeId) {
      setIsLoading(true);
      axios
        .get(`${API_URL}/vehicles?typeId=${form.typeId}`)
        .then((res) => {
          setVehicles(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [form.typeId, setVehicles, setIsLoading]);

  return (
    <FormControl>
      {isLoading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <RadioGroup
          value={form.vehicleId}
          onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
        >
          {vehicles.map((vehicle) => (
            <FormControlLabel
              key={vehicle.id}
              value={vehicle.id.toString()}
              control={<Radio />}
              label={vehicle.name}
            />
          ))}
        </RadioGroup>
      )}
    </FormControl>
  );
}
