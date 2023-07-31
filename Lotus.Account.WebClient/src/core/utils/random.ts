
export const getRandomMinMax = (min:number, max:number):number =>
{
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomMax = (max:number):number =>
{
  return Math.floor(Math.random() * max);
}
  