import { settingsActions } from '@/store/features/settings/settingsSlice';
import { store } from '@/store/store';

export const mouseLogic = (event: MouseEvent, canvas: HTMLCanvasElement) => {
  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };

  const angleDeg =
    (Math.atan2(mousePosition.y - canvas.height / 2, mousePosition.x - canvas.width / 2) * 180) /
    Math.PI;

  let xVector = 0;
  let yVector = 0;

  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }

  store.dispatch(settingsActions.setPlayerXVector(xVector));
  store.dispatch(settingsActions.setPlayerYVector(yVector));
};
