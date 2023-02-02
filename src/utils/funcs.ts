export function getRandomItem(arr: string[]) {
  const n = Math.floor(Math.random() * (arr.length - 1));
  
  return arr[n];
}