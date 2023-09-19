// a little utility for producing unique 
export const idGen = (() => {
    let id = 0;
    return () => id++;
  })()