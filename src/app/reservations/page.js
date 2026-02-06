
"use client";
// src/app/reservations/page.js

// This file defines the content for the URL: /reservations

import BookATable from '@/components/Booking/BookATable'; 
import React from 'react';

// For simplicity and to ensure any hidden child components (like the reservation widget) 
// that might rely on client-side logic work, we use the "use client" directive here.


export default function ReservationsPage() {
    return (
        <BookATable />
    );
}