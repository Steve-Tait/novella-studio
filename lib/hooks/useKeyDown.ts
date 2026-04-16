import { useEffect } from 'react';

export const useKeyPress = (
  callback: (T?: any) => void,
  keys: KeyboardKey[]
) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const wasAnyKeyPressed = keys.some((key) => event.key === key);

      if (wasAnyKeyPressed) {
        event.preventDefault();
        callback();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);
};

// enums/KeyboardKey.ts
export enum KeyboardKey {
  escape = 'Escape',
  enter = 'Enter',
  arrowleft = 'ArrowLeft',
  arrowright = 'ArrowRight',
}
