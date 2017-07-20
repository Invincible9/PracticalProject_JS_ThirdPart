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
            case 'reverseArray':
                reverseArray(theArray);
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
            case "prependStart":
                let elementPrepend = commandTokens[1];
                if (elementPrepend !== undefined) {
                    prependStart(theArray, elementPrepend);
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
                break;
            case "countElement":
                break;
            case "end":
                if (commandTokens.length === 1) {
                    input.disabled = true;
                    document.getElementById('submit').disabled = true;
                    print("Finished: ");
                } else {
                    invalidCommand();
                }
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

    function print(message) {
        terminal.value += message + theArray.join(' ') + '\n';
    }

    function cannotAddEmptyElement() {
        terminal.value += 'Cannot add empty element' + '\n';
    }

})();