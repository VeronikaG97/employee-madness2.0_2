const SortEquipment = (props) => {

    const handleOnClickName = async () => {
        const nameData = await fetch("/api/equipment/sorted/name");
        const nameResult = await nameData.json();
        props.setEquipmentData(nameResult);
    }

    const handleOnClickType = async () => {
        const typeData = await fetch("/api/equipment/sorted/type");
        const typeResult = await typeData.json();
        props.setEquipmentData(typeResult);
    } 

    const handleOnClickAmount = async () => {
        const amountData = await fetch("/api/equipment/sorted/amount");
        const amountResult = await amountData.json();
        props.setEquipmentData(amountResult);
    } 

    return ( 
        <div> Sort for:
            <button onClick={handleOnClickName}>Name</button>
            <button onClick={handleOnClickType}>Type</button>
            <button onClick={handleOnClickAmount}>Amount</button>
        </div>
     );
}
 
export default SortEquipment;