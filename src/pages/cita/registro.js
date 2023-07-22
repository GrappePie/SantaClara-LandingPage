import React, { useState } from 'react';
import CalendarComponent from "@/components/Calendar";
import {Form,Button,Grid} from "semantic-ui-react";

const IndexPage = () => {
    // State para almacenar los datos del formulario
    const [formData, setFormData] = React.useState({
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        hora: '',
    });

    // Manejador de cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/citas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Respuesta del backend:', data);
        } catch (error) {
            console.error('Error al enviar la cita:', error);
        }
    };

    return (
        <div>
            <Grid
                container
                centered
                verticalAlign="middle"
                style={{ height: "30vh" }}
            >
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <h1>Agendar Cita</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group unstackable widths={3}>
                                <Form.Input
                                    label='Nombre:'
                                    placeholder='Nombre'
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Input
                                    label='Email:'
                                    placeholder='Email'
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Input
                                    label='Teléfono:'
                                    placeholder='Teléfono'
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group unstackable widths={2}>
                                <Form.Input
                                    label='Fecha:'
                                    placeholder='Fecha'
                                    type="date"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Input
                                    label='Hora:'
                                    placeholder='Hora'
                                    type="time"
                                    name="hora"
                                    value={formData.hora}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit">Agendar Cita</Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <CalendarComponent />
        </div>
    );
};

export default IndexPage;