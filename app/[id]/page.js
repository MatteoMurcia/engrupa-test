// pages/hotels/[id].js
'use client';
/* @client */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import axios from "axios";

const fetchHotelDetails = async (index) => {
  // Realiza la solicitud al endpoint de la API
  const response = await fetch('http://api.egruppa.com/accommodations/search?items_per_page=2000');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  
  // Usa el índice para obtener los detalles del hotel específico
  const hotel = data.accommodations[index];
  return hotel;
};


export default function Page({ params }) {
  const router = useRouter()
  const id = params.id;

  const [hotelDetails, setHotelDetails] = useState(null);
  const [error, setError] = useState(null);

  const goToTransportOptions = () => {
    // Aquí colocas la ruta a la que quieres navegar, por ejemplo '/transport-options'
    router.push('/transport-options');
  };

  useEffect(() => {
    fetchHotelDetails(id)
      .then(setHotelDetails)
      .catch(setError);
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!hotelDetails) {
    return <div>Loading...</div>;
  }

  const goToSelect =async (name,location) => {
    // Aquí colocas la ruta a la que quieres navegar, por ejemplo '/transport-options'
    // Example of how to navigate to this page with query parameters
    router.push(`/select/${encodeURIComponent(name)}`);

  };

  return hotelDetails ? (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {hotelDetails.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Ubicación: {hotelDetails.location}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Rating: {hotelDetails.rating}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Dirección: {hotelDetails.address}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {hotelDetails.photos.split(', ').map((photo, index) => (
          <Card key={index} elevation={3}>
            <CardMedia
              component="img"
              height="200"
              image={photo}
              alt={`Imagen del hotel ${hotelDetails.name}`}
            />
          </Card>
        ))}
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Servicios: {hotelDetails.services.split(', ').map((service, index) => (
            <Chip key={index} label={service} sx={{ margin: '5px' }} />
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigation.back()}>
          Volver a la lista
        </Button>
        {/* Botón que lleva a la página de opciones de transporte */}
        <Button size="small" color="primary" onClick={goToTransportOptions}>
          Opciones de Transporte
        </Button>
        <Button variant="contained" color="primary" onClick={() => goToSelect(hotelDetails.name,hotelDetails.location)}>
          Seleccionar Hotel
        </Button>
      </CardActions>
    </Box>
  ) : (
    <Typography>Cargando detalles del hotel...</Typography>
  );
}