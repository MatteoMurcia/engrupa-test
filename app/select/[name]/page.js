"use client"
import axios from "axios";
import React from 'react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function Page({ params }) {
  const router = useRouter();
  const name = decodeURIComponent(params.name || '');
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);

  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSuccessOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      phone: formData.get('phone'),
      message: `Hotel Name: ${name || 'N/A'}, Message: ${formData.get('message')}`,
    };

    try {
      const res = await axios.post("/api/sms", data);
      if (res.status === 200) {
        toast.success("Message sent");
        setIsSuccessOpen(true); // Show success alert
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <form onSubmit={onSubmit}>
        <Typography variant="h4" gutterBottom>
          Send an SMS
        </Typography>
        <TextField
          name="phone"
          type="tel"
          label="Phone Number"
          variant="outlined"
          placeholder="+123456789"
          fullWidth
          margin="normal"
          InputProps={{
            style: { backgroundColor: 'gray' }, // Set the background color to gray
          }}
          InputLabelProps={{
            style: { color: 'white' }, // Set the label color to white
          }}
        />

        <TextareaAutosize
          name="message"
          placeholder="Write your Message"
          minRows={5}
          style={{ width: '100%', padding: '8px', marginTop: '8px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Send
        </Button>
      </form>
      <div style={{ marginTop: '16px' }}>
        <Button size="small" onClick={() => router.back()}>
          Volver a la lista
        </Button>
      </div>

      <Snackbar
        open={isSuccessOpen}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleSuccessClose} severity="success" variant="filled">
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
