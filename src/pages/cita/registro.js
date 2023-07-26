import React, { useState } from 'react';
import CalendarComponent from "@/components/Calendar";
import {Container, CssBaseline, Box, Paper, TextField, Button, Typography} from "@mui/material";

const IndexPage = () => {
    // State para almacenar los datos del formulario
    const [formData, setFormData] = React.useState({
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        hora: '',
    });

    const [error, setError] = useState('Debe completar todos los campos');

    // Manejador de cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        //e.preventDefault();
        try {
            const response = await fetch('/api/citas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
            }
            updateCalendar();
        } catch (error) {
            console.error('Error al enviar la cita:', error);
        }
    };

    // Actualizar el calendario
    const updateCalendar = () => {
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';
        calendar.appendChild(<CalendarComponent/>);
    }



    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper sx={{ my: 8, mx: 4, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Agendar cita
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nombre"
                            label="Nombre"
                            name="nombre"
                            autoComplete="nombre"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="telefono"
                            label="Teléfono"
                            name="telefono"
                            autoComplete="telefono"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fecha"
                            label="Fecha"
                            name="fecha"
                            autoComplete="fecha"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="hora"
                            label="Hora"
                            name="hora"
                            autoComplete="hora"
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Agendar
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <CalendarComponent/>
        </React.Fragment>
    );
};

export default IndexPage;