/*
We use the same thing in a few different files.
Returns an object. 
The first element of the object is a string like 'Wed Aug 17'.
The second element of the object is a number that represents the day, like 4.
*/

module.exports.findToday = function(){
  let result = {};

  const today = (new Date()).toString().slice(0, 10); //'Wed Aug 17'
  result.today = today;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNum = daysOfWeek.indexOf(today.slice(0, 3));
  result.dayIdx = dayNum;

  return result;
};