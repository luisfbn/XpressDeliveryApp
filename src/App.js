import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Shipments from './shipments';
import FutureShipments from './futureShipments';
import {Couriers, Packages} from './data';
import './app.css';

export default function App() {
  return (
    <div>
      <h1>Xpress Delivery App</h1>
      <Shipments />
      <FutureShipments />
    </div>
  ); 
}
