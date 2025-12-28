const today = new Date();

const at = hours => today.setHours(hours, 0);

export const sampleAppointments = [
    { startsAt: at(9),  customer: { firstname: 'Charlie' } },
    { startsAt: at(10),  customer: { firstname: 'Frankie' } },
    { startsAt: at(11),  customer: { firstname: 'Casey' } },
    { startsAt: at(12),  customer: { firstname: 'Ashley' } },
    { startsAt: at(13),  customer: { firstname: 'Jordan' } },
    { startsAt: at(14),  customer: { firstname: 'Jay' } },
    { startsAt: at(15),  customer: { firstname: 'Alex' } },
    { startsAt: at(16),  customer: { firstname: 'Jules' } },
    { startsAt: at(17),  customer: { firstname: 'Stevie' } }
];