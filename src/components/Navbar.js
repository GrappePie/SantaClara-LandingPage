import { Menu, Container, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [hide, setHide] = useState(false);
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setHide(false);
      } else {
        setHide(true);
        router.route.slice(0, 7) === "/admin/" && router.push("/");
      }
    })
  }, [])


  const logingOut = () => {
    signOut()
    router.push("/")
  }
  return (
    <Menu stackable attached borderless>
      <Container>
        <Menu.Item>
          <Link href="/">
            <img src="https://static.wixstatic.com/media/904537_c6b6d4ed0abf4f46b00764d284352f78~mv2.png/v1/fill/w_416,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-sta-clara-final-1.png" height={64} alt="" />
          </Link>
        </Menu.Item>
        {(hide)?null:<Menu.Item><Link href="/admin/clientes">Clientes</Link></Menu.Item>}
        <Menu.Item><Link href="/santaclara/ecovillage">Ecovillage</Link></Menu.Item>
        <Menu.Item><Link href="/santaclara/playaviva">Playaviva</Link></Menu.Item>
        <Menu.Item><Link href="/santaclara/ubicaciones">Ubicaciones</Link></Menu.Item>
        <Menu.Item position="right">
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
          <Button
            color="green"
            onClick={() => router.push("/clientes/registro")}
          >
            Contactar
          </Button>
          {(hide)?<Button
            color="blue"
            onClick={() => signIn()}
          >
            Login
          </Button>:<Button
            color="red"
            onClick={logingOut}
          >
            Logout
          </Button>}
          
          </Container>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
