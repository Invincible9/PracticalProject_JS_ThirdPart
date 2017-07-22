(function () {
    // alert('Enter the input list');
    let theArray = [];
    let initialized = false;

    let terminal = document.getElementById('terminal');
    let input = document.getElementById('console');
    document.getElementById('submit').addEventListener('click', submit);
    input.addEventListener('keypress', (e) => e.code === 'Enter' ? submit() : '');
    document.getElementById('refresh').disabled = true;

    function submit() {
        let commandTokens = input.value.split(/\s+/).filter(e => e !== '');

        if (commandTokens.join(' ').trim() === ""){
           return cannotAddEmptyElement();
        }

        if(!initialized) {
            theArray = commandTokens.slice(0);
            clearField();
            initialized = true;
            terminal.value += theArray.join(' ') + '\n';
            return;
        }

        switch (commandTokens[0]) {
            case 'reverse':
                reverse(theArray);
                print("Reversed: ");
                break;
            case "appendEnd":
                let elementAppend = commandTokens[1];
                if (elementAppend !== undefined) {
                    appendEnd(theArray, elementAppend);
                    print("Append: ");
                } else {
                    cannotAddEmptyElement();
                }
                break;
                break;
            case "prepend":
                let elementPrepend = commandTokens[1];
                if (elementPrepend !== undefined) {
                    prepend(theArray, elementPrepend);
                    print("Prepend: ");
                } else {
                    cannotAddEmptyElement();
                }
                break;
            case "insertAt":
                let indexInsert = commandTokens[1];
                let newString = commandTokens.splice(2).filter(e => e !== '').join(" ");
                if(theArray === undefined || newString === undefined || typeof newString !== "string" || newString.trim() === ""){
                    invalidCommand();
                }else if (indexInsert > theArray.length - 1 || indexInsert < 0){
                    terminal.value += `Error: Invalid index ${indexInsert}` + '\n';
                }else {
                    insertAt(theArray, indexInsert, newString);
                    print("InsertAt: ");
                }
                break;
            case "deleteAt":
                let indexDelete = Number(commandTokens[1]);
                if(commandTokens[1] === undefined) {
                    invalidCommand();
                }else if (indexDelete > theArray.length - 1 || indexDelete < 0){
                    terminal.value += `Error: Invalid index ${indexDelete}` + '\n';
                }else {
                    deleteAt(theArray, indexDelete);
                    print("DeleteAt: ");
                }
                break;
            case "rollLeft":
                theArray = rollLeft(theArray);
                print("Rolled Left: ");
                break;
            case "rollRight":
                theArray = rollRight(theArray);
                print("Rolled Right: ");
                break;
            case "sort":
                if(commandTokensValidate(commandTokens,2)){
                    theArray = theArray.sort();
                    print("Sorted: ");
                }
                break;
            case "countElement":
                if(commandTokensValidate(commandTokens,3,1)){
                    let count = countElement(theArray,commandTokens[1]);
                    terminal.value+= `Count: ${count}\n`;
                }
                break;
            case "end":
                if (commandTokens.length === 1) {
                    input.disabled = true;
                    document.getElementById('submit').disabled = true;
                    print("Finished: ");
                } else {
                    invalidCommand();
                }
                startAgain();
                break;
            default:
                invalidCommand();
                break;
        }

        clearField();
    }

    function clearField() {
        return input.value = '';
    }

    function invalidCommand() {
        terminal.value += 'Error: invalid command' + '\n';
    }
    function commandTokensValidate(commandTokens,lessThan,greaterThan){
        console.log(commandTokens.length>=lessThan);
        if(commandTokens.length>=lessThan || commandTokens.length<=greaterThan){
            terminal.value += "Error: invalid command parameters\n";
            return false;
        }
        return true;
    }
    function print(message) {
        terminal.value += message + theArray.join(' ') + '\n';
    }

    function cannotAddEmptyElement() {
        terminal.value += 'Cannot add empty element' + '\n';
    }

    function startAgain() {
        document.getElementById('refresh').style.color = "blue";
        document.getElementById('refresh').disabled = false;
        document.getElementById('refresh').addEventListener('click', function () {
            input.disabled = false;
            document.getElementById('submit').disabled = false;
            terminal.value = '';
            initialized = false;
            document.getElementById('refresh').disabled = true;
            document.getElementById('refresh').style.color = "black";
        });
    }

})();