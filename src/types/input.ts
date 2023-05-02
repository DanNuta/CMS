import React from "react";

export interface InputProps {
  type: "text" | "email" | "password" | "checkbox";
  placeholder?: string;
  id?: string;
  errorMsj: string | null;
  value?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
