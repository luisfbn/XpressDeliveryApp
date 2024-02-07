import React from 'react';

function FutureShipments({ futureShipments }) {
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
                <tr class="yellow">
                    <td>Package 2</td>
                    <td align="center">DELAYED</td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}

export default FutureShipments;
