function  GenerateWinCombination(numCilinder, numPlayingSymbPerCilinder, totalSymb) {

    this.numCilinder = numCilinder;
    this.numPlayingSymbPerCilinder = numPlayingSymbPerCilinder;
    this.totalSymb = totalSymb;

    // this.totalRound = 0;

    this.bet = 10;
    this.maxBet = 1000;
    this.minBet = 10;
    this.isMaxBet = false;
    this.isMinBet = true;

    this.totalScore = 250250;

    this.stopPositionArray = [];

    this.payTable = [
        [  0 ,  25 ,  100 , 1000 , 5000 ], // SYMB_Square
        [  0 ,  25 ,   50 ,  200 ,  500 ], // SYMB_Diamond
        [  0 ,  25 ,   50 ,  100 ,  200 ], // SYMB_Pad
        [  0 ,  25 ,   50 ,  100 ,  200 ], // SYMB_Bar
        [  0 ,  25 ,   50 ,  100 ,  200 ], // SYMB_Bell
        [  0 ,  25 ,   50 ,  100 ,  200 ], // SYMB_Coins
        [  0 ,  25 ,   50 ,  100 ,  200 ], // SYMB_Horseshoe
        [  0 ,  25 ,   50 ,  100 ,  200 ], // SYMB_Crown
        [  0 ,  25 ,   50 ,  100 ,  200 ], // SYMB_Clover
        [  0 ,  15 ,   30 ,  100 ,  120 ], // SYMB_Cherry
        [  0 ,  25 ,   50 ,  200 ,  500 ], // SYMB_Grapes
        [  0 ,  25 ,   50 ,  100 ,  200 ], // SYMB_Strawberry
    ];

    this.freeSpinSymb = 7;
    this.numFreeSpinSymb = 0;
    this.numFreeSpin = 0;
    this.boolFreeSpin = false;
    this.numFreeSpinToRound = 2;

   /* this.r = [
        [ 3, 3, 3, 2, 0, 2, 2, 7, 5, 5, 6, 6, 6, 5, 5, 5, 1, 1, 4, 1, 4, 4, 4, 3, 0 ],
        [ 3, 3, 3, 3, 4, 4, 4, 2, 4, 2, 2, 5, 0, 5, 5, 5, 1, 1, 0, 1, 6, 6, 6, 6, 7 ],
        [ 3, 3, 3, 2, 2, 6, 2, 5, 5, 5, 0, 5, 6, 6, 6, 7, 4, 4, 4, 0, 4, 1, 1, 3, 1 ],
        [ 3, 3, 3, 1, 1, 0, 4, 4, 4, 4, 0, 4, 3, 3, 7, 2, 2, 5, 5, 5, 6, 5, 6, 6, 6 ],
        [ 3, 3, 3, 5, 5, 5, 1, 1, 4, 7, 4, 4, 4, 7, 4, 3, 3, 5, 0, 6, 6, 6, 2, 2, 0 ]
    ];*/
  /*  this.r = [
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
        [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ]
    ];*/
    this.r = [
        [ 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0 ],
        [ 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1 ],
        [ 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2 ],
        [ 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0 ],
        [ 1, 0, 1, 0, 2, 0, 2, 0, 1, 0, 1, 0, 2, 0, 2, 0, 1, 0, 1, 0, 2, 0, 2, 0, 1 ]
    ];

    this.arrayCombination = [];
    for (var j = 0; j < this.numCilinder; j++ ) {
        this.arrayCombination[j]=[];
    }
    this.moveArrayFreeSpinSymb = [];
    for (var j = 0; j < this.numCilinder; j++ ) {
        this.moveArrayFreeSpinSymb[j] = [];
    }

    this.maskWinLine = [
        [1,1,1,1,1],
        [0,0,0,0,0],
        [2,2,2,2,2],
        [0,1,2,1,0],
        [2,1,0,1,2],
        [0,0,1,0,0],
        [2,2,1,2,2]
    ];

    this.winLineNum = this.maskWinLine.length;

    this.numSymbline = [];
    for (var j = 0; j < this.winLineNum; j++ ) {
        this.numSymbline[j] = 0;
    }

    this.numWinSymbline = [];
    for (var j = 0; j < this.winLineNum; j++ ) {
        this.numWinSymbline[j] = 0;
    }

    this.firstSymbline = [];
    for (var j = 0; j < this.winLineNum; j++ ) {
        this.firstSymbline[j] = 0;
    }

    this.winLineArray = [];
    for (var j = 0; j < this.winLineNum; j++ ) {
        this.winLineArray[j]=[];
    }

    this.moveArray = [];
    for (var j = 0; j < this.maskWinLine.length; j++ ) {
        this.moveArray[j] = [];
        for (var i = 0; i < this.maskWinLine[j].length; i++ ) {
            this.moveArray[j][i] = [0, 0, 0];
        }
    }
}

GenerateWinCombination.prototype.constructor = GenerateWinCombination;

function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min);
    rand = Math.floor(rand);
    return rand;
}

GenerateWinCombination.prototype.placeBet = function() {
    this.totalScore -= this.bet;
};

GenerateWinCombination.prototype.gettingWinnings = function() {
    this.totalScore += this.getTotalRound();
    this.numSymbline = [];
    for (var j = 0; j < this.winLineNum; j++ ) {
        this.numSymbline[j] = 0;
    }
};

GenerateWinCombination.prototype.toIncreaseBet = function() {
   this.bet = this.bet < this.maxBet * 0.1 ? this.bet += 10 : this.bet < this.maxBet * 0.5 ? this.bet += 50 : this.bet < this.maxBet ? this.bet += 100 : this.maxBet;
   this.isMaxBet = this.bet === this.maxBet;
   this.isMinBet = false;
};

