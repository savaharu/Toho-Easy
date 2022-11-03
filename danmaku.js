//	画像
let tama_Img = new Image();
tama_Img.src= './'+Math.floor(Math.random() * 14)+'.png';

//	弾幕クラス

class Danmaku {
	constructor(x, y, mode, angle) {
		this.x = x;
		this.y = y;
		
		this.mode = mode;
		this.angle = angle;
	}
	
	draw() {
		vcon.drawImage(tama_Img, this.x, this.y);
		if(this.mode == 1) {
			this.x += (player.x - this.x) / 12;
			this.y += (player.y - this.y) / 12;
		}
		else {
			this.y += 5;
		}
		
		if(Math.abs(this.x - player.x) < 20 && Math.abs(this.y - player.y) < 20 && select_mode != 3) {
			
			window.location.replace('index.html', 'game.html');
		}
	}
}