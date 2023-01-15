import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fetchEmployees = async (/* signal */) => {
  const employeeData = await fetch("/api/employees" /* { signal } */);
  const employeeResult = await employeeData.json();
  return employeeResult;
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const fetchEquipment = async () => {
  const equipmentData = await fetch("/api/equipment");
  const equipmentResult = await equipmentData.json();
  return equipmentResult;
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" })
    .then((res) => res.json()
  );
};

const EmployeeAndEquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [equipmentData, setEquipmentData] = useState(null);
 
  /*TO-DO: Fix the Toggle
      -> try a useState (map in in EmployeeTable so that every 
         employee has their own useState)
      -> try to set checkbox value to useState and reade here in changeAttendence the value/use vale for the "PUT-Body"
 
        Fix Proxy-Error
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
    setEmployeeData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleDeleteEquip = (id) => {
    deleteEquipment(id)
    .catch((err) => {
      console.log(err);
    });
    setEquipmentData((equipmentItem) => {
      return equipmentItem.filter((equipmentItem) => equipmentItem._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const getAllEmployees = fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        const employeeData = employees;
        return employeeData;
    });

    const getAllEquipmentItem = fetchEquipment(controller.signal)
      .then((equipment) => {
        setLoading(false);
        const equipmentData = equipment;
        return equipmentData;
    });
      
    Promise.all([getAllEmployees, getAllEquipmentItem]).then((values) => {
      setEmployeeData(values[0]);
      setEquipmentData(values[1]);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        setEmployeeData(null);
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
        employees={employeeData} 
        onDeleteEmp={handleDeleteEmployee}
        setEmployeeData={setEmployeeData}
        changeAttendence={changeAttendence}/>

      <EquipmentTable 
        equipment={equipmentData}
        onDeleteEquip={handleDeleteEquip}
        setEquipmentData ={setEquipmentData}/>
    </>
    
  );
};

export default EmployeeAndEquipmentList;
