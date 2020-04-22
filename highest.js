/* loop over array items
each line should be an item
sort and limit to number of variable imported
validate json for each of the results
spit out error if any issue
spit out all lines if no issue
*/

const fs = require('fs');
const scoreList = require('fs').readFileSync('./scores.json', 'utf-8'); //Pull list of lines
const scoreLines = scoreList.toString().split("\n"); // split on the carriage return

const scores = scoreLines.sort(function(x,y){
    var xp = x.substr(0, 7);
    var yp = y.substr(0, 7);
    return xp == yp ? 0 : yp < xp ? -1 : 1;
  }); //sort in descending order by first number

const out = (line) => {
    return fs.appendFileSync('./data.csv',line)
} // write to data file
const clean = () => {
    return fs.writeFileSync('./data.csv','');
}; // clean file from previous run

const limit = process.argv.slice(2); // grab limit from cmd line arg
const limited = scores.slice(0,limit); // slice score

const format =  async (output) => {
    const finalFormat = [];
    const formated = {};
    
    for (var i = 0, len = output.length; i < len; i++) {
        let jsonResult = JSON.parse(output[i].substring(9, output[i].length)); //grab the score
        let formatted = `{"score":${output[i].substring(0,7)},"id":${jsonResult.id}}`; //grab the json
        finalFormat.push(formatted);
    }
    
    out(finalFormat); //write to the data file
   
    return;
};

const init = async () => {
    clean(); //clean the old results
    await format(limited);
}

init();