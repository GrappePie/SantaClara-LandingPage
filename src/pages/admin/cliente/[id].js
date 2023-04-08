import Error from "next/error";
import { Button, Grid, Confirm, Loader } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ClienteDetail({ cliente, error }) {

  const [confirm, setConfirm] = useState(false)
  const {query,push} = useRouter()
  const [loading, setLoading] = useState(false)
  
  const open = () => setConfirm(true)
  const close = () => setConfirm(false)

  const deleteCliente = async () => {
    const {id} = query
    try {
      const res = await fetch(`/api/clientes/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = () => {
    setLoading(true)
    deleteCliente()
    close()
    push("/admin/clientes")
  }

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.message} />;
  return (
    <Grid centered verticalAlign="middle" columns={1} style={{height:"80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{cliente.data.nombre}</h1>
          <p>{cliente.data.email}</p>
          <p>{cliente.data.telefono}</p>
          <div>
            <Button color="red" onClick={open} loading={loading}>
              Remover
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm 
        header="Remover cliente"
        content="¿Estas seguro de remover este cliente?"
        cancelButton="Cancelar"
        confirmButton="Remover"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
}

export async function getServerSideProps({ query: { id }, ...context }) {
  const { req } = context;
  const res = await fetch(`http://${req.headers.host}/api/clientes/${id}`);
  const cliente = await res.json();

  if (res.status === 200) {
    return {
      props: {
        cliente,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        message: "ID invalido",
      },
    },
  };
}
