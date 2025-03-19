import { ChangeEventHandler, FormEvent, useState } from 'react';

export const useForm = <T extends Record<string, string>>({
  defaultValues,
  validators,
}: {
  defaultValues: T;
  validators: Record<keyof T, (value: string) => boolean>;
}) => {
  const [formData, setFormData] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>,
  );

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validators[name](value) ? undefined : `Invalid value for ${name}`,
    }));
  };

  const register = (name: keyof T) => {
    const value = formData[name];

    return {
      value: value,
      error: errors[name],
      onChange: handleChange,
    };
  };

  const validateFormFields = () => {
    Object.entries(formData).forEach(([key, value]) => {
      if (!validators[key as keyof T](value)) {
        throw new Error(`Invalid value for ${key}`);
      }
    });
  };

  const handleSubmit = (callback?: () => void) => {
    validateFormFields();

    return (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      callback?.();
    };
  };

  return { register, handleSubmit } as const;
};
