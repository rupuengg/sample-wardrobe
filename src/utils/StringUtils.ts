export const StringUtils = (str: string) => {
  return {
    toCapitalize: () => {
      return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    },
  }
}