"use strict";
// Code disponible sur http://github.com/maix0/mazegenerator
// L'algorithm utilisé expliqué (en anglais) ici: https://www.youtube.com/watch?v=Y37-gB83HKE
/*
Il y a deux class: Cell et Maze,
La class Cell represente une seul case. Quand elle est crée, elle a des "murs" sur tout ses coté.
Une cellule sais si elle a deja été visiter par l'algoritm.

La class Maze est une liste de cellule avec des fonctions qui permettes d'interagire avec cette liste.
Elle represente des valeurs utiliser pour affiche le labyrinte, telle que la couleur des murs, ou la couleur du fonts des cellules.

Un fonction "generateMaze()" va creer un labyrinte. Pour cela, elle initialise les variable "currentStack" et "nVisitedCells"
"currentStack" represente la case actuel et "nVisitedCells" est le compeur utiliser par l'algorithm, qui compte le nombre de case visité.

Pour generer le labyrinte, l'algorithme va choisir un case de depart, aléatoirement, la metre sur le stack ("currentStack"),
regarder pour des case voisine vide. Si il en trouve une, il crée une liaison avec, initialise la case voisine avec des les bonne
valeur (liaison) et augmenter  le nombre de case visiter de 1 ("nVisitedCells"). L'agloritme va repeter ces actions avec la nouvelle cellules. Si aucune case voisine n'est vide, l'algorithm va retirer une valeur du stack (il va revenir en arriere) et va regarder pour des case vide. il va faire tant qu'il ne trouve aucune case vide.
Ceci s'arrete losque nVisitiedCells est equal au nombre de cellules du labyrinte.
*/
let canvas = document.getElementById("mainCavas");
let context = canvas.getContext('2d');
const timeStep = 0;
let currentMaze;
let currentStack;
let nVisitedCells;
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.filled = false;
    }
    setFilled() {
        this.filled = true;
        this.dirs = {
            north: false,
            south: false,
            west: false,
            east: false,
        };
    }
    setDir(dir, open) {
        if (!this.dirs)
            this.setFilled();
        this.dirs[dir] = open;
    }
}
class Maze {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.id = Math.floor(Math.random() * 10000).toString(16);
        this.cellSize = 45;
        this.bgColor = "#8B4513";
        this.bgColorStart = "#00BA03";
        this.bgColorEnd = "#B20000";
        this.wallColor = "#FFFFFF";
        this.finished = false;
        console.log(width, height);
        this.cells = new Array(width * height);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.cells[y * this.height + x] = new Cell(x, y);
            }
        }
    }
    canvasSettings(canvas) {
        canvas.height = this.cellSize * this.height;
        canvas.width = this.cellSize * this.width;
    }
    draw(ctx) {
        this.cells.forEach((cell, index) => {
            let x = cell.x * this.cellSize;
            let y = cell.y * this.cellSize;
            if (cell.filled) {
                if (this.end && (this.end.x === cell.x) && (this.end.y == cell.y)) {
                    ctx.fillStyle = this.bgColorEnd;
                }
                else if (this.start && (this.start.x === cell.x) && (this.start.y == cell.y)) {
                    ctx.fillStyle = this.bgColorStart;
                }
                else {
                    ctx.fillStyle = this.bgColor;
                }
                ctx.fillRect(x, y, this.cellSize, this.cellSize);
                if (!cell.dirs.east) {
                    ctx.fillStyle = this.wallColor;
                    ctx.fillRect(x + this.cellSize - (this.cellSize * 0.04), y, this.cellSize * 0.04, this.cellSize);
                }
                if (!cell.dirs.west) {
                    ctx.fillStyle = this.wallColor;
                    ctx.fillRect(x, y, this.cellSize * 0.04, this.cellSize);
                }
                if (!cell.dirs.north) {
                    ctx.fillStyle = this.wallColor;
                    ctx.fillRect(x, y, this.cellSize, this.cellSize * 0.04);
                }
                if (!cell.dirs.south) {
                    ctx.fillStyle = this.wallColor;
                    ctx.fillRect(x, y + this.cellSize - (this.cellSize * 0.04), this.cellSize, this.cellSize * 0.04);
                }
                ctx.fillStyle = this.wallColor;
                ctx.fillRect(x, y, this.cellSize * 0.04, this.cellSize * 0.04); //TOP LEFT
                ctx.fillRect(x + this.cellSize - (this.cellSize * 0.04), y, this.cellSize * 0.04, this.cellSize * 0.04); //TOP RIGHT
                ctx.fillRect(x, y + this.cellSize - (this.cellSize * 0.04), this.cellSize * 0.04, this.cellSize * 0.04); //BOTTOM LEFT
                ctx.fillRect(x + this.cellSize - (this.cellSize * 0.04), y + this.cellSize - (this.cellSize * 0.04), this.cellSize * 0.04, this.cellSize * 0.04); //BOTTOM RIGHT
            }
        });
    }
    changeCellSize(size) {
        if (size < 9)
            return;
        this.cellSize = size;
        this.canvasSettings(canvas);
    }
    getCell(x, y) {
        return this.cells[y * this.width + x];
    }
}
function generateMaze(maze) {
    let rExit = false;
    maze.canvasSettings(canvas);
    currentStack = [{
            x: Math.floor(Math.random() * maze.width),
            y: Math.floor(Math.random() * maze.height)
        }];
    nVisitedCells = 1;
    setTimeout(() => {
        nextStep(maze, currentStack, nVisitedCells, rExit);
    }, 1);
}
function nextStep(maze, stack, nCellVisited, rExit) {
    if (currentMaze.id !== maze.id)
        return;
    nVisitedCells = nCellVisited;
    function generateExit() {
        let x = 0, y = 0;
        let dir;
        if (Math.random() < 0.5) { // ON THE TOP OR BOTTOM
            if (Math.random() < 0.5) { //TOP
                x = Math.floor(Math.random() * maze.width);
                dir = "north";
            }
            else { //BOTTOM
                x = Math.floor(Math.random() * maze.width);
                y = maze.height - 1;
                dir = "south";
            }
        }
        else { // ON THE SIDES
            if (Math.random() < 0.5) { //LEFT
                y = Math.floor(Math.random() * maze.height);
                dir = "west";
            }
            else { //RIGHT
                y = Math.floor(Math.random() * maze.height);
                x = maze.width - 1;
                dir = "east";
            }
        }
        return {
            pos: {
                y: y,
                x: x
            },
            dir: dir
        };
    }
    maze.draw(context);
    if (nCellVisited < maze.width * maze.height) {
        let cell = maze.cells[stack[stack.length - 1].y * maze.height + stack[stack.length - 1].x];
        let neighbour = {
            north: cell.y > 0 ? maze.cells[(cell.y - 1) * maze.height + cell.x] : null,
            south: cell.y < maze.height + 1 ? maze.cells[(cell.y + 1) * maze.height + cell.x] : null,
            west: cell.x > 0 ? maze.cells[cell.y * maze.height + (cell.x - 1)] : null,
            east: cell.x < maze.width - 1 ? maze.cells[cell.y * maze.height + (cell.x + 1)] : null,
        };
        if (neighbour.north || neighbour.south || neighbour.west || neighbour.east) {
            Object.keys(neighbour).forEach(dir => {
                if (!neighbour[dir]) {
                    delete neighbour[dir];
                    return;
                }
                if (neighbour[dir].filled) {
                    delete neighbour[dir];
                    return;
                }
            });
            if (Object.keys(neighbour).length) {
                let nIndex = Math.floor(Math.random() * Object.keys(neighbour).length);
                let nextNeighourPos = Object.keys(neighbour)[nIndex];
                let nextNeighour = maze.cells[neighbour[nextNeighourPos].y * maze.height + neighbour[nextNeighourPos].x];
                cell.setDir(nextNeighourPos, true);
                switch (nextNeighourPos) {
                    case "north":
                        nextNeighour.setFilled();
                        nextNeighour.setDir("south", true);
                        break;
                    case "south":
                        nextNeighour.setFilled();
                        nextNeighour.setDir("north", true);
                        break;
                    case "west":
                        nextNeighour.setFilled();
                        nextNeighour.setDir("east", true);
                        break;
                    case "east":
                        nextNeighour.setFilled();
                        nextNeighour.setDir("west", true);
                        break;
                }
                nCellVisited++;
                stack.push({
                    x: nextNeighour.x,
                    y: nextNeighour.y
                });
            }
            else {
                stack.pop();
            }
        }
        setTimeout(() => {
            nextStep(maze, stack, nCellVisited, rExit);
        }, 0);
    }
    else {
        if (rExit) {
            let start = generateExit();
            let end = generateExit();
            while (start.pos.x === end.pos.x && start.pos.y === end.pos.y) {
                end = generateExit();
            }
            maze.cells[start.pos.y * maze.height + start.pos.x].setDir(start.dir, true);
            maze.cells[end.pos.y * maze.height + end.pos.x].setDir(end.dir, true);
            maze.start = {
                y: start.pos.y,
                x: start.pos.x
            };
            maze.end = {
                y: end.pos.y,
                x: end.pos.x
            };
        }
        else {
            maze.cells[0].setDir("west", true);
            maze.cells[maze.cells.length - 1].setDir("east", true);
            maze.start = {
                x: maze.cells[0].x,
                y: maze.cells[0].y
            };
            maze.end = {
                x: maze.cells[maze.cells.length - 1].x,
                y: maze.cells[maze.cells.length - 1].y
            };
        }
        maze.draw(context);
        currentMaze = maze;
    }
    user.draw(context);
}
function createMaze() {
    currentMaze = new Maze(15, 15);
    generateMaze(currentMaze);
}
class User {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    handle_movement(mouv) {
        let cell = currentMaze.getCell(this.x, this.y);
        // console.table([{cell, x:this.x, y:this.y}], ["cell", "x", "y"])
        console.log(`cell.dirs[${mouv}] = `, cell.dirs[mouv]);
        if (cell.dirs[mouv]) {
            switch (mouv) {
                case "east":
                    this.x += 1;
                    break;
                case "west":
                    this.x -= 1;
                    break;
                case "north":
                    this.y -= 1;
                    break;
                case "south":
                    this.y += 1;
                    break;
            }
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x >= currentMaze.width) {
            this.x = currentMaze.width - 1;
        }
        if (this.y >= currentMaze.height) {
            this.y = currentMaze.height - 1;
        }
        this.draw(context);
    }
    draw(ctx) {
        currentMaze.draw(ctx);
        ctx.fillStyle = "#1E1E1E";
        ctx.fillRect(this.x * currentMaze.cellSize + currentMaze.cellSize * 0.4, this.y * currentMaze.cellSize + currentMaze.cellSize * 0.4, currentMaze.cellSize * (1 - 0.4 - 0.4), currentMaze.cellSize * (1 - 0.4 - 0.4));
    }
}
createMaze();
let user = new User();
document.onkeydown = checkKey;
function checkKey(e) {
    if (!user)
        return;
    e = e || window.event;
    if (e.keyCode == '38') {
        user.handle_movement("north");
    }
    else if (e.keyCode == '40') {
        user.handle_movement("south");
    }
    else if (e.keyCode == '37') {
        user.handle_movement("west");
    }
    else if (e.keyCode == '39') {
        user.handle_movement("east");
    }
}
