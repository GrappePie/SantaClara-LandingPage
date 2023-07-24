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
                console.log(cita);
                appointments.push({
                    id: cita._id,
                    title: `Cita reservada. ${new Date(cita.fecha).toLocaleString()}`,
                    start: new Date(cita.fecha),
                    end: new Date(cita.fecha),
                    isReserved: true
                });
            });
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