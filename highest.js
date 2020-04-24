/* loop over array items
each line should be an item
sort and limit to number of variable imported
validate json for each of the results
spit out error if any issue
spit out all lines if no issue
*/

const fs = require('fs');
const limit = process.argv.slice(3)[0]; // grab limit from cmd line arg
const file = process.argv.slice(2)[0]; // grab file from cmd line arg
const scoreList = require('fs').readFileSync(`${file}`, 'utf-8'); //Pull list of lines
const scoreLines = scoreList.toString().split("\n"); // split on the carriage return

const scores = scoreLines.sort(function(x,y){
    var xp = x.substr(0,x.indexOf(':'));
    var yp = y.substr(0,y.indexOf(':'));
    return xp == yp ? 0 : yp < xp ? -1 : 1;
  }); //sort in descending order by first number

const out = (line) => {
    return fs.appendFileSync('./data.json',line)
} // write to data file
const clean = () => {
    return fs.writeFileSync('./data.json','');
}; // clean file from previous run


const limited = scores.slice(0,limit); // slice score

const format =  async (output) => {
    const finalFormat = [];
    const formated = [];
    
    for (var i = 0, len = output.length; i < len; i++) {
        let jsonResult = JSON.parse(output[i].substring(output[i].indexOf('{'), output[i].length)); //grab the score
        let formatted = `{"score":${output[i].substr(0,output[i].indexOf(':'))},"id":"${jsonResult.id}"}`; //grab the json
        finalFormat.push(formatted);
    }
    console.log(finalFormat);
    out(finalFormat); //write to the data file
   
    return;
};

const init = async () => {
    clean(); //clean the old results
    await format(limited);
}

init();