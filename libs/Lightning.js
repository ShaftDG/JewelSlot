function Lightning(scene) {
    var myMaterial = new BABYLON.PBRMaterial("myMaterial", scene);
    myMaterial.emissiveColor = new BABYLON.Color3(0.75, 0.75, 1);
    myMaterial.emissiveIntensity = 10;

    function rand(min, max) {
        return Math.random() * (max - min) + min
    }

    function lightning(start, end, iterations, max) {
        let result = [start, end];
        let temp = [];
        let mid, thrid, normal, randVec, l;
        max = max || 100;

        if (iterations < 1) {
            return result
        }

        while(iterations--) {
            l = result.length;
            while(l--) {
                start = result[l];
                if (l < 1) {
                    temp.push(start);
                    break;
                }
                end = result[l - 1];
                mid = BABYLON.Vector3.Lerp(start.clone(), end, .5);
                randVec = new BABYLON.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1));
                normal = BABYLON.Vector3.Cross(randVec,end.clone().subtract(start).normalize());
                var num = rand(-max, max);
                mid = mid.add(normal.multiplyByFloats(num, num, num));

                temp.push(start, mid)
            }
            result = temp.splice(0);
            max /= 2
        }
// console.log(result);
        return result
    }

    var k = 1;
    var lines = [];
    while(k--) {

        var randomPositionX = Math.round((Math.random()-Math.random())*10);
        var randomPositionY = -13;
        var randomPositionZ = Math.round((Math.random()-Math.random())*10);
        var position = new BABYLON.Vector3(randomPositionX, randomPositionY, randomPositionZ);

        var pointStart = new BABYLON.Vector3(0, 15, 0);

        let ls = 5;
        let lm = 10;
        let points = lightning(pointStart, position, ls, lm);
        if (points[0].equals(pointStart)) {
            points.reverse()
        }

        // var line = BABYLON.MeshBuilder.CreateLines("lines", {points: points}, scene);

        var line = Line2D("line", {path: points, width:0.15, standardUV: false}, scene);
        line.position.z = -10;
        // gl.addIncludedOnlyMesh(line);
        //   var hl = new BABYLON.HighlightLayer("hl1", scene, { alphaBlendingMode: 6, blurTextureSizeRatio : 0.5});
        //   hl.addMesh(line, new BABYLON.Color3(0.5, 0.5, 2.0));

        //  hl.emissiveIntensity = 10;
        // hl.innerGlow = false;
        //  hl.outerGlow = true;
        // hl.blurVerticalSize = 2.0;
        // hl.blurHorizontalSize = 2.0;

        /*gl.customEmissiveColorSelector = function(mesh, subMesh, material, result) {
            if (mesh === line) {
                result.set(0, 1, 1, 1);
            } else {
                result.set(0, 0, 0, 0);
            }
        }*/

        line.material = myMaterial;
        line.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
        lines.push(line);
    }
    scene.registerBeforeRender(function () {
        for (var i = 0; i < lines.length; i++ ) {
            // var positions = lines[i].getVerticesData(BABYLON.VertexBuffer.PositionKind);
            // console.log(1111 ,positions);
            // var normals = lines[i].getVerticesData(BABYLON.VertexBuffer.NormalKind);
            // var colors = lines[i].getVerticesData(BABYLON.VertexBuffer.ColorKind);
            // var uvs = lines[i].getVerticesData(BABYLON.VertexBuffer.UVKind);
            //
            // var indices = lines[i].getIndices();
            var randomPositionX = Math.round((Math.random()-Math.random())*10);
            var randomPositionY = -13;
            var randomPositionZ = Math.round((Math.random()-Math.random())*10);
            var position = new BABYLON.Vector3(randomPositionX, randomPositionY, randomPositionZ);

            var pointStart = new BABYLON.Vector3(0, 15, 0);

            let ls = 5;
            let lm = 10;

            let points = lightning(pointStart, position, ls, lm);
            if (points[0].equals(pointStart)) {
                points.reverse()
            }

            var vertexData = UpdateLine2D("line", {path: points, width:0.25, standardUV: false}, scene);

            lines[i].setVerticesData(BABYLON.VertexBuffer.PositionKind, vertexData.positions);
            lines[i].setVerticesData(BABYLON.VertexBuffer.NormalKind, vertexData.normals);
            lines[i].setVerticesData(BABYLON.VertexBuffer.UVKind, vertexData.uvs);
            lines[i].setVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind, vertexData.indices);
        }
    });
}