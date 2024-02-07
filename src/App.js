import React, { useEffect, useState } from 'react';
import Shipments from './shipments';
import FutureShipments from './futureShipments';
import {Couriers, Packages} from './data';
import './app.css'

class Pack {
  constructor(id, name, distance, courierId, courier, status) {
    this.id = id;
    this.name = name;
    this.distance = distance;
    this.courierId = courierId;
    this.courier = courier;
    this.status = status;
  }
}

class Courier {
  constructor(id, name, maxPackages, packages) {
    this.id = id;
    this.name = name;
    this.maxPackages = maxPackages;
    this.packages = packages;
  }
}

export const Status = {
  Unassigned: 'Unassigned',
  OnTheWay: 'On the way',
  Completed: 'Completed',
  Delayed: 'Delayed'
};

export default function App() {

  const [packs, setPacks] = useState([]); // Each package
  const [couriers, setCouriers] = useState([]); // in Courier group

  const [assigned, setAssigned] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    let packsArray = [];
    let courierArray = [];

    Packages.forEach((x, index) => {
      packsArray.push(new Pack(index, x.name, x.distance, null, null, Status.Unassigned));
    });

    setPacks(packsArray);

    Couriers.forEach((x, index) => {
      courierArray.push(new Courier(index, x.name, x.maxPackages, []));
    });

    setCouriers(courierArray);

  }, []);



  const handleAssign = () => {

    let courierSorted = couriers.sort((a, b) => b.maxPackages - a.maxPackages);
    let packagesAvailables = packs;

    for (let i = 0; i < courierSorted.length; i++) {

      const courier = courierSorted[i];

      for (let p = 1; p <= courier.maxPackages; p++) {

        const packagesUnassigned = packagesAvailables.filter(x => x.status === Status.Unassigned);

        if (packagesUnassigned.length>0) {

          const newPackage = packagesUnassigned[0];

          newPackage.courierId = courier.id;
          newPackage.courier = courier.name;
          newPackage.status = Status.OnTheWay;
          
          courier.packages.push({...newPackage});

          packagesAvailables = [
           ...packagesAvailables.filter(x => x.id !== newPackage.id), 
              newPackage];
              
        }
      }

      courierSorted[i] = courier;

    }


    setCouriers(courierSorted);

    packagesAvailables.filter(x => x.status === Status.Unassigned).map(x => {
      x.status = Status.Delayed;
      return x;
    });

    setPacks(packagesAvailables);

    setAssigned(true);
  }


  const OnCompleted = (courierId, packageId) => {

    packs.filter(x => x.id === packageId)[0].status = Status.Completed;

    couriers.filter(x => x.id === courierId)[0].packages.filter(x => x.id === packageId)[0].status = Status.Completed;

    setPacks(packs);
    setCouriers(couriers);
    setRefresh(val => !val);

  }

  const OnDelay = (courierId, packageId) => {

    packs.filter(x => x.id === packageId)[0].status = Status.Delayed;

    couriers.filter(x => x.id === courierId)[0].packages = couriers.filter(x => x.id === courierId)[0].packages.filter(x => x.id !== packageId);

    setPacks(packs);
    setCouriers(couriers);
    setRefresh(val => !val);
  }

  return (
    <div>
      <h1>Xpress Delivery App</h1>

      {!assigned && <button onClick={handleAssign}>Assign</button>}

      <Shipments Couriers={couriers} OnCompleted={OnCompleted} OnDelay={OnDelay} Refresh={refresh} />
      <FutureShipments Packages={packs.filter(x => x.status === Status.Delayed)} />
    </div>
  ); 
}
