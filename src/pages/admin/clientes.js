import { Button, Container, Grid, Table } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function clientes({ clientes }) {
    const Router = useRouter();
    if (clientes.data.length === 0) return (
        <Grid centered verticalAlign="middle" columns={1} style={{height:"80vh"}}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h1>No hay clientes</h1>
              <img src="" alt="" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        )
      
        // Renderiza lista de clientes
        return (
          <div>
            <Container style={{padding: 20}}>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Telefono</Table.HeaderCell>
                    <Table.HeaderCell>Creado</Table.HeaderCell>
                    <Table.HeaderCell>Opciones</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {clientes.data.map((cliente) => (
                    <Table.Row key={cliente._id}>
                      <Table.Cell>{cliente.nombre}</Table.Cell>
                      <Table.Cell>{cliente.email}</Table.Cell>
                      <Table.Cell>{cliente.telefono}</Table.Cell>
                      <Table.Cell>{cliente.createdAt}</Table.Cell>
                      <Table.Cell>
                        <Button color="green" onClick={() => Router.push(`/admin/cliente/${cliente._id}`)}>Opciones</Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Container>
          </div>
        );
}

export async function getServerSideProps(context) {
  const { req } = context;
    const res = await fetch(`http://${req.headers.host}/api/clientes`)
    const clientes = await res.json()
    return {
      props: {
        clientes,
      },
    }
  }