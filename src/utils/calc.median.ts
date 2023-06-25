export const median = (values: number[]): number | undefined => {
  if (values.length === 0)
    return undefined;

  values.sort(function(a, b) {
    return a - b;
  });

  const half: number = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};
