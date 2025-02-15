import { useToggle } from '../../shared/hooks/useToggle';

export const ToggleSwitch = () => {
  const { value: isOn, toggle } = useToggle(false);

  return (
    <div>
      <h1>
        Toggle Switch: <span id="status">{isOn ? 'On' : 'Off'}</span>
      </h1>

      <button id="toggle" type="button" onClick={toggle}>
        Toggle
      </button>
    </div>
  );
};
