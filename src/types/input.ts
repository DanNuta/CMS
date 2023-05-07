import React from "react";

export interface InputProps {
  type: "text" | "email" | "password" | "checkbox" | "textarea" | "date";
  placeholder?: string;
  id?: string;
  errorMsj: string | null;
  value?: string;
  label?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
