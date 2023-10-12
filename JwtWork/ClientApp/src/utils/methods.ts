export const range = (len: number,start=0) => {
    const arr = [];
    for (let i = start; i < len+start; i++) {
      arr.push(i);
    }
    return arr;
  };
  