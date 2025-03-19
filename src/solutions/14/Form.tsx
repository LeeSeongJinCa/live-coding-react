import { FormEventHandler, PropsWithChildren } from 'react';

export interface FormProps extends PropsWithChildren {
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form aria-label="form" data-testid="test-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
