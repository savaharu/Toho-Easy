//	プレイヤー画像
let player_Img = new Image();
player_Img.src = './R.png';

//	プレイヤークラス

class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		
		let px = this.x + 100;
		let py = this.y + 100;
	}
	
	//	プレイヤーの描画
	draw() {
		vcon.drawImage(player_Img, this.x, this.y);
	}
	
	control() {
		if(keyb.Up) this.y -= 8;
		if(keyb.Down) this.y += 8;
		if(keyb.Left) this.x -= 8;
		if(keyb.Right) this.x += 8;
	}
}