export const shuffleList = <T>(list:T[]):T[]=> {
  let currentIndex:number = list.length;

  while (currentIndex !== 0) {
    const randomIndex:number = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
  }

  return list;
}
