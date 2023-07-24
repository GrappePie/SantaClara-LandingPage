import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import {setCitas} from "@/Hooks/CitasSlice";
import moment from 'moment';
import 'moment/locale/es-mx';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// cambiar moment a Mexico
moment.updateLocale('es-mx', {
    week: {
        dow: 1, // First day of week is Monday
    }
});
moment.locale('es-mx');
const localizer = momentLocalizer(moment);

const appointments = [];

const CalendarComponent = () => {
    const citas = useSelector((state) => state.citas);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/citas");
            await response.data.data.map((cita) => {
                var fechaInicial = new Date(cita.fecha+ "T" +cita.hora);
                var fechaFinal = new Date(fechaInicial.getTime() + 3600000);
                var horaInicial = moment(fechaInicial).format('HH:mm A');
                var horaFinal = moment(fechaFinal).format('HH:mm A');
                appointments.push({
                    id: cita._id,
                    title: `${horaInicial} - ${horaFinal}`,
                    start: fechaInicial,
                    end: fechaFinal,
                    isReserved: true
                });
            });
            console.log(appointments);
            dispatch(setCitas(appointments));
        }

        fetchData();
    }
    , [dispatch]);
    return (
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={appointments}
                startAccessor="start"
                endAccessor="end"
                toolbar={true}
                selectable={false}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={(slotInfo) => alert(
                    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                    `\nend: ${slotInfo.end.toLocaleString()}` +
                    `\naction: ${slotInfo.action}`
                )}
                lang="es-mx"
                messages={{
                    today: 'Hoy',
                    previous: '<',
                    next: '>',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                    agenda: 'Agenda',
                    date: 'Fecha',
                    time: 'Hora',
                    event: 'Cita',
                    noEventsInRange: 'No hay citas disponibles',
                    showMore: total => `+ Ver más (${total})`
                }}
            />
        </div>
    );
};

export default CalendarComponent;