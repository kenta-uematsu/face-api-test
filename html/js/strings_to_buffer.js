// 文字列から ArrayBuffer への変換

function string_to_buffer(src) {
    return (new Uint8Array([].map.call(src, function(c) {
        return c.charCodeAt(0)
    }))).buffer;
}

// ArrayBuffer から文字列への変換

function buffer_to_string(buf) {
    return String.fromCharCode.apply("", new Uint8Array(buf))
}

// ただし、文字列が長すぎる場合は RangeError: Maximum call stack size exceeded. が発生してしまう。
// 以下は1024バイト単位に分割して処理する場合

function large_buffer_to_string(buf) {
    var tmp = [];
    var len = 1024;
    for (var p = 0; p < buf.byteLength; p += len) {
        tmp.push(buffer_to_string(buf.slice(p, p + len)));
    }
    return tmp.join("");
}