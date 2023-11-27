"use client"
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

export default function Page({ params }) {
  const router = useRouter()
    const name = decodeURIComponent(params.name || '');

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
        phone: formData.get('phone'),
        message: `Hotel Name: ${name || 'N/A'}, Message: ${formData.get('message')}`,
      };

    const res = await axios.post("/api/sms", data);
    if (res.status === 200) {
      toast.success("Message sent");
    }
  };

  
  return (
    <Box
        display="flex"
        flexDirection="column" // Align children vertically
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
        <div style={{ marginTop: '16px' }}> {/* Add margin to separate the button */}
            <Button size="small" onClick={() => router.back()}>
                Volver a la lista
            </Button>
        </div>
    </Box>
);
}
