function MakeButton(name, object, linkToParent, options, manager) {
    if (options.positionButton) {
        object.position = options.positionButton.clone();
    }
    var pos = object.position.clone();
    var pushButton = new BABYLON.GUI.MeshButton3D(object, name);
    pushButton.enabled = true;
    pushButton.pos = pos;
    pushButton.options = options;

    // object.material.albedoTexture.vScale = -1;
    // object.material.bumpTexture.vScale = -1;
    // object.material.metallicTexture.vScale = -1;
    pushButton.pointerEnterAnimation = () => {
        // pushButton.mesh.material.emissiveColor = new BABYLON.Color3(2.0,1.0,0.5);
        // pushButton.mesh.material.emissiveIntensity = 0.5;
    };
    pushButton.pointerOutAnimation = () => {
        // pushButton.mesh.material.emissiveColor = new BABYLON.Color3(0.0,0.0,0.0);
        // pushButton.mesh.material.emissiveIntensity = 0.0;
    };
    pushButton.pointerDownAnimation = () => {
        if (pushButton.enabled) {
            object.position.x = pos.x + options.deltaPush.x;
            object.position.y = pos.y + options.deltaPush.y;
            object.position.z = pos.z + options.deltaPush.z;
        }
    };
    pushButton.pointerUpAnimation = () => {
        if (pushButton.enabled) {
            object.position.x = pos.x;
            object.position.y = pos.y;
            object.position.z = pos.z;
        }
    };

    manager.addControl(pushButton);
    pushButton.linkToTransformNode(linkToParent);

    return pushButton;
}

function enableButton(button) {
    button.mesh.material.albedoColor = new BABYLON.Color3(1, 1, 1);
    button.enabled = true;
    button.mesh.position.x = button.pos.x;
    button.mesh.position.y = button.pos.y;
    button.mesh.position.z = button.pos.z;
};

function unEnableButton(button) {
    button.mesh.material.albedoColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    button.enabled = false;
    button.mesh.position.x = button.pos.x + button.options.deltaPush.x;
    button.mesh.position.y = button.pos.y + button.options.deltaPush.y;
    button.mesh.position.z = button.pos.z + button.options.deltaPush.z;
};