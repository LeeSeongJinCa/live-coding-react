import { ChangeEventHandler, FormEvent, useEffect, useMemo, useState } from 'react';

type Data = Record<string, string>;
type Error<T> = Record<keyof T, string | undefined>;
type Validator<T> = Record<keyof T, (value: string) => boolean>;

export type FormSubmitCallback<T> = (payload: { data: T }) => void;

export const useForm = <T extends Data>({
  defaultValues,
  validators,
}: {
  defaultValues: T;
  validators: Validator<T>;
}) => {
  const [values, setValues] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<Error<T>>(
    Object.keys(defaultValues).reduce((acc, key) => {
      acc[key as keyof T] = undefined;
      return acc;
    }, {} as Error<T>),
  );

  const isValid = useMemo(
    () => Object.values(errors).every((error) => error === undefined),
    [errors],
  );

  const validateFormFields = (data: T) => {
    const newErrors = {} as Error<T>;

    Object.entries(data).forEach(([key, value]) => {
      if (!validators[key as keyof T](value)) {
        newErrors[key as keyof T] = `Invalid value for ${key}`;
      }
    });

    setErrors(newErrors);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event,
  ) => {
    const { name, value } = event.target;

    setValues((prev) => {
      validateFormFields({ ...prev, [name]: value });
      return { ...prev, [name]: value };
    });
  };

  const register = (name: keyof T) => {
    const value = values[name];

    return {
      value: value,
      name: name,
      error: errors[name],
      onChange: handleChange,
    };
  };

  const handleSubmit = (callback?: FormSubmitCallback<T>) => {
    return (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      validateFormFields(values);

      callback?.({ data: values });
    };
  };

  useEffect(() => {
    validateFormFields(defaultValues);
  }, []);

  return {
    values,
    errors,
    isValid,
    register,
    handleSubmit,
  } as const;
};
