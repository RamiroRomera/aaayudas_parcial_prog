# Mappers

Dejo dos mappers de `toCamelCase` y `toSnakeCase`, yo normalmente hago una carpeta utils y las pego en un archivo `object-mapper.ts`

```ts
export function toSnakeCase(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  } else if (obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      acc[snakeKey] = toSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

export function toCamelCase(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}
```