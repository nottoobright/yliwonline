var lastClicked;
var grid = clickableGrid(75, 52, function(el, row, col, week) {
    console.log("You clicked on element:", el);
    console.log("You clicked on row:", row + 1);
    console.log("You clicked on col:", col + 1);
    console.log("You clicked on week #:", week);

    el.className = 'clicked';
    if (lastClicked) lastClicked.className = '';
    lastClicked = el;
    alert("You are on week " + week);
});


document.body.appendChild(grid);

function clickableGrid(rows, cols, callback) {
    var i = 0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.id = 'gradi'
    for (var r = 0; r < rows; ++r) {
        var tr = grid.appendChild(document.createElement('tr'));
        var rew = grid.appendChild(document.createElement('p'));
        rew.className = "leftnos";
        for (var ro = 0; ro < 76; ++ro) {
            rew.innerHTML = r + 1;
        }
        for (var c = 0; c < cols; ++c) {
            var cell = tr.appendChild(document.createElement('button'));
            var i = i + 1;
            cell.addEventListener('click', (function(el, r, c, i) {
                return function() {
                    callback(el, r, c, i);
                }
            })(cell, r, c, i), false);
        }
    }
    return grid;
}