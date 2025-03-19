/**
 * 14. Create a Reusable Form Component with Validation
 *
 * Problem:
 * - Build a reusable form component that handles form state and validation for various form fields.
 * - 다양한 양식 필드에 대한 양식 상태 및 유효성 검사를 처리하는 재사용 가능한 양식 컴포넌트를 구축하세요.
 */

import { Form } from './Form';
import { useForm } from './useForm';

const defaultValues = {
  name: '',
  email: '',
} as const;

export const Solution14 = () => {
  const form = useForm({
    defaultValues,
    validators: {
      name: (value: string) => value.length >= 3,
      email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
  });

  const handleSubmit = form.handleSubmit(() => {
    console.log('submit');
  });

  return (
    <Form onSubmit={handleSubmit}>
      <input aria-label="name" {...form.register('name')} />
      <input aria-label="email" {...form.register('email')} />
      <button type="submit" aria-label="submit">
        Submit
      </button>
    </Form>
  );
};