GenerateWinCombination.prototype.reduceBet = function() {
    this.bet = this.bet > this.maxBet * 0.5 ? this.bet -= 100 : this.bet > this.maxBet * 0.1 ? this.bet -= 50 : this.bet > this.minBet ? this.bet -= 10 : this.minBet;
    this.isMinBet = this.bet === this.minBet;
    this.isMaxBet = false;
};

GenerateWinCombination.prototype.setMaxBet = function() {
    this.bet = this.maxBet;
    this.isMaxBet = true;
    this.isMinBet = false;
};

GenerateWinCombination.prototype.generate = function() {
    this.numFreeSpinSymb = 0;
    this.boolPlusFreeSpin = false;
    for (var j = 0; j < this.numCilinder; j++ ) {
        var stopPosition = randomInteger(0, this.r[0].length - 1);
        this.stopPositionArray[j] = stopPosition;
        for (var i = 0; i < this.numPlayingSymbPerCilinder; i++ ) {
           this.arrayCombination[j][i] = this.r[j][(stopPosition > 0) ? stopPosition + i - 1 : (i > 0) ? stopPosition + i - 1 : this.r[0].length - 1 ];
           // this.arrayCombination[j][i] = 0;
           if (this.arrayCombination[j][i] == this.freeSpinSymb) {
               this.moveArrayFreeSpinSymb[j][i] = 1;
               this.numFreeSpinSymb++;
           } else {
               this.moveArrayFreeSpinSymb[j][i] = 0;
           }
        }
    }
    console.log("=================================");
    if (this.numFreeSpinSymb >= 3) {
        this.numFreeSpin += this.numFreeSpinToRound;
        console.log("FreeSpin: Yes - ", this.numFreeSpin);
        console.log("Move Array Free Spin Symb", this.moveArrayFreeSpinSymb);
        this.numFreeSpinSymb = 0;
    }
    if (this.numFreeSpin <= 0) {
        console.log("FreeSpin: No");
        this.numFreeSpinSymb = 0;
    }

    console.log("Stop Position Array", this.stopPositionArray);
    // console.log("this.arrayCombination", this.arrayCombination);
    this.winLine(this.arrayCombination);
    this.winLineRound();
    this.moveWinLine();
    return this.arrayCombination;
};

GenerateWinCombination.prototype.winLine = function(arrayCombination) {
    for (var j = 0; j < this.maskWinLine.length; j++ ) {
        for (var i = 0; i < this.maskWinLine[j].length; i++) {
            this.winLineArray[j][i] = arrayCombination[i][this.maskWinLine[j][i]];
        }
    }

    console.log("Line Array", this.winLineArray);
};

GenerateWinCombination.prototype.winLineRound = function() {
    for (var j = 0; j < this.winLineArray.length; j++ ) {
        this.firstSymbline[j] = this.winLineArray[j][0];
        for (var i = 0; i < this.winLineArray[j].length-1; i++) {
            if (this.winLineArray[j][i] == this.winLineArray[j][i + 1] && this.winLineArray[j][i] == this.firstSymbline[j]) {
                this.numSymbline[j]++;
            } else {
                break;
            }
        }
    }
    // console.log("this.firstSymbline", this.firstSymbline);
    // console.log("this.numSymbline", this.numSymbline);
};

GenerateWinCombination.prototype.moveWinLine = function() {
    for (var j = 0; j < this.maskWinLine.length; j++ ) {
        for (var i = 0; i < this.maskWinLine[j].length; i++ ) {
            if (this.payTable[this.firstSymbline[j]][this.numSymbline[j]] > 0) {
               this.moveArray[j][i][this.maskWinLine[j][i]] = (i <= this.numSymbline[j] && this.numSymbline[j] > 0) ? 1 : 0;
               this.numWinSymbline[j] = 1;
            } else {
                this.moveArray[j][i][this.maskWinLine[j][i]] = 0;
                this.numWinSymbline[j] = 0;
            }
        }
    }

    console.log("Move Array", this.moveArray);
    console.log("Num Win Symb line", this.numWinSymbline);
};

GenerateWinCombination.prototype.getTotalRound = function() {
    var totalRound = 0;
    for (var i = 0; i < this.numSymbline.length; i++) {
        totalRound += this.payTable[this.firstSymbline[i]][this.numSymbline[i]];
    }
    return totalRound * (this.bet / 10.0);
};


  /*[  0 ,  0 ,  100 , 1000 , 5000 ], // SYMB_Seven
    [  0 ,  0 ,   50 ,  200 ,  500 ], // SYMB_Diamond
    [  0 ,  0 ,   50 ,  200 ,  500 ], // SYMB_Grapes
    [  0 ,  0 ,   20 ,   50 ,  200 ], // SYMB_Bar
    [  0 ,  0 ,   20 ,   50 ,  200 ], // SYMB_Bell
    [  0 ,  0 ,   20 ,   50 ,  200 ], // SYMB_Strawberry
    [  0 ,  5 ,   20 ,   50 ,  200 ], // SYMB_Cherry
    [  0 ,  0 ,    2 ,   10 ,   50 ], // SYMB_Crown
    [  0 ,  0 ,    2 ,   10 ,   50 ], // SYMB_Clover
    [  0 ,  0 ,    2 ,   10 ,   50 ], // SYMB_Horseshoe
    [  0 ,  0 ,    2 ,   10 ,   50 ], // SYMB_Dice
    [  0 ,  0 ,    2 ,   10 ,   50 ], // SYMB_Coins
    [  0 ,  0 ,    2 ,   10 ,   50 ]  // SYMB_Dice*/