let boxes = document.querySelectorAll(".box");
// Initialising the variables(X:default for user)
        let symbolSelect = document.getElementById("symbol");
        let userSymbol = "X";
        let compSymbol = "O";
        let turn = userSymbol;
        let isGameOver = false;

//changing of symbol according to user
        symbolSelect.addEventListener("change", () => {
            if (symbolSelect.value === "X") {
                userSymbol = "X";
                compSymbol = "O";
            } else {
                userSymbol = "O";
                compSymbol = "X";
            }
            turn = userSymbol;
        });

        boxes.forEach(e =>{
            e.innerHTML = ""
            e.addEventListener("click", ()=>{
                if(!isGameOver && e.innerHTML === ""){
                    e.innerHTML = turn;
                    cWin();
                    cDraw();
                    cTurn();
                    if (!isGameOver && turn === compSymbol) {
                        compMove();
                    }
                }
            })
        })

// Function for changing chances during game
        function cTurn(){
            turn = (turn === userSymbol) ? compSymbol : userSymbol;
        }

// Function for the winning party in the game i.e user/comp depends upon who has selected the the symbol("X/O") 
        function cWin(){
            let winC = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ]
            for(let i = 0; i<winC.length; i++){
                let v0 = boxes[winC[i][0]].innerHTML;
                let v1 = boxes[winC[i][1]].innerHTML;
                let v2 = boxes[winC[i][2]].innerHTML;

                if(v0 != "" && v0 === v1 && v0 === v2){
                    isGameOver = true;
                    document.querySelector("#op").innerHTML = turn + " Won!!";
                    document.querySelector("#reset").style.display = "inline";
                    
                    
                    for(j = 0; j<3; j++){
                        boxes[winC[i][j]].style.backgroundColor = "cyan"
                        boxes[winC[i][j]].style.color = "black"
                    }
                }
            }
        }

// Function if the game is draw
        function cDraw(){
            if(!isGameOver){
                let isDraw = true;
                boxes.forEach(e =>{
                    if(e.innerHTML === "") isDraw = false;
                })

                if(isDraw){
                    isGameOver = true;
                    document.querySelector("#op").innerHTML = " Game Draw!!";
                    document.querySelector("#reset").style.display = "inline";
                }
            }
        }

//function for the computer to move after user has played 
        function compMove() {
            let emptyBoxes = [...boxes].filter(box => box.innerHTML === "");
            if (emptyBoxes.length > 0) {
                let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
                emptyBoxes[randomIndex].innerHTML = compSymbol;
                cWin();
                cDraw();
                cTurn();
            }
        }

//function to reset the game when it is over
        document.querySelector("#reset").addEventListener("click", ()=>{
            isGameOver = false;
            turn = userSymbol;
            document.querySelector("#op").innerHTML = "";
            document.querySelector("#reset").style.display = "none";

            boxes.forEach(e =>{
                e.innerHTML = "";
                e.style.removeProperty("background-color");
                e.style.color = "white"
            })
        })