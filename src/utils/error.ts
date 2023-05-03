interface ErrorProps {
  nameErr: string;
  prenumeErr: string;
  emailErr: string;
  genderErr: string;
  weakPassword: string;
  passwordErr: string;
  checkboxErr: string;
  passwordIsNotTheSame: string;
  rolErr: string;
}

export const errorInputs: ErrorProps = {
  nameErr: "Acest nume nu este corect",
  prenumeErr: "Acesta nu este un prenume corect",
  emailErr: "Acesta nu este un email valid",
  genderErr: "Te rog selecteaza un sex",
  checkboxErr: "Trebuie sa ne permiti sa iti preluam datele",

  passwordErr: "Trebuie sa introduci o parola",
  weakPassword: "Acesta nu este o parola puternica",
  passwordIsNotTheSame: "Parolele nu coicid",

  rolErr: "Selecteaza un rol",
};
