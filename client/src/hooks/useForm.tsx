import { useState } from "react";

export const useForm = (callback: Function, initalState: Object = {}) => {
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
    values,
  };
};
