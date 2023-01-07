const FilterEmployees = (props) => {
    const thresholdForSearchLength = 2;

    const handleOnChangeName = async (e) => {
        if(e.target.value.length <= thresholdForSearchLength) {
            return;
        }
        const nameData = await fetch(`/api/filtered/name/${e.target.value}`);
        const nameResult = await nameData.json();
        props.setData(nameResult);
    }

    const handleOnChangeLevel = async (e) => {
        if(e.target.value.length <= thresholdForSearchLength) {
            return;
        }
        const levelData = await fetch(`/api/filtered/level/${e.target.value}`);
        const levelResult = await levelData.json();
        props.setData(levelResult);
    }

    const handleOnChangePosition = async(e) => {
        if(e.target.value.length <= thresholdForSearchLength) {
            return;
        }
        const positionData = await fetch(`/api/filtered/position/${e.target.value}`);
        const positionResult = await positionData.json();
        props.setData(positionResult);
    }

    return ( 
        <div>
            <input placeholder="filter for name" onChange={handleOnChangeName}></input>
            <input placeholder="filter for level" onChange={handleOnChangeLevel}></input>           
            <input placeholder="filter for position" onChange={handleOnChangePosition}></input>
        </div>
    );
}

 
export default FilterEmployees;