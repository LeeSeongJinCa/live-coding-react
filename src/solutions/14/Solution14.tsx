/**
 * 14. Create a Reusable Form Component with Validation
 *
 * Problem:
 * - Build a reusable form component that handles form state and validation for various form fields.
 * - 다양한 양식 필드에 대한 양식 상태 및 유효성 검사를 처리하는 재사용 가능한 양식 컴포넌트를 구축하세요.
 */

import { Form } from './Form';
import { useForm } from './useForm';

type FormData = {
  name: string;
  email: string;
};

const defaultValues: FormData = {
  name: '',
  email: '',
};

export const Solution14 = () => {
  const form = useForm<FormData>({
    defaultValues,
    validators: {
      name: (value) => value.length >= 3,
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
  });

  const handleSubmit = form.handleSubmit((payload) => {
    console.log('submit:', payload);
  });

  return (
    <Form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          rowGap: 12,
        }}
      >
        <label>
          <p>Name</p>
          <input aria-label="name" {...form.register('name')} />
          {form.errors.name && <p>{form.errors.name}</p>}
        </label>

        <label>
          <p>Email</p>
          <input aria-label="email" {...form.register('email')} />
          {form.errors.email && <p>{form.errors.email}</p>}
        </label>

        <button type="submit" aria-label="submit" disabled={!form.isValid}>
          Submit
        </button>
      </div>
    </Form>
  );
};
