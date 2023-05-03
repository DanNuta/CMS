import React, {
  createContext,
  useState,
  useReducer,
  PropsWithChildren,
} from "react";

import { patternRegEx } from "../regEx";

interface StateContextProps {
  state: StateProps;
  changeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

enum StateActionType {
  CHANGE_NAME = "CHANGE_NAME",
  CHANGE_PRENUME = "CHANGE_PRENUME",
  CHANGE_EMAIL = "CHANGE_EMAIL",
  CHNAGE_PASSWORD = "CHNAGE_PASSWORD",
  CHANGE_VERIFY_PASSWORD = "CHANGE_VERIFY_PASSWORD",
  CHANGE_GENDER = "CHANGE_GENDER",
  CHANGE_CHECKBOX = "CHANGE_CHECKBOX",
}

interface StateProps {
  name: string;
  prenume: string;
  email: string;
  gender: string;
  password: string;
  verifyPassword: string;
  checkbox: string | null;
  errName: string | null;
  errPrenume: string | null;
  errEmail: string | null;
  errGender: string | null;
  errPassword: string | null;
  errVerifyPassword: string | null;
  errCheckbox: string | null;
}

interface StateAction {
  type: StateActionType;
  payload: string;
}

export const State = createContext<StateContextProps | null>(null);

export const StateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const stateElement: StateProps = {
    name: "",
    prenume: "",
    email: "",
    gender: "",
    password: "",
    verifyPassword: "",
    checkbox: "",
    errName: null,
    errPrenume: null,
    errEmail: null,
    errGender: null,
    errPassword: null,
    errVerifyPassword: null,
    errCheckbox: null,
  };

  function reducerFn(state: StateProps, action: StateAction) {
    const { payload, type } = action;

    switch (type) {
      case StateActionType.CHANGE_NAME:
        return {
          ...state,
          name: payload,
        };
    }
  }

  const [state, dispatch] = useReducer(reducerFn, stateElement);

  function changeName(data: React.ChangeEvent<HTMLInputElement>) {
    const value = data.target.value;
    //setName(value);

    //dispatch({type: stateActionType.CHANGE_NAME, payload: value})
  }

  function changeFirstName(data: React.ChangeEvent<HTMLInputElement>) {
    const value = data.target.value;
    //setPrenume(value);
  }

  function changeEmail(data: React.ChangeEvent<HTMLInputElement>) {
    const value = data.target.value;
    //setEmail(value);

    // if (!patternRegEx.email.test(value)) {
    //   setErrEmail("Acesta nu este un email corect");
    //   return;
    // } else {
    //   setErrEmail(null);
    // }
  }

  function changeGender(data: React.ChangeEvent<HTMLSelectElement>) {
    const value = data.target.value;
    //setGender(value);
  }

  function blurPassword(data: React.FocusEvent<HTMLInputElement, Element>) {
    const value = data.target.value;

    // setPassword(value);

    // if (!patternRegEx.password.test(value)) {
    //   setErrPassword("Acesta nu este o parola puternica");
    //   return;
    // } else {
    //   setErrPassword(null);
    // }
  }

  function checkPersonalData(data: React.ChangeEvent<HTMLInputElement>) {
    const value = data.target.checked;
    //setCheckBox(value);
  }

  return (
    <State.Provider value={{ state, changeName }}>{children}</State.Provider>
  );
};
