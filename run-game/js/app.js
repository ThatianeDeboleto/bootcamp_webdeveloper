
class Enemy {

    constructor() {

        this.speedRange = [200, 300, 300, 500, 500];
        this.speed = this.speedRange[Math.floor(Math.random() * this.speedRange.length)]; // Asigns the random speed
        this.rangeY = [73, 156, 239];
        this.rangeX = [-100, -150, -200, -250, -300, -350]; // Array is used to randomize the delay when enemy reapears on canvas by changing it's initial position 
        this.x = this.rangeX[Math.floor(Math.random() * this.rangeX.length)]; // Asigns random delay and distance between enemy instances
        this.y = this.rangeY[Math.floor(Math.random() * this.rangeY.length)]; // Asigns enemies to random rows

        this.sprite = 'images/Gem Blue.png';
    }


    update(dt) {

        this.x > 500 ? this.reRender() : this.x += this.speed * dt;
    }


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    reRender() {
        this.x = this.rangeX[Math.floor(Math.random() * this.rangeX.length)];
        this.y = this.rangeY[Math.floor(Math.random() * this.rangeY.length)];
        this.speed = this.speedRange[Math.floor(Math.random() * this.speedRange.length)];
    }
}


class Player {

    constructor() {
        this.x = 200;
        this.y = 405;
        this.sprite = 'images/char-princess-girl.png';
    }


    update() {

        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + 70 >= this.x && enemy.x - 50 <= this.x)) {

                this.reposition()
                }
        }
    }

    reposition() {
        this.x = 200;
        this.y = 405;
    }


    handleInput(key) {
        if (key === 'up') {
            this.y -= 83;
            this.y === -10 ? this.reposition() : this.y;
        } else if (key === 'down') {
            this.y = this.y === 405 ? this.y : this.y += 83;
        } else if (key === 'right') {
            this.x = this.x === 400 ? this.x : this.x += 100;
        } else {
            this.x = this.x === 0 ? this.x : this.x -= 100;
        }
    }


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    }
}


const allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

const player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});