/*jslint devel: true */

var model = {
    Cell: function (x, y, state = 0) {
        this.x = x;
        this.y = y;
        this.state = state;
    },
    boardSize: 70,
    board: {
        cells: [],
        initBoard: function () {
            "use strict";
            var i;
            for (i = 0; i < model.boardSize; i = i + 1) {
                model.board.cells[i] = [];
            }
        },
        fillBoard: function () {
            "use strict";
            model.board.initBoard();
            var i, j, cell;
            for (i = 0; i < model.boardSize; i = i + 1) {
                for (j = 0; j < model.boardSize; j = j + 1) {
                    cell = new model.Cell(i, j);
                    model.board.cells[i][j] = cell;
                }
            }
        },
        getCell: function (x, y) {
            "use strict";
            return model.board.cells[x][y];
        },
        setCellState: function (x, y, state) {
            "use strict";
            var cell = model.board.cells[x][y];
            cell.state = state;
        },
        getAllNeighbors: function (x, y) {
            "use strict";
            var t = [];
            if (y - 1 >= 0) {
                t[t.length] = model.board.cells[x][y - 1];
            }
            if (y + 1 < model.boardSize) {
                t[t.length] = model.board.cells[x][y + 1];
            }
            if (x + 1 < model.boardSize) {
                t[t.length] = model.board.cells[x + 1][y];
                if (y - 1 >= 0) {
                    t[t.length] = model.board.cells[x + 1][y - 1];
                }
                if (y + 1 < model.boardSize) {
                    t[t.length] = model.board.cells[x + 1][y + 1];
                }
            }
            if (x - 1 >= 0) {
                t[t.length] = model.board.cells[x - 1][y];
                if (y - 1 >= 0) {
                    t[t.length] = model.board.cells[x - 1][y - 1];
                }
                if (y + 1 < model.boardSize) {
                    t[t.length] = model.board.cells[x - 1][y + 1];
                }
            }
            return t;
        },
        getAliveNeighbors: function (x, y) {
            "use strict";
            var cell, t = [];
            if (y - 1 >= 0) {
                cell = model.board.cells[x][y - 1];
                if (cell.isAlive()) {
                    t[t.length] = cell;
                }
            }
            if (y + 1 < model.boardSize) {
                cell = model.board.cells[x][y + 1];
                if (cell.isAlive()) {
                    t[t.length] = cell;
                }
            }
            if (x + 1 < model.boardSize) {
                cell = model.board.cells[x + 1][y];
                if (cell.isAlive()) {
                    t[t.length] = cell;
                }
                if (y - 1 >= 0) {
                    cell = model.board.cells[x + 1][y - 1];
                    if (cell.isAlive()) {
                        t[t.length] = cell;
                    }
                }
                if (y + 1 < model.boardSize) {
                    cell = model.board.cells[x + 1][y + 1];
                    if (cell.isAlive()) {
                        t[t.length] = cell;
                    }
                }
            }
            if (x - 1 >= 0) {
                cell = model.board.cells[x - 1][y];
                if (cell.isAlive()) {
                    t[t.length] = cell;
                }
                if (y - 1 >= 0) {
                    cell = model.board.cells[x - 1][y - 1];
                    if (cell.isAlive()) {
                        t[t.length] = cell;
                    }
                }
                if (y + 1 < model.boardSize) {
                    cell = model.board.cells[x - 1][y + 1];
                    if (cell.isAlive()) {
                        t[t.length] = cell;
                    }
                }
            }
            return t;
        },
        getNbAliveNeighbors: function (x, y) {
            "use strict";
            var cell, count = 0;
            if (y - 1 >= 0) {
                cell = model.board.cells[x][y - 1];
                if (cell.isAlive()) {
                    count = count + 1;
                }
            }
            if (y + 1 < model.boardSize) {
                cell = model.board.cells[x][y + 1];
                if (cell.isAlive()) {
                    count = count + 1;
                }
            }
            if (x + 1 < model.boardSize) {
                cell = model.board.cells[x + 1][y];
                if (cell.isAlive()) {
                    count = count + 1;
                }
                if (y - 1 >= 0) {
                    cell = model.board.cells[x + 1][y - 1];
                    if (cell.isAlive()) {
                        count = count + 1;
                    }
                }
                if (y + 1 < model.boardSize) {
                    cell = model.board.cells[x + 1][y + 1];
                    if (cell.isAlive()) {
                        count = count + 1;
                    }
                }
            }
            if (x - 1 >= 0) {
                cell = model.board.cells[x - 1][y];
                if (cell.isAlive()) {
                    count = count + 1;
                }
                if (y - 1 >= 0) {
                    cell = model.board.cells[x - 1][y - 1];
                    if (cell.isAlive()) {
                        count = count + 1;
                    }
                }
                if (y + 1 < model.boardSize) {
                    cell = model.board.cells[x - 1][y + 1];
                    if (cell.isAlive()) {
                        count = count + 1;
                    }
                }
            }
            return count;
        },
        nextGeneration: function () {
          "use strict";
          var cell, liveNeighbors = 0, size = model.boardSize;
          // next generation board
          var next = [];
          for (var i = 0; i < size; i++) {
            next[i] = [];
          }
          for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
              cell = model.board.cells[i][j];
              var c = new model.Cell(i, j, cell.state);
              liveNeighbors = model.board.getNbAliveNeighbors(i, j);
              if (cell.isAlive()) {
                if ((liveNeighbors < 2) || (liveNeighbors > 3)) {
                  //cell.die();
                  c.die();
                }
              } else {
                if (liveNeighbors == 3) {
                  //cell.wakeUp();
                  c.wakeUp();
                }
              }
              next[i][j] = c;
            }
          }
          model.board.cells = next;
        }
    }
};
model.Cell.prototype.isAlive = function () {
    "use strict";
    return (this.state !== 0);
};
model.Cell.prototype.wakeUp = function () {
    "use strict";
    this.state = 1;
};
model.Cell.prototype.die = function () {
    "use strict";
    this.state = 0;
};
model.Cell.prototype.toggleState = function () {
    "use strict";
    this.state = ((this.state == 1) ? 0 : 1);
};


