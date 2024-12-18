export const isPlainObject = (obj: any): boolean => {
  return obj !== null && 
         typeof obj === 'object' && 
         Object.getPrototypeOf(obj) === Object.prototype;
};