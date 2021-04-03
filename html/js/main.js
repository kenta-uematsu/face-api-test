const signalingUrl = 'wss://teleworkrobot.com/signaling';
let roomId = '9acedd01';
let clientId = null;
let videoCodec = null;
let audioCodec = null;
let signalingKey = null;

function onChangeVideoCodec() {
    videoCodec = document.getElementById("video-codec").value;
    if (videoCodec == 'none') {
        videoCodec = null;
    }
}
// query string から roomId, clientId を取得するヘルパー
function parseQueryString() {
    const qs = window.Qs;
    if (window.location.search.length > 0) {
        var params = qs.parse(window.location.search.substr(1));
        if (params.roomId) {
            roomId = params.roomId;
        }
        if (params.clientId) {
            clientId = params.clientId;
        }
        if (params.signalingKey) {
            signalingKey = params.signalingKey;
        }
    }
}

parseQueryString();

const roomIdInput = document.getElementById("roomIdInput");
roomIdInput.addEventListener('change', (event) => {
    console.log(event);
    roomId = event.target.value;
});

//スマートフォン用振動処理
function vib() {
    navigator.vibrate(50);
};

//ブラウザ判定処理
var userAgent = window.navigator.userAgent.toLowerCase();

if (userAgent.indexOf('msie') != -1 ||
    userAgent.indexOf('trident') != -1) {
    console.log('Internet Explorer');
    document.querySelector('dialog#error').showModal();
} else if (userAgent.indexOf('edg') != -1) {
    console.log('Edge');
    document.querySelector('dialog#error').showModal();
} else if (userAgent.indexOf('chrome') != -1) {
    console.log('Google Chrome');
} else if (userAgent.indexOf('safari') != -1) {
    console.log('Safari');
    document.querySelector('dialog#error').showModal();
} else if (userAgent.indexOf('firefox') != -1) {
    console.log('FireFox');
    document.querySelector('dialog#error').showModal();
} else if (userAgent.indexOf('opera') != -1) {
    console.log('Opera');
    document.querySelector('dialog#error').showModal();
} else {
    console.log('other');
    document.querySelector('dialog#error').showModal();
}

//タイマー処理
var timer = new Timer();
function start_timer() {
    var timesec = document.getElementById("count_sec").value;
    var timemin = document.getElementById("count_min").value;
    var globaltimesum = Number(timesec) + Number(timemin) * 60;
    timer.start({ countdown: true, startValues: { seconds: globaltimesum } });
    $('#timer').html(timer.getTimeValues().toString());
    timer.addEventListener('secondsUpdated', function (e) {
        $('#timer').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('targetAchieved', function (e) {
        uvOff();
        $('#timer').empty();
    });
}
function reset_timer() {
    timer.stop();
    $('#timer').empty();
    uvOff();
}