module.extends = class FleischFresser {
    zeile;
    spalte;
    energie = 1000;

    constructor(z,s) {
      this.zeile = z
      this.spalte = s
    };
    
    selbstplatzierung() {
      matrix[this.zeile][this.spalte] = 2
    };

    spielzug() {
        if(this.energie > 2000) {
            this.energie = 1000;
            this.evolution();

        }else if(this.energie > 0){
            this.bewegung();
            let grasFelder = this.erstelleGrasfressertabelle();
            if (grasFelder.length > 0) {
               this.energie = energie + 100;
            }else this.energie--;
            
            
            
        }else {
            // stirb
            matrix[this.zeile][this.spalte] = 3
            this.loeschObjekt(this.zeile,this.spalte);
            
        }
            
    };

    evolution() {
        let grasFelder = this.erstelleGrasfeldertabelle();
        if (grasFelder.length > 0) {
            let gewähltesFeld = grasFelder[0];
            this.loeschObjekt(gewähltesFeld[0],gewähltesFeld[1])
            let evolution = new rasenDestroyer(gewähltesFeld[0],gewähltesFeld[1]);
            evolution.selbstplatzierung();
            objekteListe.push(evolution);
        }
    };

    bewegung() {
      let grasfelder = this.erstelleGrasfeldertabelle();
      if (grasfelder.length > 0) {
        let gewähltesFeld = grasfelder [Math.round(random(0,grasfelder.length-1))];
        matrix[this.zeile][this.spalte] = 3;
  
        this.loeschObjekt(gewähltesFeld[0],gewähltesFeld[1]);
  
        this.zeile = gewähltesFeld[0];
        this.spalte = gewähltesFeld[1];
        matrix[this.zeile][this.spalte] = 2;
      }
      //console.log(grasfelder);
    };

    loeschObjekt(zeile,spalte) {
      let index = objekteListe.findIndex(function(grasObjekt) {
        if(grasObjekt.zeile === zeile && grasObjekt.spalte === spalte) {
          return true;
        }else {
          return false
        }
      });
      objekteListe.splice(index,1);
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
  }