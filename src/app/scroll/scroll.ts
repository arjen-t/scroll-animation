export class Scroll {

    public y: number;

    public x: number;

    public direction: string;

    constructor(y: number, x: number, direction: string) {
        this.y = <number>y;
        this.x = <number>x;
        this.direction = <string>direction;
    }
}