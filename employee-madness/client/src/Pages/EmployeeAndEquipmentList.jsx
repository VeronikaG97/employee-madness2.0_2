import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fetchEmployees = async (/* signal */) => {
  const employeeData = await fetch("/api/employees", /* {signal} */);
  const employeeResult = await employeeData.json();
  return employeeResult;
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const fetchEquipment = async (/* signal */) => {
  const equipmentData = await fetch("/api/equipment", /* {signal} */);
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
 
  const changeAttendence = async (id, attendence) => {
    let updatedAttendence = !attendence;
    await fetch(`/api/attendence/${id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
      {
        attendence: updatedAttendence
      })
    });

    setEmployeeData(employeeData.map(employee => {
      if (employee._id === id) {
        return { ...employee, attendence: updatedAttendence}
      } else {
        return employee;
      }
    }))
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
   /*  const controller = new AbortController(); */

    const getAllEmployees = fetchEmployees(/* controller.signal */)
      .then((employees) => {
        setLoading(false);
        const employeeData = employees;
        return employeeData;
    });

    const getAllEquipmentItem = fetchEquipment(/* controller.signal */)
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

    /* return () => controller.abort(); */
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
