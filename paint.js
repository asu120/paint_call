// 描画用フラグ  true: 描画中   false: 描画中でない
let flgDraw = false;
let ctx = canvas.getContext('2d');

// 座標
let gX = 0;
let gY = 0;

// 描画色
let gColor = 'black';

window.onload = function() {
    
    // イベント登録
    // マウス
    let canvas = document.getElementById('canvas');
   
    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('mousemove', Draw, false);
    canvas.addEventListener('mouseup', endDraw, false);
    
    // セレクトボックス
    let s = document.getElementById('color');
    s.addEventListener('change', changeColor, false);
    
    

    //
} 
// セレクトボックス変更時に色を変更する
function changeColor(){

    gColor = document.getElementById('color').value;
    console.log(gColor);
    
}

// 描画開始
function startDraw(e){
    
    flgDraw = true;
    gX = e.offsetX;
    gY = e.offsetY;
    
}

// 描画
function Draw(e){
    
    if (flgDraw == true){
        
        // '2dコンテキスト'を取得
        let canvas = document.getElementById('canvas');
        let con = canvas.getContext('2d');

        let x = e.offsetX;
        let y = e.offsetY;

        // 線のスタイルを設定
        con.lineWidth = 3;
        // 色設定
        con.strokeStyle = gColor;

        // 描画開始
        con.beginPath();
        con.moveTo(gX, gY);
        con.lineTo(x, y);
        con.closePath();
        con.stroke();

        // 次の描画開始点
        gX = x;
        gY = y;
        
    }
}

// 描画終了
function endDraw(){
    
    flgDraw = false;
    
}

function delete_canvas(){
    ctx.fillStyle = "white" ;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    }