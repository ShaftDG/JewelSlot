function CustomLoadingScreen(url) {
    /**     CONTAINER    **/

    this.containerLoader = document.getElementById("MyLoadingScreenContainer");
    if(!this.containerLoader){
        this.containerLoader = document.createElement("div");
        this.containerLoader.id = "MyLoadingScreenContainer";

        document.body.insertBefore(this.containerLoader, document.getElementById("renderCanvas"));
    }

    this.containerLoader.style.width = "100%";
    this.containerLoader.style.height = "100%";
    this.containerLoader.style.backgroundColor = "black";

    this.containerEl = document.getElementById("MyLoadingScreen");
    if(!this.containerEl){
        this.containerEl = document.createElement("div");
        this.containerEl.id = "MyLoadingScreen";

        this.containerLoader.appendChild(this.containerEl);
    }

    this.containerEl.classList.add("loader");

    this.containerElInner = document.getElementById("MyLoadingScreenInner");
    if(!this.containerElInner){
        this.containerElInner = document.createElement("div");
        this.containerElInner.id = "MyLoadingScreenInner";

        this.containerLoader.appendChild(this.containerElInner);
    }

    this.containerElInner.classList.add("loaderInner");

    this.containerElInner1 = document.getElementById("MyLoadingScreenInner1");
    if(!this.containerElInner1){
        this.containerElInner1 = document.createElement("div");
        this.containerElInner1.id = "MyLoadingScreenInner1";

        this.containerLoader.appendChild(this.containerElInner1);
    }

    this.containerElInner1.classList.add("loaderInner1");

}
CustomLoadingScreen.prototype.displayLoadingUI = function() {
   this.containerLoader.style.display = "block";
};
CustomLoadingScreen.prototype.hideLoadingUI = function() {
   this.containerLoader.style.display = "none";
};