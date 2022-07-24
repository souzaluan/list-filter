export const isValidKey = <t>(key: any, object: t): key is keyof t =>
  key in object;
