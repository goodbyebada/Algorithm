function RedCar() {
  this.value = "🚗";
  this.fun = function () {
    console.log(this.value);
  };
}

new RedCar().fun(); //"🚗";
