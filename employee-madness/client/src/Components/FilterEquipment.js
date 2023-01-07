const FilterEquipment = (props) => {
    const thresholdForSearchLength = 0;

    const handleOnChangeName = async (e) => {
        if(e.target.value.length <= thresholdForSearchLength) {
            return;
        }
        const nameData = await fetch(`/api/equipment/filtered/name/${e.target.value}`);
        const nameResult = await nameData.json();
        props.setEquipmentData(nameResult);
    }

    const handleOnChangeType = async (e) => {
        if(e.target.value.length <= thresholdForSearchLength) {
            return;
        }
        const typeData = await fetch(`/api/equipment/filtered/type/${e.target.value}`);
        const typeResult = await typeData.json();
        props.setEquipmentData(typeResult);
    }

    const handleOnChangeAmount = async(e) => {
        if(e.target.value.length <= thresholdForSearchLength) {
            return;
        }
        const amountData = await fetch(`/api/equipment/filtered/amount/${e.target.value}`);
        const amountResult = await amountData.json();
        props.setEquipmentData(amountResult);
    }

    return ( 
        <div>
            <input placeholder="filter for name" onChange={handleOnChangeName}></input>
            <input placeholder="filter for type" onChange={handleOnChangeType}></input>           
            <input placeholder="filter for amount" onChange={handleOnChangeAmount}></input>
        </div>
    );
}

 
export default FilterEquipment;