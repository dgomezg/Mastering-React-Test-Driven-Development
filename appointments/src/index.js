import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppointmentsDayView } from './AppointmentsDayView';
import { sampleAppointments } from './sampleData';
import { CustomerForm } from './CustomerForm';
import { AppointmentForm } from './AppointmentForm';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    //<AppointmentsDayView appointments={sampleAppointments}/>
    //<CustomerForm/>
    <AppointmentForm/>
);
