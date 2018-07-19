  // josh added this file to test git stuff 
// check if it is morning or afternoon + convert to 12h clock

let now = new Date();
let seconds = now.getSeconds();
let minutes = now.getMinutes();
let hours = now.getHours();

  function convertTo12(hours) {
      if (hours > 12) {        
          document.getElementById("timeGreetingText").innerHTML = " Evening";
          return (hours - 12);
      } else {
          document.getElementById("timeGreetingText").innerHTML = " Morning";
          return (hours.toString());
      }
  }
  
  // output the time to the frontend
  //sara: added export keyword
  export function setTime() {
  
      if (convertTo12(hours) < 2) {
          document.getElementById("digit1").innerHTML = convertTo12(hours);
          // console.log('length less than 2');        
      } else {
          document.getElementById("digit1").innerHTML =  convertTo12(hours).toString();        
          // console.log('length more than 1');
      }
      
      if (minutes.toString().length < 2) {
          document.getElementById("digit2").innerHTML = minutes.toString();
      } else {
          document.getElementById("digit2").innerHTML = minutes;
      }
       
  }
  
//sara:comment out this one to call in index.js
// setInterval(setTime, 1000);