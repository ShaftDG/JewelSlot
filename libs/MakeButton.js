function MakeButton(name, object, linkToParent, options, manager) {
    var pos = object.position.clone();
    var pushButton = new BABYLON.GUI.MeshButton3D(object, name);
    // object.material.albedoTexture.vScale = -1;
    // object.material.bumpTexture.vScale = -1;
    // object.material.metallicTexture.vScale = -1;
    pushButton.pointerEnterAnimation = () => {
        //object.material.albedoColor = hoverColor;
    };
    pushButton.pointerOutAnimation = () => {
        //object.material.albedoColor = new BABYLON.Color3(0.5, 0.5, 2.0);
    };
    pushButton.pointerDownAnimation = () => {
        object.position.y = pos.y + options.deltaPush;
    };
    pushButton.pointerUpAnimation = () => {
        object.position.y = pos.y;
    };

    manager.addControl(pushButton);
    pushButton.linkToTransformNode(linkToParent);

    return pushButton;
}