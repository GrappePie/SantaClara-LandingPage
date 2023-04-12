import Navbar from "./Navbar";
import NavbarMb from "./NavbarMb";
import { Sticky } from "semantic-ui-react";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { useMediaQuery } from 'react-responsive'

export const Layout = ({ children }) => {
  const none =useMediaQuery({ query: "(max-width:576px)" }) 
  const sm = useMediaQuery({ query: "(min-width:576px)" })
  const md = useMediaQuery({ query: "(min-width:768px)" })
  const lg = useMediaQuery({ query: "(min-width:992px)" })
  const xl = useMediaQuery({ query: "(min-width:1200px)" })
  const xxl = useMediaQuery({ query: "(min-width:1400px)" })
  const size = {none,sm,md,lg,xl,xxl}
  return (
    <>
      <Sticky>
        {size.lg ? <Navbar /> : <NavbarMb /> }
      </Sticky>
      {children}
      <FloatingWhatsApp
      phoneNumber="+5215531957475" 
      accountName="Ivonne Urbina"
      avatar="https://res.cloudinary.com/dq2wrnvph/image/upload/v1681312209/santaclara/assets/whatsapp/perfil_oojkd0.jpg"
      chatMessage="¿Hola, como puedo ayudarte?"
      statusMessage="Normalmente responde en 1 hora"
      placeholder="Escribe tu mensaje"
      notificationSound
      notificationSoundSrc="https://opengameart.org/sites/default/files/pop.ogg"
      />
    </>
  );
};
