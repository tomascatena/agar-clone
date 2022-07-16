export class Orb {
  color: string;
  locationX: number;
  locationY: number;
  radius: number;

  constructor() {
    this.color = this.getRandomColor();
    this.locationX = Math.floor(Math.random() * 500);
    this.locationY = Math.floor(Math.random() * 500);
    this.radius = 5;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';

    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
}
