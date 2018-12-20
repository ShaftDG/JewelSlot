function TextLabel(position, scene, duration, parametres) {
    this.parametres = parametres;
    this.arrayPlaneSymbols = [];
    this.scene = scene;
    this.position = position;
    this.distanceBetweenSymbol = this.parametres.width;
    this.previousText = null;
    this.duration = duration;
    this.anchor = new BABYLON.TransformNode("");
    this.anchor.position = position;
}

TextLabel.prototype.constructor = TextLabel;

TextLabel.prototype.addPlanesSymbols = function (countSymbols) {
    var posX = (((countSymbols-1) * this.distanceBetweenSymbol)/2) /*+ this.position.x*/;
    for (var i = 0; i < countSymbols; i++) {
        var symb = new OneSymbolLabel(this.scene, this.duration, this.parametres);
        symb.plane.parent = this.anchor;
      //  symb.plane.position.y = this.position.y;
      //  symb.plane.position.z = this.position.z;
        symb.plane.position.x = posX - i * this.distanceBetweenSymbol;
        this.arrayPlaneSymbols.push(symb);
    }
};

TextLabel.prototype.deletePlanesSymbols = function (countSymbols) {
    for (var i = this.arrayPlaneSymbols.length - 1; i >= countSymbols; i--) {
        var obj = this.arrayPlaneSymbols[i];
        this.arrayPlaneSymbols.splice(-1,1);
        obj.dispose();
    }
};

TextLabel.prototype.setText = function (text) {  
    var arrayText = Array.from(text.toString());
    if (arrayText.length > this.arrayPlaneSymbols.length) {
        this.addPlanesSymbols(arrayText.length-this.arrayPlaneSymbols.length);
        var posX = (((arrayText.length-1) * this.distanceBetweenSymbol)/2) /*+ this.position.x*/;
        this.arrayPlaneSymbols.map((value, index) => {
            value.plane.position.x = posX - index * this.distanceBetweenSymbol;
        });
    } else if (arrayText.length < this.arrayPlaneSymbols.length) {
        this.deletePlanesSymbols(arrayText.length);
        var posX = (((arrayText.length-1) * this.distanceBetweenSymbol)/2) /*+ this.position.x*/;
        this.arrayPlaneSymbols.map((value, index) => {
            value.plane.position.x = posX - index * this.distanceBetweenSymbol;
        });
    }
    this.arrayPlaneSymbols.map((value, index) => value.setSymbol(+arrayText[index]));
};

TextLabel.prototype.setTextForAnimation = function (text) {
    if (this.previousText !== text) {
            var a = Math.abs(this.previousText - text).toString().length;
            var b = Math.floor(this.previousText * Math.pow(0.1, a));
            var c = Math.floor(text * Math.pow(0.1, a));

            while (b >= 1 || c >= 1) {
                if (Math.abs(b - c) > 0) {
                    a++;
                }
                b *= 0.1;
                c *= 0.1;
                b = Math.floor(b);
                c = Math.floor(c);
            }

            var arrayText = Array.from(text.toString());
            if (arrayText.length > this.arrayPlaneSymbols.length) {
                this.addPlanesSymbols(arrayText.length - this.arrayPlaneSymbols.length);
                var posX = (((arrayText.length - 1) * this.distanceBetweenSymbol) / 2) /*+ this.position.x*/;
                this.arrayPlaneSymbols.map((value, index) => {
                    value.plane.position.x = posX - index * this.distanceBetweenSymbol;
                });
            } else if (arrayText.length < this.arrayPlaneSymbols.length) {
                this.deletePlanesSymbols(arrayText.length);
                var posX = (((arrayText.length - 1) * this.distanceBetweenSymbol) / 2) /*+ this.position.x*/;
                this.arrayPlaneSymbols.map((value, index) => {
                    value.plane.position.x = posX - index * this.distanceBetweenSymbol;
                });
            } else {

            }

            this.arrayPlaneSymbols.map((value, index) => {
                value.setEnabled(true);
                if ( index > (this.arrayPlaneSymbols.length - 1 - a) ) {
                    value.setSymbolForAnimation(+arrayText[index]);
                }
            });

    }

    this.previousText = text;
};

TextLabel.prototype.zeroing = function () {
    this.previousText = null;
    this.arrayPlaneSymbols.map(value => {
        value.setSymbolForAnimation(0);
        value.setEnabled(false);
    });
};

TextLabel.prototype.setOnOff = function (val) {
    this.arrayPlaneSymbols.map(value => {
        value.setEnabled(val);
    });
};