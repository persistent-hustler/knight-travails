const positionKey = ([x, y]) => `${x},${y}`;

export function possibleKnightMoves([x, y]) {
  const moves = [
    [x + 2, y + 1], [x + 2, y - 1], 
    [x - 2, y + 1], [x - 2, y - 1], 
    [x + 1, y + 2], [x + 1, y - 2], 
    [x - 1, y + 2], [x - 1, y - 2]
  ];
  return moves.filter(([nx, ny]) => nx >= 0 && nx < 8 && ny >= 0 && ny < 8);
}

export function knightMoves(start, end) {
  if (start[0] === end[0] && start[1] === end[1]) {
    console.log(`You made it in 0 moves! Here's your path: [${start}]`);
    return [start];
  }

  const queue = [[start, [start]]];
  const visited = new Set([positionKey(start)]);

  while (queue.length) {
    const [currentPosition, path] = queue.shift();
    
    for (const nextMove of possibleKnightMoves(currentPosition)) {
      const nextKey = positionKey(nextMove);
      
      if (!visited.has(nextKey)) {
        const newPath = [...path, nextMove];
        
        if (nextMove[0] === end[0] && nextMove[1] === end[1]) {
          console.log(`You made it in ${newPath.length - 1} moves! Here's your path: ${JSON.stringify(newPath)}`);
          return newPath;
        }
        
        queue.push([nextMove, newPath]);
        visited.add(nextKey);
      }
    }
  }
}
