import {Media} from "@/lib/media";
import {Button, Container, Menu, Segment, Visibility} from "semantic-ui-react";
import Link from "next/link";
import {setFixed} from "@/Hooks/NavbarSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

export const DesktopNavbar = (
    {
        myRef,
        hidden,
        handleLogout
    }
) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const showFixedMenu = () => dispatch(setFixed(true));
    const hideFixedMenu = () => dispatch(setFixed(false));

    return (
        <Media greaterThan="mobile">
            <Visibility
                once={false}
                onBottomPassed={showFixedMenu}
                onBottomPassedReverse={hideFixedMenu}
            >
                <Segment
                    textAlign="center"
                    vertical
                >
                    <Menu stackable attached borderless ref={myRef}>
                        <Container>
                            <Menu.Item>
                                <Link href="/">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://static.wixstatic.com/media/904537_c6b6d4ed0abf4f46b00764d284352f78~mv2.png/v1/fill/w_416,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-sta-clara-final-1.png"
                                        height={64}
                                        alt=""
                                    />
                                </Link>
                            </Menu.Item>
                            {hidden ? null : (
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
                            <Menu.Item position="right">
                                <Container
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "200px",
                                    }}
                                >
                                    <Link
                                        href="https://drive.google.com/uc?export=download&id=12kd5UFLrfHDGdn70X-F4NO0S3J3B_qLI">
                                        <Button color="yellow">Descargar Brochure</Button>
                                    </Link>
                                    <Button
                                        color="green"
                                        onClick={() => router.push("/cita/registro")}
                                    >
                                        Ver Disponibilidad
                                    </Button>
                                    {hidden ? null : (
                                        <Button color="red" onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    )}
                                </Container>
                            </Menu.Item>
                        </Container>
                    </Menu>
                </Segment>
            </Visibility>
        </Media>
    );
}