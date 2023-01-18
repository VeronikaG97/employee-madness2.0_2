import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import FilterEmployees from "../FilterEmployees";
import SortEmployees from "../SortEmployees";

const EmployeeTable = ({ employees, onDeleteEmp, setEmployeeData, changeAttendence }) => {
  return (
    <div className="EmployeeTable">
      <h1>Employees</h1>
      <FilterEmployees setEmployeeData={setEmployeeData} />
      <SortEmployees setEmployeeData={setEmployeeData} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {
            employees !== null
              ?
              <>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                    <td>
                      <Link to={`/update/${employee._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button type="button" onClick={() => onDeleteEmp(employee._id)}>
                        Delete
                      </button>
                    </td>
                    <td> <label htmlFor="attendence" >attendent</label>
                      <input name="attendence" type="checkbox" checked={employee.attendence}
                        onChange={
                          () => changeAttendence(employee._id, employee.attendence)
                        }>
                      </input>
                    </td>
                  </tr>
                ))}
              </>
              :
              null
          }
        </tbody>
      </table>
    </div>
  )
};

export default EmployeeTable;