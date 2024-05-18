class Fleischfresser extends Creature {
  energie = 1000;

  selbstplatzierung() {
    matrix[this.x][this.y] = 0
  };

  spielzug() {
    if (this.energie > 2000) {
      this.energie = 1000;
      this.evolution();

    } else if (this.energie > 0) {
      this.bewegung();

    } else {
      // stirb
      matrix[this.x][this.y] = 3
      this.loeschObjekt(this.x, this.y);

    }

  };

  evolution() {
    let grasFelder = super.erstelleGrasfeldertabelle();
    if (grasFelder.length > 0) {
      let gewähltesFeld = grasFelder[0];
      this.loeschObjekt(gewähltesFeld[0], gewähltesFeld[1])
      let evolution = new Fleischfresser(gewähltesFeld[0], gewähltesFeld[1]);
      evolution.selbstplatzierung();
      objekteListe.push(evolution);
    }
  };

  bewegung() {
    let grasfresser = super.erstelleGrasfressertabelle();
    if (grasfresser.length > 0) {
      let gewähltesFeld = grasfresser[Math.round(random(0, grasfresser.length - 1))];
      matrix[this.x][this.y] = 3;

      this.loeschObjekt(gewähltesFeld[0], gewähltesFeld[1]);

      this.x = gewähltesFeld[0];
      this.y = gewähltesFeld[1];
      matrix[this.x][this.y] = 0;
      this.energie = this.energie + 100;

    } else this.energie = this.energie - 5;
  };

  loeschObjekt(x, y) {
    let index = objekteListe.findIndex(function (grasObjekt) {
      if (grasObjekt.x === x && grasObjekt.y === y) {
        return true;
      } else {
        return false
      }
    });
    objekteListe.splice(index, 1);
  };

}