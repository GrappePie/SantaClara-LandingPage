import { Embed, Tab, Container } from "semantic-ui-react"


const panes = [
  {
    menuItem: 'Santa Clara Ecovillage',
    render: () => <Tab.Pane attached={false}><Embed
    active
    url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3123.290585404727!2d-89.0224646!3d21.3499349!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f54116a2b462eb7%3A0x851c90e49fde62f7!2sSanta%20Clara%20Ecovillage!5e1!3m2!1ses-419!2smx!4v1680847886474!5m2!1ses-419!2smx"
  /></Tab.Pane>,
  },
  {
    menuItem: 'Playaviva Club de Playa',
    render: () => <Tab.Pane attached={false}><Embed
    active
    url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2208.5852432881024!2d-89.26466760254095!3d21.344273425249508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5431f6bbe26563%3A0xc8787b833dfb940c!2sPlayaviva%20Club%20de%20Playa!5e1!3m2!1ses-419!2smx!4v1680848184760!5m2!1ses-419!2smx"
  /></Tab.Pane>,
  },
]

export default function ubicacion() {
  return (
    <Container>
      <Tab menu={{ attached: false }} panes={panes} />
    </Container>
  )
}
