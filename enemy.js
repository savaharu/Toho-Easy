//	必殺技開始と終了秒数
let start = 1000;
let end = 1500;

//	弾幕生成用配列
let danmaku = [];

//	画像
let enemy_Img = new Image();
enemy_Img.src = './enemy.png';

//	素数
let sosuu = [0, 2, 13, 37]

//	敵クラス

class Enemy {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		
		let c = 0;
	}
	
	nowMode() {
		if(frameCount < 3000) return 3;
		if(frameCount > 3000) return 2;
	}
	
	update() {
		if(frameCount % sosuu[this.nowMode()] == 0) {
			this.x = Math.floor(Math.random() * SCREEN_W/1.1);
			danmaku.push(new Danmaku(this.x, this.y+10, 0))
		}
		
		if(frameCount > start*1 && frameCount < end*1 ||
			  	 frameCount > start && frameCount < end ||
			  	 frameCount > start+1000 && frameCount < end+2000||
		  		 frameCount > start+3000 && frameCount < end+5000) {
			danmaku.push(new Danmaku(this.x, this.y+10, 1))
		}
		else if(frameCount >= 500 && frameCount <= 600||
				 frameCount >= 2500 && frameCount <= 2600||
			  	 frameCount >= 4500 && frameCount <= 4600||
			  	 frameCount >= 6500 && frameCount <= 6600||
			  	 frameCount >= 8500 && frameCount <= 8600) {
				if(frameCount % sosuu[1] == 0) {
					this.x = Math.floor(Math.random() * SCREEN_W/1.1);
					danmaku.push(new Danmaku(this.x, this.y+10, 0))
				}
			   }
			   
		else if(frameCount >= 1000 && frameCount <= 1005||
				 frameCount >= 2000 && frameCount <= 2005||
			   	 frameCount >= 3000 && frameCount <= 3005||
			  	 frameCount >= 4000 && frameCount <= 4005|| 
			   	 frameCount >= 5000 && frameCount <= 5005||
				 frameCount >= 6000 && frameCount <= 6005||
			  	 frameCount >= 7500 && frameCount <= 7505 || keyb.c >= 0 && keyb.super){
			for(let i = 0; i<danmaku.length-1; i++) {
				danmaku.splice(i);
			}
			keyb.super = false;
		}
	}
	
	draw() {
		vcon.drawImage(enemy_Img, this.x, this.y);
		
		//	弾幕描画
		try {
			for(let i = 0; i<danmaku.length; i++) {
				danmaku[i].draw();
			}
		}
		catch(e) {
			danmaku.push(new Danmaku(this.x, this.y, 0, 0))
		}
	}
}