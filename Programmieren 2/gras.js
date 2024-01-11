class Gras {
    zeile;
    spalte;
    energie = 0;

    constructor(z,s) {
        this.zeile = z;
        this.spalte = s;
    };
    selbstplatzierung() {
        matrix[this.zeile][this.spalte] = 1;
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
        let erdeFelder = this.erstelleErdefelderTabelle();
        if (erdeFelder.length > 0) {
            let gewähltesFeld = erdeFelder[0];
            let neuesGrasObjekt = new Gras(gewähltesFeld[0],gewähltesFeld[1]);
            neuesGrasObjekt.selbstplatzierung();
            objekteListe.push(neuesGrasObjekt);
        }
    };

    erstelleErdefelderTabelle() {
        let benachbarteFelder = [
            [this.zeile+1,this.spalte],
            [this.zeile-1,this.spalte],
            [this.zeile,this.spalte+1],
            [this.zeile,this.spalte-1],
        ]
        return benachbarteFelder.filter(this.istErde);
    }
    istErde(koordinatenPaar) {
        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] === 3
        ) {
            return true;
        }  else {
            return false;
        }
    }
}