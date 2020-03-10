/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  let matrix = makeEmptyMatrix(n)
  // console.log(matrix)
  function findSolution(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      const element = matrix[i][i];

      if (element === 0) matrix[i][i] = 1;

    }
    return matrix
  }
  var solution = findSolution(matrix); //fixme

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 1; //fixme
  if (n === 1 || n === 0) return 1;

  for (let i = 1; i <= n; i++) {
    solutionCount *= i;
  }

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  let solution = new Board(makeEmptyMatrix(n));
  if (n === 0) {
    solution.rows = function () {
      return [[1]];

    }
    solution.get = function (n) {
      if (n === 'n') return 0;
    }
  }

  // let counter = 0;
  // while (counter < solution.get('n')) {
  //   let count = 0;
  //   while (count < solution.get('n')) {


  //     count++;
  //   }


  //   counter++;
  // }



  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
