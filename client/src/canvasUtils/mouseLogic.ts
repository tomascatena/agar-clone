import { store } from '@/store/store';
import { settingsActions } from '@/store/features/settings/settingsSlice';

export const mouseLogic = (event: MouseEvent, canvas: HTMLCanvasElement) => {
  const { player } = store.getState().settings;

  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };

  let speed = 10;
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

  if ((player.locationX < 5 && xVector < 0) || (player.locationX > 500 && xVector > 0)) {
    store.dispatch(settingsActions.setPlayerLocationY(player.locationY - speed * yVector));
  } else if ((player.locationY < 5 && yVector > 0) || (player.locationY > 500 && yVector < 0)) {
    store.dispatch(settingsActions.setPlayerLocationX(player.locationX + speed * xVector));
  } else {
    store.dispatch(settingsActions.setPlayerLocationX(player.locationX + speed * xVector));
    store.dispatch(settingsActions.setPlayerLocationY(player.locationY - speed * yVector));
  }
};
