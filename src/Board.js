// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
    
     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      let result = 0;

      this.rows()[rowIndex].map(e => result += e)

      return result >= 2; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {

      for (let i = 0; i < this.get('n'); i++) {
        if (this.hasRowConflictAt(i)) return true

      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      let result = 0;

      this.rows().map(e => result += e[colIndex])

      return result >= 2; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      for (let i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) return true

      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      let result = 0;
      let helper = majorDiagonalColumnIndexAtFirstRow >= 0 ? majorDiagonalColumnIndexAtFirstRow : -majorDiagonalColumnIndexAtFirstRow
      // console.log(helper)
      let board = this.rows()
      let helper1 = helper;
      // console.log(this.get('n'))
      for (let i = 0; i < this.get('n') - helper; i++) {
        // console.log(i)

        const element = majorDiagonalColumnIndexAtFirstRow < 0 ? board[helper1++][i] : majorDiagonalColumnIndexAtFirstRow > 0 ? board[i][helper1++] : board[i][i]

        result += element;
      }

      // console.log(result)
      return result >= 2;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {

      for (var i = -3; i <= 3; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) return true
      }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      if (minorDiagonalColumnIndexAtFirstRow === 6 || minorDiagonalColumnIndexAtFirstRow === 0) return false;
      let result = 0;
      let loopTime = 0;
      let board = this.rows();

      switch (minorDiagonalColumnIndexAtFirstRow) {
        case 1: loopTime = 1;
          break;
        case 5: loopTime = 1;
          break;
        case 2: loopTime = 2;
          break;
        case 4: loopTime = 2;
          break;
        case 3: loopTime = 3;
          break;

      }
      // console.log(minorDiagonalColumnIndexAtFirstRow)
      let helper = minorDiagonalColumnIndexAtFirstRow >= 3 ? this.get('n') - 1 : loopTime;

      for (let i = 0; i <= loopTime; i++) {
        let help = minorDiagonalColumnIndexAtFirstRow === 5 ? i + 2 : i + 1

        const element = minorDiagonalColumnIndexAtFirstRow === 3 ? board[i][helper--] :
          minorDiagonalColumnIndexAtFirstRow > 3 ? board[help][helper--] :
            board[helper--][i];

        result += element;
      }


      return result >= 2; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      for (let i = 1; i < 6; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) return true;

      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  window.makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
