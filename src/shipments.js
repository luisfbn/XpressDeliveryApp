import React, { useState } from 'react';

function Shipments() {
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
            <tr>
              <td>Delivery Man Name</td>
              <td align="center">1</td>
              <td>
                <table width="100%">
                  <thead>
                    <tr>
                      <th width="35%">Name</th>
                      <th width="35%">Status</th>
                      <th width="30%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="yellow">
                      <td>Package 1</td>
                      <td align="center">ON THE WAY</td>
                      <td align="center">
                        <button>COMPLETE</button>
                        <button>DELAY</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </>
  ); 
}

export default Shipments;
