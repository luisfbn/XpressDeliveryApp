import React, { useEffect, useState } from 'react';

function FutureShipments({ Packages }) {

    const [packs, setPacks] = useState([]); // Each package

    useEffect(() => {
        
        setPacks(Packages);

        console.log(Packages);
    }, [Packages]);

  return (
    <div>
        <h2>Tomorrow</h2>
        <table width="60%" class="main-table">
            <thead>
                <tr>
                    <th width="70%">Name</th>
                    <th width="10%">Status</th>
                </tr>
            </thead>
            <tbody>
                {packs && packs.map(p => (
                <tr class="yellow">
                    <td>{p.name}</td>
                    <td align="center">{p.status}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default FutureShipments;
