function OneSymbolLabel(scene, duration, parametres) {
    this.indexU = 0;
    this.indexV = 0;
    this.indexUBegin = 0;
    this.indexVBegin = 0;
    this.duration = duration;
    this.plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:parametres.height, width: parametres.width, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    this.plane.rotation.y = Math.PI;
    this.pmat = new BABYLON.StandardMaterial("pmat", scene);
    this.pmat.diffuseTexture = new BABYLON.Texture("textures/numbers/numbers.png", scene);
    this.pmat.diffuseTexture.hasAlpha = true;
    this.pmat.diffuseTexture.uScale = 0.2; //width segment (1 / count symbol in row)
    this.pmat.diffuseTexture.vScale = 0.5; //height segment (1 / count symbol in col)

    this.pmat.diffuseTexture.uOffset = 0.0; //num coll (num coll * index)
    this.pmat.diffuseTexture.vOffset = 0.5; // num row (num row * index)

    this.plane.material = this.pmat;
}

OneSymbolLabel.prototype.constructor = OneSymbolLabel;

OneSymbolLabel.prototype.dispose = function() {
    this.plane.dispose();
};

OneSymbolLabel.prototype.setEnabled = function(value) {
    this.plane.setEnabled(value);
};

OneSymbolLabel.prototype.setSymbol = function(index) {
    index = index > 9 ? 9 : index;
    this.indexUBegin = index < 5 ? index : index - 5;
    this.indexVBegin = index < 5 ? 1 : 0;

    this.pmat.diffuseTexture.uOffset = 0.2 * this.indexUBegin; //num coll (num coll * index)
    this.pmat.diffuseTexture.vOffset = 0.5 * this.indexVBegin; // num row (num row * index)
};

OneSymbolLabel.prototype.setSymbolForAnimation = function(index) {
    index = index > 9 ? 9 : index;
    var indexU = index < 5 ? index : index - 5;
    var indexV = index < 5 ? 1 : 0;
    var pmat = this.pmat;
    var plane = this.plane;
    var duration = this.duration;
   /* if (
        pmat.diffuseTexture.uOffset !== 0.2 * indexU ||
        pmat.diffuseTexture.vOffset !== 0.5 * indexV
    ) {*/
        var animBegin = this.symbolAnimation();
        animBegin.onAnimationEnd = function () {
            animBegin.animationStarted = false;

            var numFrame = (30 / 10) * (index + 1);
            // console.log("!!!", this.pmat.diffuseTexture.uOffset, this.pmat.diffuseTexture.vOffset);
            // console.log(index, this.indexU*0.2, this.indexV*0.5);

            var animationHideText = new BABYLON.Animation("myAnimation", "material.diffuseTexture.uOffset", duration,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
            var keys = [];

            keys.push({
                frame: 0,
                value: 0
            });
            keys.push({
                frame: numFrame,
                value: indexU * 0.2
            });
            animationHideText.setKeys(keys);

            // var indexU = indexU;
            animationHideText.floatInterpolateFunction = function (startValue, endValue, gradient) {
                var newGradient = Math.floor(gradient * (index + 1));
                if (newGradient === (index + 1)) {
                    return indexU * 0.2;
                }
                if (newGradient < 5) {
                    return startValue + newGradient * 0.2;
                } else {
                    return startValue + (newGradient - 5) * 0.2;
                }
            };

            if (indexV === 0) {
                var animationHideText1 = new BABYLON.Animation("myAnimation", "material.diffuseTexture.vOffset", duration,
                    BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                var keys = [];

                keys.push({
                    frame: 0,
                    value: 0.5
                });
                keys.push({
                    frame: numFrame,
                    value: indexV * 0.5
                });
                animationHideText1.setKeys(keys);

                //var indexV = indexV;
                animationHideText1.floatInterpolateFunction = function (startValue, endValue, gradient) {
                    var newGradient = Math.floor(gradient * (index + 1));
                    if (newGradient == (index + 1)) {
                        return indexV * 0.5;
                    }
                    if (newGradient < 5) {
                        return startValue;
                    } else {
                        return endValue;
                    }
                };
            } else {
                pmat.diffuseTexture.vOffset = 0.5 * indexV;
            }
            plane.animations = [];
            plane.animations.push(animationHideText);
            if (indexV === 0) {
                plane.animations.push(animationHideText1);
            }
            scene.beginAnimation(plane, 0, numFrame, false);
        };
    // }
};

OneSymbolLabel.prototype.symbolAnimation = function() {

        var animationHideText = new BABYLON.Animation("myAnimation", "material.diffuseTexture.uOffset", this.duration,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys = [];

        keys.push({
            frame: 0,
            value: 0
        });
        keys.push({
            frame: 30,
            value: 0.8
        });
        animationHideText.setKeys(keys);

        var indexU = this.indexU;
        animationHideText.floatInterpolateFunction = function (startValue, endValue, gradient) {
            var newGradient = Math.floor(gradient * 10);
            if (newGradient === 10) {
                return indexU * 0.2;
            }
            if (newGradient < 5) {
                return startValue + newGradient * 0.2;
            } else {
                return startValue + (newGradient - 5) * 0.2;
            }
        };
        var animationHideText1 = new BABYLON.Animation("myAnimation", "material.diffuseTexture.vOffset", this.duration,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keys = [];

        keys.push({
            frame: 0,
            value: 0.5
        });
        keys.push({
            frame: 30,
            value: 0
        });
        animationHideText1.setKeys(keys);

        var indexV = this.indexV;
        animationHideText1.floatInterpolateFunction = function (startValue, endValue, gradient) {
            var newGradient = Math.floor(gradient * 10);
            if (newGradient == 10) {
                return indexV * 0.5;
            }
            if (newGradient < 5) {
                return startValue;
            } else {
                return endValue;
            }
        };
        this.plane.animations = [];
        this.plane.animations.push(animationHideText);
        this.plane.animations.push(animationHideText1);

        var anim = scene.beginAnimation(this.plane, 0, 30, false);
        return anim;
};
