import React from "react";
import { useEffect, useState } from "react";

const fetchEmployees = async(signal) => {
    const attendenceData = await fetch("/api/attendence/missing", { signal });
    const attendenceResult = await attendenceData.json();
    return attendenceResult;
  };

const MissingEmployees = () => {

    const [attendantEmployees, setAttendantEmployees] = useState()

    useEffect(() => {
        const controller = new AbortController();
    
        fetchEmployees(controller.signal)
          .then((employees) => {
            setAttendantEmployees(employees);
          })
          .catch((error) => {
            if (error.name !== "AbortError") {
              setAttendantEmployees(null);
              throw error;
            }
          });
    
        return () => controller.abort();
      }, []);


    return ( 
        <div>
            <h1> missing Employees</h1>
            {
              attendantEmployees !== undefined && attendantEmployees !== false
              ? 
                <ul>
                  {attendantEmployees.map((employee) => (
                    <>
                    <li key={employee._id}>{employee.name}</li>
                    <li>{employee.level}</li>
                    <li>{employee.position}</li>
                    <br />
                    </>
                  ))}
                </ul> 
            
              : 
               null
            }
        </div> 
    );
}
 
export default MissingEmployees;