import Navbar from "./Navbar";
import {Sticky} from "semantic-ui-react";
import {FloatingWhatsApp} from 'react-floating-whatsapp'
import {useRouter} from "next/router";
import { useEffect } from 'react'

export const Layout = ({children}) => {
    const router = useRouter();
    const secretCode = 'login'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const pressed = []

    useEffect(() => {
        const handleKeyDown = (event) => {
            pressed.push(event.key)
            pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)
            if (pressed.join('').includes(secretCode)) {
                router.push('/login')
            }
        }

        // Add the event listener
        window.addEventListener('keydown', handleKeyDown)

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [pressed, router])

    return (
        <>
            <Sticky>
                <Navbar/>
            </Sticky>
            {children}
            <FloatingWhatsApp
                phoneNumber="+5215531957475"
                accountName="Ivonne Urbina"
                avatar="logo.svg"
                chatMessage="¿Hola, como puedo ayudarte?"
                statusMessage="Normalmente responde en 1 hora"
                placeholder="Escribe tu mensaje"
                notificationSound
                notificationSoundSrc="https://opengameart.org/sites/default/files/pop.ogg"
            />
            <div className="social">
                <a href="#">
                    <div className="social-btn color-facebook">
                        <div className="icons8-facebook-app"></div>
                        <p className="order-1 google-font margin-telgram">Facebook</p>
                    </div>
                </a>
                <a href="#">
                    <div className="social-btn color-instagram">
                        <div class="icons8-instagram"></div>
                        <p class="order-1 google-font margin-instagram">instagram </p>
                    </div>
                </a>
            </div>
        </>
    );
};
