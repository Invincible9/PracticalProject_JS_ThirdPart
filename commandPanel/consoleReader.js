// let asd = require('../jsCommands/reverseArray');

(function () {
    // alert('Enter the input list');
    let theArray = [];
    let initialized = false;

    let terminal = document.getElementById('terminal');
    let input = document.getElementById('console');
    document.getElementById('submit').addEventListener('click', submit);
    input.addEventListener('keypress', (e) => e.code === 'Enter' ? submit() : '');

    function submit() {
        let commandTokens = input.value.split(/\s+/)
            .filter(e => e !== '');

        if (!initialized) {
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

                break;
            case "deleteAt":
                break;
            case "rollLeft":
                break;
            case "rollRight":
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