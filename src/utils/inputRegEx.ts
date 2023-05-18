export const patternRegEx = {
  nume: /^[a-zA-Z]{3,10}$/,
  prenume: /^[a-zA-Z]{3,10}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&.]{8,}$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  validateLinkImages: new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  ),
};
