export const parseBooleanQuery = (param: string | undefined | null) : boolean | null => {
  param = param?.trim().toLowerCase();

  switch (param) {
    case "true":
      return true;
    case "false":
    case undefined:
    case null:
      return false;
  
    default:
      return null;
  }
};