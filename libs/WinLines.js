function WinLines(options, scene) {
    var arrayObjectLines = [];
    for (var j = 0; j < options.maskWinLine.length; j++ ) {
        var points = [];
        for (var i = 0; i < options.maskWinLine[j].length; i++) {
            var x = options.distanceBetweenSymbolRow * i - options.halfLengthRow;
            var y = options.distanceBetweenSymbolColl * (options.maskWinLine[j][i]+0.001) - options.halfLengthColl;
            points = [...points, new BABYLON.Vector3(-x, -y, options.z)];
        }
        points = [
            new BABYLON.Vector3(points[0].x+options.deltaBeginEnd, points[0].y, points[0].z),
            ...points,
            new BABYLON.Vector3(points[points.length-1].x-options.deltaBeginEnd, points[points.length-1].y, points[0].z)
        ];
        var myMaterial = new BABYLON.PBRMaterial("myMaterial", scene);
        myMaterial.emissiveColor = new BABYLON.Color3(0.75, 1.75, 2);
        myMaterial.emissiveIntensity = 1.5;
        myMaterial.alpha = 0.5;
        var line = Line2D("line", {path: points, width:0.15, standardUV: false}, scene);
        line.material = myMaterial;
        // line.renderingGroupId = 1;
        arrayObjectLines = [...arrayObjectLines, line];
        line.setEnabled(false);
    }
    return arrayObjectLines;
}