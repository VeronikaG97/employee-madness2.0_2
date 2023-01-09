import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const fetchEquipment = async (signal) => {
  const fetchEquipData = await fetch("/api/equipment", { signal })
  const equipDataResult = await fetchEquipData.json();
  return equipDataResult;
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" })
    .then((res) => res.json()
  );
};

const EmployeeAndEquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [equipmentData, setEquipmentData] = useState(null);
 
  /*TO-DO: Fix the Toggle
      -> try a useState (map in in EmployeeTable so that every 
         employee has their own useState)
      -> try to set checkbox value to useState and reade here in changeAttendence the value/use vale for the "PUT-Body"
  */
  const changeAttendence = async (id, attendence) => {
    attendence = !attendence
    return fetch(`/api/attendence/${id}`, {
      method: "PUT",
      headers: 
      {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(
      {
        attendence: attendence
      })
    }).then((res) => res.json());
  }


  const handleDeleteEmployee = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });
    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleDeleteEquip = (id) => {
    deleteEquipment(id)
    .catch((err) => {
      console.log(err);
    });
    setEquipmentData((equipmentItem) => {
      return equipmentItem.filter((equipItem) => equipItem._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchEquipment(controller.signal)
      .then((equipmentItem) => {
        setLoading(false);
        setEquipmentData(equipmentItem);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setEquipmentData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return ( 
    <>
      <EmployeeTable 
        employees={data} 
        onDeleteEmp={handleDeleteEmployee}
        setData={setData}
        changeAttendence={changeAttendence}/>

      <EquipmentTable 
        equipment={equipmentData}
        onDeleteEquip={handleDeleteEquip}
        setEquipmentData ={setEquipmentData}/>
    </>
    
  );
};

export default EmployeeAndEquipmentList;
