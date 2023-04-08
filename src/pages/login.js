import { Form, Input, Button, Grid } from "semantic-ui-react"
import { useState } from "react"
import { signIn } from "next-auth/react"


export default function LoginPage( { csrfToken }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  })
  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn("credentials", {
      redirect: true,
      username: user.username,
      password: user.password,
    })
  }

  return (
    <Grid centered verticalAlign="middle" columns={4} style={{height:"80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Usuario</label>
              <Input type="text" placeholder="Usuario" name="username" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Contraseña</label>
              <Input type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
            </Form.Field>
            <Button type="submit">Iniciar sesión</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
