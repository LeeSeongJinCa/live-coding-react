/**
 * 2. Implement a Toggle Switch
 *
 * Problem:
 * - Create a toggle switch component between "On" and "Off" states.
 * - '켜기'와 '끄기' 상태 사이의 토글 스위치 컴포넌트를 만듭니다.
 */

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
