import Navbar from "./Navbar";
import { Sticky } from "semantic-ui-react";
import { FloatingWhatsApp } from 'react-floating-whatsapp'

export const Layout = ({ children }) => {
  return (
    <>
      <Sticky>
        <Navbar />
      </Sticky>
      {children}
      <FloatingWhatsApp
      phoneNumber="+5215531957475" 
      accountName="Ivonne Urbina"
      avatar="https://pps.whatsapp.net/v/t61.24694-24/339908127_940198330498092_929702166696221280_n.jpg?ccb=11-4&oh=01_AdS01xcqTnbZL6P-lYFs2DjmU668rVOg4AqqRXamunB1rg&oe=643E41B6"
      chatMessage="¿Hola, como puedo ayudarte?"
      statusMessage="Normalmente responde en 1 hora"
      placeholder="Escribe tu mensaje"
      notificationSound
      notificationSoundSrc="https://www.soundjay.com/button/beep-07.wav"
      />
    </>
  );
};