var view = {
  initGamePanel: function () {
    var board = document.getElementById("board");
    var boardSize = octopus.getBoardSize();
    var table = "<table>";
    for (var i = 0; i < boardSize; i++) {
      table = table + "<tr>";
      for (var j = 0; j < boardSize; j++) {
        var id = i + "-" + j;
        var td = document.createElement("td");
        td.setAttribute("id", id);
        td.setAttribute("onclick", "eventHandler.handleCellClick(\'" + id + "\')");
        var tmp = document.createElement("div");
        tmp.appendChild(td);
        tdToString = tmp.innerHTML;
        table = table + tdToString;
      }
      table = table + "</tr>";
    }
    var table = table + "</table>";
    board.innerHTML = table;
  },
  toggleClass: function (id){
    var td = document.getElementById(id);
    if (td.getAttribute("class") == "alive") {
      td.removeAttribute("class");
    } else {
      td.setAttribute("class", "alive");
    }
  },
  updateCell: function (x, y, state) {
    var td = document.getElementById(x + "-" + y);
    if (state == 0) {
      td.removeAttribute("class");
    } else {
      td.setAttribute("class", "alive");
    }
  },
  reportRunning: function (){
    document.getElementById("running").removeAttribute("class");
  },
  clearRunningMessage: function () {
    document.getElementById("running").setAttribute("class", "hidden");
  }
};

var eventHandler = {
  handleCellClick: function (id) {
    octopus.handleClick(id);
  },
  start: function () {
    octopus.autoGeneration();
  },
  stop: function () {
    octopus.stopGeneration();
  },
  step: function () {
    octopus.stepGeneration();
  },
  clear: function () {
    octopus.clearBoard();
  }
};

var octopus = {
  keepGoing: undefined,
  getBoardSize: function () {
    return model.boardSize;
  },
  handleClick: function (id) {
    //view.toggleClass(id);
    var coordinates = id.split("-");
    var x = coordinates[0];
    var y = coordinates[1];
    var cell = model.board.getCell(x, y);
    cell.toggleState();
    view.updateCell(x, y, cell.state);
  },
  autoGeneration: function (){
    octopus.stopGeneration();
    octopus.keepGoing = setInterval(function(){
      model.board.nextGeneration();
      octopus.updateBoard();
    }, 100);
    view.reportRunning();
  },
  stopGeneration: function (){
    clearInterval(octopus.keepGoing);
    view.clearRunningMessage();
  },
  stepGeneration: function (){
    model.board.nextGeneration();
    octopus.updateBoard();
  },
  updateBoard: function () {
    "use strict";
    var cell, i, j, size =  octopus.getBoardSize();
    for (i = 0; i < size; i++) {
      for (j = 0; j < size; j++) {
        cell = model.board.getCell(i, j);
        view.updateCell(i, j, cell.state);
      }
    }
  },
  clearBoard: function () {
    octopus.stopGeneration();
    octopus.initGame();
  },
  initGame: function () {
    model.board.fillBoard();
    view.initGamePanel();
  }
};

//---------Start the game ------------
window.onload = function () {
  octopus.initGame();
}
