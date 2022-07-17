import { Orb } from '@/classes/Orb';
import { Player } from '@/classes/Player';
import { PlayerData } from '@/classes/PlayerData';
import { PlayerConfig } from '@/classes/PlayerConfig';
import { GameSettings } from '@/gameSettings';

type CheckForOrbCollisionsParams = {
  playerData: PlayerData;
  playerConfig: PlayerConfig;
  orbs: Orb[];
  settings: GameSettings;
};

const checkForOrbCollisions = ({
  playerData,
  playerConfig,
  orbs,
  settings,
}: CheckForOrbCollisionsParams): Promise<number> => {
  return new Promise((resolve, reject) => {
    //ORB COLLISIONS
    orbs.forEach((orb, index) => {
      // console.log("CHECK FOR COLLISIONS")
      // AABB Test(square) - Axis-aligned bounding boxes
      if (
        playerData.locationX + playerData.radius + orb.radius > orb.locationX &&
        playerData.locationX < orb.locationX + playerData.radius + orb.radius &&
        playerData.locationY + playerData.radius + orb.radius > orb.locationY &&
        playerData.locationY < orb.locationY + playerData.radius + orb.radius
      ) {
        // Pythagoras test(circle)
        const distance = Math.sqrt(
          (playerData.locationX - orb.locationX) * (playerData.locationX - orb.locationX) +
            (playerData.locationY - orb.locationY) * (playerData.locationY - orb.locationY)
        );

        if (distance < playerData.radius + orb.radius) {
          //COLLISION!!!
          playerData.score += 1;
          playerData.orbsAbsorbed += 1;
          // playerData.color = orb.color;
          if (playerConfig.zoom > 1) {
            playerConfig.zoom -= 0.001;
          }

          playerData.radius += 0.25;

          if (playerConfig.speed < -0.005) {
            playerConfig.speed += 0.005;
          } else if (playerConfig.speed > 0.005) {
            playerConfig.speed -= 0.005;
          }

          // we have to keep orbs updated for new players
          // we just don't want to push them out more than we have to
          orbs.splice(index, 1, new Orb(settings));

          // can't hit more than one orb on a tick so return
          resolve(index);
        }
      }
    });

    // if we got out of the loop, there was no collision.
    // Reject promise
    reject(-1);
  });
};

type CheckForPlayerCollisionsParams = {
  playerData: PlayerData;
  playerConfig: PlayerConfig;
  players: Player[];
  playerId: string;
};

type CheckForPlayerCollisionsReturn = {
  died: PlayerData;
  killedBy: PlayerData;
};

const checkForPlayerCollisions = ({
  playerData,
  playerConfig,
  players,
  playerId,
}: CheckForPlayerCollisionsParams): Promise<CheckForPlayerCollisionsReturn> => {
  return new Promise((resolve, reject) => {
    //PLAYER COLLISIONS
    players.forEach((currentPlayer, index) => {
      if (currentPlayer.playerId != playerId) {
        // console.log(currentPlayer.playerId,playerData.playerId)
        let pLocationX = currentPlayer.playerData.locationX;
        let pLocationY = currentPlayer.playerData.locationY;
        let playerRadius = currentPlayer.playerData.radius;

        // AABB Test - Axis-aligned bounding boxes
        if (
          playerData.locationX + playerData.radius + playerRadius > pLocationX &&
          playerData.locationX < pLocationX + playerData.radius + playerRadius &&
          playerData.locationY + playerData.radius + playerRadius > pLocationY &&
          playerData.locationY < pLocationY + playerData.radius + playerRadius
        ) {
          // Pythagoras test
          const distance = Math.sqrt(
            (playerData.locationX - pLocationX) * (playerData.locationX - pLocationX) +
              (playerData.locationY - pLocationY) * (playerData.locationY - pLocationY)
          );

          if (distance < playerData.radius + playerRadius) {
            //COLLISION!!
            if (playerData.radius > playerRadius) {
              // ENEMY DEATH
              const collisionData = updateScores({
                killer: playerData,
                killed: currentPlayer.playerData,
              });

              if (playerConfig.zoom > 1) {
                playerConfig.zoom -= playerRadius * 0.25 * 0.001;
              }

              players.splice(index, 1);

              resolve(collisionData);
            } else if (playerData.radius < playerRadius) {
              // PLAYER DEATH
              const collisionData = updateScores({
                killer: currentPlayer.playerData,
                killed: playerData,
              });

              players.forEach((p, i) => {
                if (players[i].playerId === p.playerId) {
                  players.splice(i, 1);
                }
              });

              resolve(collisionData);
            }
          }
        }
      }
    });

    reject();
  });
};

type UpdateScoresParams = {
  killer: PlayerData;
  killed: PlayerData;
};

const updateScores = ({ killer, killed }: UpdateScoresParams) => {
  killer.score += killed.score + 10;
  killer.playersAbsorbed += 1;
  killed.isAlive = false;
  killer.radius += killed.radius * 0.25;

  return {
    died: killed,
    killedBy: killer,
  };
};

export default {
  checkForOrbCollisions,
  checkForPlayerCollisions,
  updateScores,
};
