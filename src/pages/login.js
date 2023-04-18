import { Form, Input, Button, Grid } from "semantic-ui-react"
import { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux";
import { setHidden } from "@/Hooks/HiddenSlice";


export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    password: "",
  })
  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status === 200) {
          dispatch(setHidden(false));
          router.push("/")
        }
      })
    }
    catch (error) {
      console.log(error)
    }
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
