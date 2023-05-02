import { StateProps } from "../types";

function validateState(value: string, regex: RegExp) {
  if (!regex.test(value)) return true;
  return false;
}

export function changeStateRegister(
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>,
  valueState: React.Dispatch<React.SetStateAction<StateProps | undefined>>,
  regEx: RegExp,
  errorMsj?: string
) {
  const value = e.target.value.trim();
  const errorInput = validateState(value, regEx!);

  valueState((prev) => {
    const newValue: StateProps = {
      errorMsj: errorInput ? errorMsj : null,
      value: value,
    };
    return newValue;
  });
}
