let localStream; 
// カメラ映像取得
navigator.mediaDevices.getUserMedia({video: false, audio: true})
  .then( stream => {
  // 成功時にvideo要素にカメラ映像をセットし、再生
  const videoElm = document.getElementById('my-video');
  videoElm.srcObject = stream;
  videoElm.play();

  canvasStream = canvas.captureStream(30);
  const canvasElm = document.getElementById("canvas");
  canvasElm.srcObject = canvasStream;

  const mediaStream = new MediaStream();
[canvasStream, stream].forEach((stream) => {
  stream.getTracks().forEach((track) => mediaStream.addTrack(track));
});

  // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
  medialocalStream = mediaStream;
}).catch( error => {
  // 失敗時にはエラーログを出力
  console.error('mediaDevice.getUserMedia() error:', error);
  return;
});
const peer = new Peer({
key: '3c20f20a-8d2f-457d-a7ce-7ca433b08bc0',
debug: 3
});
peer.on('open', () => {
document.getElementById('my-id').textContent = peer.id;
});
document.getElementById('make-call').onclick = () => {
const theirID = document.getElementById('their-id').value;
const mediaConnection = peer.call(theirID, medialocalStream);
setEventListener(mediaConnection);
};

// イベントリスナを設置する関数
const setEventListener = mediaConnection => {
mediaConnection.on('stream', mediastream => {
// video要素にカメラ映像をセットして再生

const videoElm = document.getElementById('their-video')
videoElm.srcObject = mediastream;
videoElm.play();

});
}
peer.on('call', mediaConnection => {
mediaConnection.answer(medialocalStream);
setEventListener(mediaConnection);
});
