class LivingCreature {

    constructor(z,s) {
        this.zeile = z;
        this.spalte = s;
    };

    selbstplatzierung() {
        matrix[this.zeile][this.spalte] = 1
    };

    erstelleGrasfeldertabelle() {
        let benachbarteFelder = [
          [this.zeile+1,this.spalte],
          [this.zeile,this.spalte+1],
          [this.zeile-1,this.spalte],
          [this.zeile,this.spalte-1],
        ]
      
        return benachbarteFelder.filter(this.istGras);
      
    };
    istGras (koordinatenPaar) {
        let spalte = koordinatenPaar[1]
        let zeile = koordinatenPaar[0]
        
        if (zeile >= 0
          && spalte >= 0
          && zeile < matrix.length
          && spalte < matrix.length
          && matrix[zeile][spalte] === 1) {
          return(true)
        }else{
          return(false)
        }
    }

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

    erstelleGrasfressertabelle() {
        let benachbarteFelder = [
          [this.zeile+1,this.spalte],
          [this.zeile,this.spalte+1],
          [this.zeile-1,this.spalte],
          [this.zeile,this.spalte-1],
        ]
        
        return benachbarteFelder.filter(this.istGrasfresser);
        
      };
      
      istGrasfresser (koordinatenPaar) {
        let spalte = koordinatenPaar[1]
        let zeile = koordinatenPaar[0]
          
        if (zeile >= 0
          && spalte >= 0
          && zeile < matrix.length
          && spalte < matrix.length
          && matrix[zeile][spalte] === 2) {
          return(true)
        }else{
          return(false)
        }
      };
}