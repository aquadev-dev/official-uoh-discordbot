const pb = {
    le: '<:le:1143581683199791175>',
    me: '<:me:1143581681761128608>',
    re: '<:re:1143581678846087288>',
    lf: '<:lf:1143581675276734625>',
    mf: '<:mf:1143581673636773939>',
    rf: '<:rf:1143581670054838382>',
  };


  
function formatResults(option1Votes = [], option2Votes = [], input = 0) {
    const totalVotes = option1Votes.length + option2Votes.length;
    const progressBarLength = 14;
    const filledSquaresOp1 = Math.round((option1Votes.length / totalVotes) * progressBarLength) || 0;
    const filledSquaresOp2 = Math.round((option2Votes.length / totalVotes) * progressBarLength) || 0;
    const emptySquaresOp1 = progressBarLength - filledSquaresOp1 || 0;
    const emptySquaresOp2 = progressBarLength - filledSquaresOp2 || 0;
   
    if (!filledSquaresOp1 && !emptySquaresOp1) {
      emptySquaresOp1 = progressBarLength;
    }
    if (!filledSquaresOp2 && !emptySquaresOp2) {
        emptySquaresOp1 = progressBarLength;
    }
   
    const option1Percentage = (option1Votes.length / totalVotes) * 100 || 0;
    const option2Percentage = (option2Votes.length / totalVotes) * 100 || 0;

   
    const progressBarOp1 =
      (filledSquaresOp1 ? pb.lf : pb.le) +
      (pb.mf.repeat(filledSquaresOp1) + pb.me.repeat(emptySquaresOp1)) +
      (filledSquaresOp1 === progressBarLength ? pb.rf : pb.re);

    const progressBarOp2 =
      (filledSquaresOp2 ? pb.lf : pb.le) +
      (pb.mf.repeat(filledSquaresOp2) + pb.me.repeat(emptySquaresOp2)) +
      (filledSquaresOp2 === progressBarLength ? pb.rf : pb.re);
   
    const resultsOp1 = [];
    
    resultsOp1.push(progressBarOp1);
    resultsOp1.push(` (${option1Percentage}%)`)

    
    const resultsOp2 = [];
    resultsOp2.push(progressBarOp2);
    resultsOp2.push(` (${option2Percentage}%)`)

    if (input === 0) {
      return resultsOp1.join(' ')
    } else if (input === 1) {
      return resultsOp2.join(' ')
    }

    
    
    
    
    

    
}



   
module.exports = formatResults;