import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`${API_URL}/bookings/${id}`);
        // Remove the booking from the state to update the UI instantly
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== id)
        );
      } catch (err) {
        setError("Failed to delete booking.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/bookings`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch bookings.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 5 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        All Bookings
      </Typography>
      {bookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="bookings table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Vehicle Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Vehicle Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow
                  key={booking.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{booking?.firstName || "N/A"}</TableCell>
                  <TableCell>{booking?.lastName || "N/A"}</TableCell>
                  <TableCell>{booking.vehicle?.name || "N/A"}</TableCell>
                  <TableCell>
                    {booking.vehicle?.vehicleType?.name || "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
