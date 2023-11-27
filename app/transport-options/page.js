// app/transport-options/index.js
'use client';
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper, CardActions, Button} from '@mui/material';
import { useRouter } from 'next/navigation'

export default function Page() {

    // Datos inventados para opciones de transporte
  const transportOptions = {
    flights: [
      { id: 1, name: "Vuelo 101", company: "Airways", departure: "08:00", arrival: "11:00" },
      { id: 2, name: "Vuelo 202", company: "Skyline", departure: "12:00", arrival: "15:00" },
    ],
    trains: [
      { id: 1, name: "Tren A1", company: "Railways", departure: "09:00", arrival: "12:00" },
      { id: 2, name: "Tren B2", company: "FastTrack", departure: "14:00", arrival: "17:00" },
    ],
    buses: [
      { id: 1, name: "Bus 301", company: "BusLines", departure: "10:00", arrival: "13:00" },
      { id: 2, name: "Bus 402", company: "InterCity", departure: "16:00", arrival: "20:00" },
    ],
  };

  // Función para renderizar las opciones de transporte
  const renderTransportOptions = (options, type) => (
    <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {type}
      </Typography>
      <List>
        {options.map((option) => (
          <React.Fragment key={option.id}>
            <ListItem>
              <ListItemText
                primary={`${option.name} - ${option.company}`}
                secondary={`Salida: ${option.departure}, Llegada: ${option.arrival}`}
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
  
    return (
        <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Opciones de Transporte
      </Typography>
      {renderTransportOptions(transportOptions.flights, "Vuelos")}
      {renderTransportOptions(transportOptions.trains, "Trenes")}
      {renderTransportOptions(transportOptions.buses, "Autobuses")}
      <CardActions>
        <Button size="small" onClick={() => navigation.back()}>
          Volver a la lista
        </Button>
        {/* Botón que lleva a la página de opciones de transporte */}
      </CardActions>
    </Box>
      );
  }