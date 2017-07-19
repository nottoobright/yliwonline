

var lastClicked;
var grid = clickableGrid(75,52,function(el,row,col,week){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row+1);
    console.log("You clicked on col:",col+1);
    console.log("You clicked on week #:",week);

    el.className='clicked';
    if (lastClicked) lastClicked.className='';
    lastClicked = el;
	alert("You are on week " + week);
});


document.body.appendChild(grid);

function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.id = 'gradi'
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        var rew = grid.appendChild(document.createElement('p'));
        rew.className = "leftnos";
        for (var ro=0;ro<76;++ro) {
        rew.innerHTML = r + 1;
    }
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('button'));
            var i = i + 1;
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}

//Get dob from the sessionStorage
var local = sessionStorage.getItem('dob');
var usrDate = new Date(local);
//Get today's date
var today = new Date();

console.log(usrDate);
console.log(today);
//Find difference by subtracting and diving by no.of milliseconds in a day
var diffBetweenDays = Math.round((today - usrDate) / (1000*60*60*24));
console.log(diffBetweenDays);

var weeksAlive = Math.floor(diffBetweenDays/7);
console.log(weeksAlive);

$(document.body).scrollTo(weeksAlive-52,1200);

// User.findOne({username: sessionStorage.getItem('usrLog')}, function (err, data) {
//   var dob = data.dob;
//   console.log(dob);
// });
