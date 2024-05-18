class rasenDestroyer extends Creature {
  energie = 15;

  selbstplatzierung() {
    matrix[this.x][this.y] = 2
  };

  spielzug() {
    if (this.energie > 30) {
      //pflanz neues gras
      this.energie = 15
      this.evolution();

    } else if (this.energie > 0) {
      this.bewegung();
      let grasFelder = super.erstelleGrasfeldertabelle();

      if (grasFelder.length > 0) {
        this.energie++;
      } else this.energie--;


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
      let evolution = new rasenDestroyer(gewähltesFeld[0], gewähltesFeld[1]);
      evolution.selbstplatzierung();
      objekteListe.push(evolution);
    }
  };
  bewegung() {
    let grasfelder = super.erstelleGrasfeldertabelle();
    if (grasfelder.length > 0) {
      let gewähltesFeld = grasfelder[Math.round(random(0, grasfelder.length - 1))];
      matrix[this.x][this.y] = 3;

      this.loeschObjekt(gewähltesFeld[0], gewähltesFeld[1]);

      this.x = gewähltesFeld[0];
      this.y = gewähltesFeld[1];
      matrix[this.x][this.y] = 2;
    }
    //console.log(grasfelder);
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