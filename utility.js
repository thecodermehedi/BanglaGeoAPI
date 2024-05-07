export const renameKeysOfArray = (Obj, newKey1, newKey2) => {
  const { name, bn_name, ...rest } = Obj;
  return {
    ...rest,
    [newKey1]: name,
    [newKey2]: `${name} - ${bn_name}`,
  };
};
