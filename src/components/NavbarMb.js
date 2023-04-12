import { useState } from "react";
import { Menu, Sidebar, Button, Container } from "semantic-ui-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setHide } from "@/Hooks/HiddenSlice";
import { useRouter } from "next/router";

function HamIcon() {
  return <i className="big bars icon" />;
}

function CloseIcon() {
  return <i className="big close icon" />;
}
function NavbarMb({ renderLinks }) {
  const hide = useSelector((state) => state.hidden);
  const dispatch = useDispatch();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [icon, setIcon] = useState(HamIcon);
  const hideSidebar = () => {
    setIcon(HamIcon);
    setVisible(false);
  };
  const showSidebar = () => {
    setIcon(CloseIcon);
    setVisible(true);
  };
  const toggleSidebar = () => {
    visible ? hideSidebar() : showSidebar();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/logout");
      const data = await response.json();
      dispatch(setHide(true));
      router.push("/");
    } catch (error) {
      dispatch(setHide(true));
      router.push("/");
    }
  };

  return (
    <>
      {visible}
      <Menu size="tiny" borderless attached>
      <Container>
      <Menu.Item>
          <Link href="/">
            <img
              src="https://static.wixstatic.com/media/904537_c6b6d4ed0abf4f46b00764d284352f78~mv2.png/v1/fill/w_416,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-sta-clara-final-1.png"
              height={64}
              alt=""
            />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item onClick={toggleSidebar}>{icon}</Menu.Item>
        </Menu.Menu>
      </Container>
      </Menu>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        vertical
        visible={visible}
        width="thin"
      >
        <Menu.Item>
          <Link href="/">
            <img
              src="https://static.wixstatic.com/media/904537_c6b6d4ed0abf4f46b00764d284352f78~mv2.png/v1/fill/w_416,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-sta-clara-final-1.png"
              width={100}
              alt=""
            />
          </Link>
        </Menu.Item>
        {hide ? null : (
          <Menu.Item>
            <Link href="/admin/clientes">Clientes</Link>
          </Menu.Item>
        )}
        <Menu.Item>
          <Link href="/santaclara/ecovillage">Ecovillage</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/santaclara/playaviva">Playaviva</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/santaclara/ubicaciones">Ubicaciones</Link>
        </Menu.Item>
        <Menu.Item>
          <Button
            color="green"
            onClick={() => router.push("/clientes/registro")}
          >
            Contactar
          </Button>
        </Menu.Item>
        <Menu.Item>
          {hide ? (
            <Button color="blue" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Button color="red" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Menu.Item>
      </Sidebar>
    </>
  );
}

export default NavbarMb;
