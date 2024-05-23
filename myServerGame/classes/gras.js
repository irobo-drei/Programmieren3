const Creature = require("./creature.js")

class Gras extends Creature {
    energie = 0;

    selbstplatzierung() {
        matrix[this.x][this.y] = 1;
    };

    spielzug() {
        if (this.energie > 4) {
            this.energie = 0;
            this.pflanzNeuesGrasObjekt();
            // mach etwas
        } else {
            // schlaf
            this.energie++;
        }
    };

    pflanzNeuesGrasObjekt() {
        let erdeFelder = super.erstelleErdefelderTabelle();
        if (erdeFelder.length > 0) {
            let gewähltesFeld = erdeFelder[0];
            let neuesGrasObjekt = new Gras(gewähltesFeld[0], gewähltesFeld[1]);
            neuesGrasObjekt.selbstplatzierung();
            objekteListe.push(neuesGrasObjekt);
        }
    };
}