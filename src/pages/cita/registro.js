import React, { useState } from 'react';
import axios from 'axios';
import CalendarComponent from "@/components/Calendar";
import {Container, CssBaseline, Box, Paper, TextField, Button, Typography, Alert, AlertTitle} from "@mui/material";
import {useRouter} from "next/router";

const IndexPage = () => {
    const router = useRouter();
    // State para almacenar los datos del formulario
    const [formData, setFormData] = React.useState({
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        hora: '',
    });
    Object.seal(formData);
    const [error, setError] = useState('');

    // Manejador de cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar que todos los campos estén completos
        if (formData.nombre.trim() === '' || formData.email.trim() === '' || formData.telefono.trim() === '' || formData.fecha.trim() === '' || formData.hora.trim() === '') {
            setError('Debe completar todos los campos');
        }
        else {
            // Enviar datos al servidor para guardarlos en la base de datos
            try {
                const res = await axios.post('/api/citas', formData);
                setError('');
                setFormData({
                    nombre: '',
                    email: '',
                    telefono: '',
                    fecha: '',
                    hora: '',
                });
                // Redireccionar al usuario a la página de inicio con next/router
                await router.push('/cita/registro');
            } catch (error) {
                setError(error.response.data);
            }
        }
    };



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
                            type="text"
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
                            type="email"
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
                            type="tel"
                            value={formData.telefono}
                            name="telefono"
                            autoComplete="telefono"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fecha"
                            type="date"
                            value={formData.fecha}
                            name="fecha"
                            autoComplete="fecha"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="hora"
                            type="time"
                            value={formData.hora}
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
                        {error && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        )}
                    </Box>
                </Paper>
            </Container>
            <CalendarComponent/>
        </React.Fragment>
    );
};

export default IndexPage;