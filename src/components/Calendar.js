import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
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

const appointments = [
    // Aquí obtendrías los datos de MongoDB con días agendados y días libres
    // Ejemplo:
    { id: 1, title: `Cita reservada. ${moment().calendar()}`, start: new Date(), end: new Date(), isReserved: true },
    // { id: 2, title: 'Día libre', start: new Date(), end: new Date(), isReserved: false },
];

const CalendarComponent = () => {
    console.log('appointments:', appointments);
    console.log('moment:', moment());
    return (
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={appointments}
                startAccessor="start"
                endAccessor="end"
                toolbar={true}
                selectable={true}
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