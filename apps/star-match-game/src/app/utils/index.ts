const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const range = (min: number, max: number) => {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

const sum = (arr: number[]) => {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

const randomSumIn = (arr: number[], max: number) => {
  const sets: number[][] = [[]];
  const sums: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0, len = sets.length; j < len; j++) {
      const candidateSet = sets[j].concat(arr[i]);
      const candidateSum = sum(candidateSet);
      if (candidateSum <= max) {
        sets.push(candidateSet);
        sums.push(candidateSum);
      }
    }
  }

  return sums[random(0, sums.length - 1)];
}

export { random, range, sum, randomSumIn };