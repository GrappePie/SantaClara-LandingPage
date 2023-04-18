import {Media} from "@/lib/media";
import {Button, Container, Menu, Segment, Sidebar} from "semantic-ui-react";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";

function HamIcon() {
    return <i className="big bars icon"/>;
}

function CloseIcon() {
    return <i className="big close icon"/>;
}

export const MobileNavbar = (
    {
        myRef,
        hidden,
        handleLogout
    }
) => {

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

    return (
        <Media as={Sidebar.Pushable} at="mobile">
            {/*<Sidebar.Pushable>*/}
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                vertical
                visible={visible}
                width="wide"
                direction={"bottom"}
            >
                <Menu.Item>
                    <Link href="/">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://static.wixstatic.com/media/904537_c6b6d4ed0abf4f46b00764d284352f78~mv2.png/v1/fill/w_416,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-sta-clara-final-1.png"
                            width={200}
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
                <Menu.Item>
                    <Button
                        color="green"
                        onClick={() => router.push("/clientes/registro")}
                    >
                        Contactar
                    </Button>
                </Menu.Item>
                {hidden ? null : (
                    <Menu.Item>
                        <Button color="red" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Menu.Item>
                )}
            </Sidebar>

            <Sidebar.Pusher>
                <Segment
                    textAlign="center"
                    vertical
                >
                    <Menu size="tiny" borderless attached ref={myRef}>
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
                            <Menu.Menu position="right">
                                <Menu.Item onClick={toggleSidebar}>{icon}</Menu.Item>
                            </Menu.Menu>
                        </Container>
                    </Menu>
                </Segment>
            </Sidebar.Pusher>
            {/*</Sidebar.Pushable>*/}
        </Media>
    );

}