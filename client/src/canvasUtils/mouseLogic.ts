import { store } from '@/store/store';
import { settingsActions } from '@/store/features/settings/settingsSlice';

export const mouseLogic = (event: MouseEvent, canvas: HTMLCanvasElement) => {
  const { player } = store.getState().settings;

  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };

  let xVector = 0;
  let yVector = 0;

  const angleDeg =
    (Math.atan2(mousePosition.y - canvas.height / 2, mousePosition.x - canvas.width / 2) * 180) /
    Math.PI;
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

  let speed = 10;
  let xV = xVector;
  let yV = yVector;

  if ((player.locationX < 5 && player.xVector < 0) || (player.locationX > 500 && xV > 0)) {
    store.dispatch(settingsActions.setPlayerLocationY(player.locationY - speed * yV));
  } else if ((player.locationY < 5 && yV > 0) || (player.locationY > 500 && yV < 0)) {
    store.dispatch(settingsActions.setPlayerLocationX(player.locationX + speed * xV));
  } else {
    store.dispatch(settingsActions.setPlayerLocationX(player.locationX + speed * xV));
    store.dispatch(settingsActions.setPlayerLocationY(player.locationY - speed * yV));
  }
};
