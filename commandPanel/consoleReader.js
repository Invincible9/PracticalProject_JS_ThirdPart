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
            case 'reverse':
                reverseArray(theArray);
                print("Reversed: ");
                break;
            case "append":
                let elementAppend = commandTokens[1];
                if (elementAppend !== undefined) {
                    appendEnd(theArray, elementAppend);
                    print("Append: ");
                } else {
                    terminal.value += 'Cannot add empty element' + '\n';
                }
                break;
                break;
            case "prepend":
                let elementPrepend = commandTokens[1];
                if (elementPrepend !== undefined) {
                    prependStart(theArray, elementPrepend);
                    print("Prepend: ");
                } else {
                    terminal.value += 'Cannot add empty element' + '\n';
                }
                break;
            case "insert":

                break;
            case "delete":
                break;
            case "roll left":
                break;
            case "roll right":
                break;
            case "sort":
                break;
            case "count":
                break;
            case "end":
                if (commandTokens.length === 1) {
                    input.disabled = true;
                    document.getElementById('submit').disabled = true;
                    print("Finished: ");
                } else {
                    invalidCOmmand();
                }
                break;
            default:
                invalidCOmmand();
                break;
        }

        clearField();
    }

    function clearField() {
        return input.value = '';
    }

    function invalidCOmmand() {
        terminal.value += 'Error: invalid command' + '\n';
    }

    function print(message) {
        terminal.value += message + theArray.join(' ') + '\n';
    }

})();