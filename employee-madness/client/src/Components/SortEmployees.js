const SortEmployees = (props) => {

    const handleOnClickName = async () => {
        const nameData = await fetch("/api/sorted/name");
        const nameResult = await nameData.json();
        props.setData(nameResult);
    }

    const handleOnClickLevel = async () => {
        const levelData = await fetch("/api/sorted/level");
        const levelResult = await levelData.json();
        props.setData(levelResult);
    } 

    const handleOnClickPosition = async () => {
        const positionData = await fetch("/api/sorted/position");
        const positionResult = await positionData.json();
        props.setData(positionResult);
    } 

    return ( 
        <div> Sort for:
            <button onClick={handleOnClickName}>Name</button>
            <button onClick={handleOnClickLevel}>Level</button>
            <button onClick={handleOnClickPosition}>Position</button>
        </div>
     );
}
 
export default SortEmployees;