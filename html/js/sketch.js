var pads, pad0;
var uvStatus = 0;
var speedMode = 0.5;
var preSend_ = "";
var pan = 0;
var tilt = 30;
var nolimits = 0;

const ua = window.navigator.userAgent.toLowerCase();
const isiPad = ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document;

function ipadSwitch() {
    if (isiPad == true) {
        return -1;
    } else {
        return 1;
    }
}

function uvBackColor() {

    backColor = document.getElementById("background");
    if (isUVOn()) {
        backColor.style.backgroundColor = "#06B2E1";
    } else {

        backColor.style.backgroundColor = "white";
    }
}

function setup() {
    let canvas = createCanvas(300, 600);
    canvas.parent('canvas0');
    textSize(14);
    stroke(80);
    strokeWeight(.3);
    frameRate(30);
}

function uvOn() {
    uvStatus = 1;
    preSend_ += 'light:' + uvStatus.toFixed(int) + "\n";
    preSend_ += "time:" + millis().toFixed(0) + "\n";
    sendData(preSend_);
}

function isUVOn() {
    if (uvStatus > 0) {
        return true;
    } else {
        return false;
    }
}

function uvOff() {
    uvStatus = 0;
    preSend_ += 'light:' + uvStatus.toFixed(int) + "\n";
    preSend_ += "time:" + millis().toFixed(0) + "\n";
    sendData(preSend_);
}


function speedHigh() {
    speedMode = 1;
}

function speedLow() {
    speedMode = 0.5;
}


function speedHighMax() {
    speedMode = 2;
}

function draw() {
    uvBackColor();
    background(240);
    pads = navigator.getGamepads();
    pad0 = pads[0];
    text('ID: ', 10, 20);
    //障害物センサ無効表示
    if (nolimits == 1) {
        caution_message_lte.innerHTML = "障害物センサ無効";
    }
    if (nolimits == 0) {
        caution_message_lte.innerHTML = "";
    }
    //現在速度設定の表示
    if (speedMode == 0.5) {
        now_speed.innerHTML = "速度：小";
    }
    if (speedMode == 1.0) {
        now_speed.innerHTML = "速度：大";
    }
    if (pad0) {

        preSend_ = "";
        text(pad0.id, 35, 20);
        for (var i = 0; i < pad0.buttons.length; i++) {
            text('button' + i + ': ' + pad0.buttons[i].value, 10, 40 + 20 * i);
        }
        for (var i = 0; i < pad0.axes.length; i++) {

            text('axes' + i + ': ' + (pad0.axes[i] * speedMode), 4, 40 + pad0.buttons.length * 20 + 20 * i);
            preSend_ += 'axes' + i + ':' + (pad0.axes[i] * speedMode).toFixed(3) + "\n";

        }
        pad0.axes[1] = pad0.axes[1] * ipadSwitch();

        if (pad0.axes[5] > 0.3) {
            tilt += 0.5;
        } else if (pad0.axes[5] < -0.3) {
            tilt -= 0.5;
        } else if (pad0.axes[4] > 0.3) {
            pan += 0.5;
        } else if (pad0.axes[4] < -0.3) {
            pan -= 0.5;
        }

        if (key == 'i') {
            tilt += 1;

        } else if (key == 'k') {
            tilt -= 1;
        } else if (key == 'l') {
            pan += 1;
        } else if (key == 'j') {
            pan -= 1;
        } else if (key == '0') {
            pan = 0;
            tilt = 30;
        }
        sendData(preSend_ + 'light:' + uvStatus.toFixed(int) + "\n" + 'nolimits:' + nolimits.toFixed(int) + "\n" /* + 'pan_in:' + pan.toFixed(int) + "\n" + 'tilt_in:' + tilt.toFixed(int) + "\n"*/ + "time:" + millis().toFixed(0) + "\n");

    } else {

        preSend_ = "";
        var speed = 0.0;
        var turn = 0.0;
        if (keyIsPressed == true) {
            if ((key == 'w') | (key == 'W')) {
                speed = -0.5;
            }
            if ((key == 's') | (key == 'S')) {
                speed = 0.5;
            }
            if ((key == 'a') | (key == 'A')) {
                turn = -0.5;
            }
            if ((key == 'd') | (key == 'D')) {
                turn = 0.5;
            }

            if (key == 'i') {
                tilt += 1;

            } else if (key == 'k') {
                tilt -= 1;
            } else if (key == 'l') {
                pan += 1;
            } else if (key == 'j') {
                pan -= 1;
            } else if (key == '0') {
                pan = -5;
                tilt = 30;
            }

            if (pan > 90) {
                pan = 90;
            } else if (pan < -90) {
                pan = -90;
            }

            if (tilt > 90) {
                tilt = 90;
            } else if (tilt < -90) {
                tilt = -90;
            }
        }

        preSend_ += 'axes' + 1 + ':' + (speed * speedMode).toFixed(3) + "\n";
        preSend_ += 'axes' + 2 + ':' + (turn * speedMode * 0.7).toFixed(3) + "\n";
        preSend_ += 'light:' + uvStatus.toFixed(int) + "\n";
        //preSend_ += 'pan_in:' + pan.toFixed(int) + "\n" + 'tilt_in:' + tilt.toFixed(int) + "\n";
        preSend_ += 'nolimits:' + nolimits.toFixed(int) + "\n";
        preSend_ += "time:" + millis().toFixed(0) + "\n";
        sendData(preSend_);
        //text(preSend_, 35, 20);

    }
}