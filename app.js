//imports
const readline = require('readline')
var fs = require('fs').promises
var path = require('path');
var args = process.argv.splice(2)

//handle input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
//Program recursive loop loop
var recursiveAsyncReadline = function () {  
rl.question("Are you finished for this session? \n answer Y/N \n", answer => {
    answer = answer.toUpperCase()
     switch (answer) {
        case 'Y': 
        console.log("Closing program")
        return rl.close()
        case 'N':
        console.log('Continuing loop')
        default:
        console.log('Invalid response')
        console.clear()
        console.log("Continuing program loop")
        recursiveAsyncReadline()
    }
  })
}

//time logic
const getCurrent_Time = () => {
let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let current_time = `The time is ${hours}:${minutes}`;
return current_time
}


//data storing logic
async function recordHours() { 
    openFile("Beggining Time: ")
    recursiveAsyncReadline()
     openFile("Ending Time: ")
}
async function openFile(message) { 
    try {
        await fs.writeFile("Hours Spent Programming.txt", message + getCurrent_Time() + '\n', {flag: 'a'})
    } catch (e) {
        console.error(e.message)
    }
}
async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log(`Deleted ${filePath}`);
    } catch (e) {
        console.error(e)
    }
}
(async function () {
    await recordHours()
    // await openFile();
    // await deleteFile("Hours Record");
})();
