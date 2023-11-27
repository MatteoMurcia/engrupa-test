// Importaciones necesarias para Next.js y Material-UI
'use client';
/* @client */
import Image from 'next/image';
import styles from './page.module.css';
// Home.client.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Box, Grid, Card, CardActions, CardContent, Button, Typography } from '@mui/material';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const router = useRouter()

  useEffect(() => {
    fetch('http://api.egruppa.com/accommodations/search')
      .then(response => response.json())
      .then(data => {
        setHotels(data.accommodations.slice(0, 20));
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleCardClick = (id) => {
    // Asegúrate de que la ruta coincida con la estructura del archivo en tu proyecto
    router.push(`/${id}`);
  };
  
  
  

  const getRandomPricePerNight = () => {
    return (Math.random() * (500 - 50) + 50).toFixed(2);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {hotels.map((hotel, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card 
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'background-color 0.3s',
                ':hover': {
                  backgroundColor: '#e0e0e0',
                  cursor: 'pointer', // Cambia el cursor a un puntero para indicar que es clickeable
                },
              }}
              onClick={() => handleCardClick(index)} // Manejador de clic para redirigir
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {hotel.name}
                </Typography>
                <Typography color="text.secondary">
                  {hotel.location}
                </Typography>
                <Typography variant="body2">
                  Precio por noche: ${getRandomPricePerNight()} USD
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
