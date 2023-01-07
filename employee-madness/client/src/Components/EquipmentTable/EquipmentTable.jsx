import { Link } from "react-router-dom";
import FilterEquipment from "../FilterEquipment";
import SortEquipment from "../SortEquipment";
import "./EquipmentTable.css";

const EquipmentTable = ({equipment, onDeleteEquip, setEquipmentData}) => (
    <div className="EquipmentTable">
      <h1> Equipment</h1>
      <FilterEquipment setEquipmentData={setEquipmentData}/>
      <SortEquipment setEquipmentData={setEquipmentData}/>
      <table>
      <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            equipment !== null 
          ?
            <>
              {equipment.map((equipmentItem) => (
                <tr key={equipmentItem._id}>
                  <td>{equipmentItem.name}</td>
                  <td>{equipmentItem.type}</td>
                  <td>{equipmentItem.amount}</td>
                  <td>
                    <Link to={`/update/equipment/${equipmentItem._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button type="button" onClick={() => onDeleteEquip(equipmentItem._id)}>
                      Delete
                    </button>
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
);

export default EquipmentTable;
