import { useState } from "react";
import { Form, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function ClientFormPage() {
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const [errores, setErrores] = useState({});

  const router = useRouter();

  const validateForm = () => {
    let errors = {};
    if (!nuevoCliente.nombre) {
      errors.nombre = "El nombre es obligatorio";
    }
    if (!nuevoCliente.email) {
      errors.email = "El email es obligatorio";
    }
    if (!nuevoCliente.telefono) {
      errors.telefono = "El telefono es obligatorio";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrores(errors);
      return;
    }
    await createCliente();
    await router.push("/");
  };

  const createCliente = async () => {
    try {
      const res = await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCliente),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) =>
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });

  return (
    <Grid
      container
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>Registro de clientes</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              name="nombre"
              label="Nombre"
              placeholder="Nombre"
              onChange={handleChange}
              error={errores.nombre ? { content: errores.nombre } : null}
            />
            <Form.Input
              name="email"
              label="Email"
              placeholder="Email"
              onChange={handleChange}
              error={errores.email ? { content: errores.email } : null}
            />
            <Form.Input
              name="telefono"
              label="Telefono"
              placeholder="Telefono"
              onChange={handleChange}
              error={errores.telefono ? { content: errores.telefono } : null}
            />
            <Form.Button primary>Guardar</Form.Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
