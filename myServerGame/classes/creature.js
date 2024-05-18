class Creature {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  erstelleGrasfeldertabelle() {
    let benachbarteFelder = [
      [this.x + 1, this.y],
      [this.x, this.y + 1],
      [this.x - 1, this.y],
      [this.x, this.y - 1],
    ]
    return benachbarteFelder.filter(this.istGras);
  };

  istGras(koordinatenPaar) {
    let y = koordinatenPaar[1]
    let x = koordinatenPaar[0]

    if (x >= 0
      && y >= 0
      && x < matrix.length
      && y < matrix.length
      && matrix[x][y] === 1) {
      return (true)
    } else {
      return (false)
    }
  }

  erstelleErdefelderTabelle() {
    let benachbarteFelder = [
      [this.x + 1, this.y],
      [this.x - 1, this.y],
      [this.x, this.y + 1],
      [this.x, this.y - 1],
    ]
    return benachbarteFelder.filter(this.istErde);
  }

  istErde(koordinatenPaar) {
    let x = koordinatenPaar[0];
    let y = koordinatenPaar[1];
    if (x >= 0
      && y >= 0
      && x < matrix.length
      && y < matrix.length
      && matrix[x][y] === 3
    ) {
      return true;
    } else {
      return false;
    }
  }

  erstelleGrasfressertabelle() {
    let benachbarteFelder = [
      [this.x + 1, this.y],
      [this.x, this.y + 1],
      [this.x - 1, this.y],
      [this.x, this.y - 1],
    ]

    return benachbarteFelder.filter(this.istGrasfresser);

  };

  istGrasfresser(koordinatenPaar) {
    let y = koordinatenPaar[1]
    let x = koordinatenPaar[0]

    if (x >= 0
      && y >= 0
      && x < matrix.length
      && y < matrix.length
      && matrix[x][y] === 2) {
      return (true)
    } else {
      return (false)
    }
  };
}