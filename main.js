let select_mode = 1;

//	仮想画面
const vcan = document.createElement('canvas');
const vcon = vcan.getContext('2d');

//	実画面の取得
const can = document.getElementById('can');
const con = can.getContext('2d');

//	実画面サイズ
const SCREEN_W = 1500;
const SCREEN_H = 700;

//	仮想画面サイズ
vcan.width = SCREEN_W;
vcan.height = SCREEN_H;

//  画像をなめらかにする
con.mozimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;

//	キーボード
let keyb = {};
keyb.c = 3;

//	FPS
const FPS = 1000/60;

//	フレームカウント
let frameCount = 0;

//	スタートタイム
let startTime = 0;

//	点数定数
let per = 1;

//	プレイヤー生成
let player = new Player(SCREEN_W/2-50, SCREEN_H - SCREEN_H/5);

//	敵生成
let enemy = new Enemy(SCREEN_W/2-100, SCREEN_H/5-100);

//	背景生成
let background = new Image();
background.src= './background.png';


//	更新処理
function update() {
	//	プレイヤー更新処理
	player.control();
	
	//	敵キャラ更新処理
	enemy.update();
	
	if(frameCount > 10100) {
		frameCount = 0;
		per++;
	}
}

//	描画処理
function draw() {
	//	画面初期化
	vcon.drawImage(background, 0, 0, SCREEN_W, SCREEN_H);
	
	//	デバッグ情報
	if(select_mode != 3){
		vcon.fillStyle = '#fff';
		vcon.font = '40px monospace';
		vcon.fillText('SCORE:'+frameCount, 350, 50);
	}
	
	else if(select_mode == 3) {
		vcon.fillStyle = '#fff';
		vcon.font = '40px monospace';
		vcon.fillText('※練習モードです。', 350, 50);
	}

	vcon.fillStyle = '#fff';
	vcon.font = '40px monospace';
	vcon.fillText('あと'+keyb.c+'回', 350, 60);
	
	//	プレイヤー描画
	player.draw();
	
	//	敵描画
	enemy.draw();
	
	
	//	仮想画面を実画面へ転送
	con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, SCREEN_W, SCREEN_H);
}

//	メインループ呼び出し
window.onload = () => {
	select_mode = window.prompt('モード選択: 1:通常 2:二倍速 3:無敵 それ以外:???モード');
	
	window.alert('スタート！！');
	
	startTime = performance.now();
	mainLoop();
}


//	メインループ
function mainLoop() {
	let c = 0;
	let nowTime = performance.now();
	
	let nowFrame = (nowTime - startTime) / FPS;
	
	while(nowFrame > frameCount) {
		if(select_mode == 1) {
			frameCount++;
		}
		else if(select_mode == 2 || select_mode == 3) {
			frameCount += 0.5;
		}
		
		//	更新処理
		update();
		if(++c>=4) break;
	}
	//	描画処理
	draw();
	
	requestAnimationFrame(mainLoop);
}


//	キーボード操作
document.onkeydown = (e) => {
	if(e.key == 'ArrowUp') keyb.Up = true;
	if(e.key == 'ArrowDown') keyb.Down = true;
	if(e.key == 'ArrowLeft') keyb.Left = true;
	if(e.key == 'ArrowRight') keyb.Right = true;	
}
document.onkeyup = (e) => {
	if(e.key == 'ArrowUp') keyb.Up = false;
	if(e.key == 'ArrowDown') keyb.Down = false;
	if(e.key == 'ArrowLeft') keyb.Left = false;
	if(e.key == 'ArrowRight') keyb.Right = false;
}

document.onkeypress = (e) => {
	if(e.key == 'c') {
		keyb.super = true;
		keyb.c--;
	}
}
