import React, { useEffect, useState } from 'react';
import { Status } from './App';
import './app.css'

function Shipments({Couriers, OnCompleted, OnDelay, Refresh}) {

    const [couriers, setCouriers] = useState([]); // in Courier group

    useEffect(() => {
        
        setCouriers(null);

        setCouriers(Couriers);
    }, [Couriers, Refresh])


  return (
    <>
      <h2>Today</h2>
      <table id="main-table" width="100%" className="main-table">
          <thead>
            <tr>
              <th>Delivery Man</th>
              <th>Max</th>
              <th>Packages</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map((courier) => (
            <tr key={courier.id}>
              <td>{courier.name}</td>
              <td align="center">{courier.maxPackages}</td>
              <td>
                {courier.packages.length > 0  && <>
                <table width="100%">
                  <thead>
                    <tr>
                      <th width="35%">Name</th>
                      <th width="35%">Status</th>
                      <th width="30%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courier.packages.map(pack => (
                    <tr key={courier.id + "-" + pack.id} className={pack.status === Status.Completed ? "green" : "yellow"}>

                      <td>{pack.name}</td>
                      <td align="center">{pack.status}</td>
                      <td align="center">
                        <button onClick={() => OnCompleted(courier.id, pack.id)}>COMPLETE</button>
                        <button onClick={() => OnDelay(courier.id, pack.id)}>DELAY</button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
                </>}
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </>
  ); 
}

export default Shipments;
