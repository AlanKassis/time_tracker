//imports && constants
const readline = require('readline')
var fs = require('fs').promises


//handle input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Use recursive loop to track when the user is coding
 function recursiveAsyncReadline(startingTime) {  
rl.question("Are you finished for this session? \n answer Y/N \n", answer => {
    answer = answer.toUpperCase()
     switch (answer) {
        case 'Y': {
        console.log("Closing program")
        endRecording(startingTime);
        return rl.close(); 
                }
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
    let current_time_100 = (hours*100)+minutes
    let time_obj = {
      timeStr : current_time,
      timeNum : current_time_100
    }
    return time_obj
}
function diff(s1, s2) {
  // change string (eg. 2:21 --> 221, 00:23 --> 23)
  // difference between hours
  time1 = s1
  time2 = s2
  hourDiff =(time2 / 100 - time1 / 100 - 1);

  // difference between minutes
  minDiff = (time2 % 100) + (60 - (time1 % 100));

  if (minDiff >= 60) {
    hourDiff++;
    minDiff = minDiff - 60;
  }

  // convert answer again in string with ':'
  res = hourDiff >= 1 ? hoursDiff.toString() + ":" + minDiff.toString() : `zero hours & ${minDiff.toString()} minutes \n`
  return res;
}
 
//data storing logic
async function recordHours() { 
  let startTime = getCurrent_Time()
  startRecording(startTime)
  recursiveAsyncReadline(startTime)
}
async function startRecording(startTime) { 
     try {
       await fs.writeFile(
         "Hours Spent Programming.txt",
          `Beginning Time:${startTime.timeStr} \n`,
         { flag: "a" }
       );
     } catch (e) {
       console.error(e.message);
     }
}
async function endRecording(startingTime) {
   let endingTime = getCurrent_Time();
  let timeDiff = diff(startingTime.timeNum, endingTime.timeNum)
  console.log(timeDiff)
        try {
          await fs.writeFile(
            "Hours Spent Programming.txt",
             `Ending Time: ${endingTime.timeStr} \n
             Time spent: ${timeDiff}`,
            { flag: "a" }
          );
        } catch (e) {
          console.error(e.message);
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
