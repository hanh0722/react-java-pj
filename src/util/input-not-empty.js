const checkInputIsEmpty = (valueInput, conditionLength) => {
    let condition = 0;
    if(conditionLength){
        condition = conditionLength;
    }
    if(valueInput.trim().length > condition){
        return true;
    }
    return false;
}
export default checkInputIsEmpty;