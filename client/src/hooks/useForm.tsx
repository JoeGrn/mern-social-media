import { useState } from "react";

export const useForm = (callback: any, initalState: any = {}) => {
  const [values, setValues]: any = useState(initalState);
  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return {
      onChange,
      onSubmit,
      values
  }
};
