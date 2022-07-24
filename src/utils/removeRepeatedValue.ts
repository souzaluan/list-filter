import { isValidKey } from "./isValidKey";

export const removeRepeatedValue = <T>(array: T[], property: string) => {
  const setArray = new Set();

  return array.filter((item) => {
    if (!isValidKey(property, item)) return;

    const duplicated = setArray.has(item[property]);

    setArray.add(item[property]);

    return !duplicated;
  });
};
