var hexcase = 0,
  b64pad = "",
  chrsz = 8;
function hex_md5(t) {
  return binl2hex(core_md5(str2binl(t), t.length * chrsz));
}
function b64_md5(t) {
  return binl2b64(core_md5(str2binl(t), t.length * chrsz));
}
function str_md5(t) {
  return binl2str(core_md5(str2binl(t), t.length * chrsz));
}
function hex_hmac_md5(t, e) {
  return binl2hex(core_hmac_md5(t, e));
}
function b64_hmac_md5(t, e) {
  return binl2b64(core_hmac_md5(t, e));
}
function str_hmac_md5(t, e) {
  return binl2str(core_hmac_md5(t, e));
}
function md5_vm_test() {
  return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc");
}
function core_md5(t, e) {
  (t[e >> 5] |= 128 << e % 32), (t[14 + (((e + 64) >>> 9) << 4)] = e);
  for (
    var n = 1732584193, r = -271733879, o = -1732584194, i = 271733878, a = 0;
    a < t.length;
    a += 16
  ) {
    var u = n,
      s = r,
      c = o,
      l = i;
    (n = md5_ff(n, r, o, i, t[a + 0], 7, -680876936)),
      (i = md5_ff(i, n, r, o, t[a + 1], 12, -389564586)),
      (o = md5_ff(o, i, n, r, t[a + 2], 17, 606105819)),
      (r = md5_ff(r, o, i, n, t[a + 3], 22, -1044525330)),
      (n = md5_ff(n, r, o, i, t[a + 4], 7, -176418897)),
      (i = md5_ff(i, n, r, o, t[a + 5], 12, 1200080426)),
      (o = md5_ff(o, i, n, r, t[a + 6], 17, -1473231341)),
      (r = md5_ff(r, o, i, n, t[a + 7], 22, -45705983)),
      (n = md5_ff(n, r, o, i, t[a + 8], 7, 1770035416)),
      (i = md5_ff(i, n, r, o, t[a + 9], 12, -1958414417)),
      (o = md5_ff(o, i, n, r, t[a + 10], 17, -42063)),
      (r = md5_ff(r, o, i, n, t[a + 11], 22, -1990404162)),
      (n = md5_ff(n, r, o, i, t[a + 12], 7, 1804603682)),
      (i = md5_ff(i, n, r, o, t[a + 13], 12, -40341101)),
      (o = md5_ff(o, i, n, r, t[a + 14], 17, -1502002290)),
      (n = md5_gg(
        n,
        (r = md5_ff(r, o, i, n, t[a + 15], 22, 1236535329)),
        o,
        i,
        t[a + 1],
        5,
        -165796510
      )),
      (i = md5_gg(i, n, r, o, t[a + 6], 9, -1069501632)),
      (o = md5_gg(o, i, n, r, t[a + 11], 14, 643717713)),
      (r = md5_gg(r, o, i, n, t[a + 0], 20, -373897302)),
      (n = md5_gg(n, r, o, i, t[a + 5], 5, -701558691)),
      (i = md5_gg(i, n, r, o, t[a + 10], 9, 38016083)),
      (o = md5_gg(o, i, n, r, t[a + 15], 14, -660478335)),
      (r = md5_gg(r, o, i, n, t[a + 4], 20, -405537848)),
      (n = md5_gg(n, r, o, i, t[a + 9], 5, 568446438)),
      (i = md5_gg(i, n, r, o, t[a + 14], 9, -1019803690)),
      (o = md5_gg(o, i, n, r, t[a + 3], 14, -187363961)),
      (r = md5_gg(r, o, i, n, t[a + 8], 20, 1163531501)),
      (n = md5_gg(n, r, o, i, t[a + 13], 5, -1444681467)),
      (i = md5_gg(i, n, r, o, t[a + 2], 9, -51403784)),
      (o = md5_gg(o, i, n, r, t[a + 7], 14, 1735328473)),
      (n = md5_hh(
        n,
        (r = md5_gg(r, o, i, n, t[a + 12], 20, -1926607734)),
        o,
        i,
        t[a + 5],
        4,
        -378558
      )),
      (i = md5_hh(i, n, r, o, t[a + 8], 11, -2022574463)),
      (o = md5_hh(o, i, n, r, t[a + 11], 16, 1839030562)),
      (r = md5_hh(r, o, i, n, t[a + 14], 23, -35309556)),
      (n = md5_hh(n, r, o, i, t[a + 1], 4, -1530992060)),
      (i = md5_hh(i, n, r, o, t[a + 4], 11, 1272893353)),
      (o = md5_hh(o, i, n, r, t[a + 7], 16, -155497632)),
      (r = md5_hh(r, o, i, n, t[a + 10], 23, -1094730640)),
      (n = md5_hh(n, r, o, i, t[a + 13], 4, 681279174)),
      (i = md5_hh(i, n, r, o, t[a + 0], 11, -358537222)),
      (o = md5_hh(o, i, n, r, t[a + 3], 16, -722521979)),
      (r = md5_hh(r, o, i, n, t[a + 6], 23, 76029189)),
      (n = md5_hh(n, r, o, i, t[a + 9], 4, -640364487)),
      (i = md5_hh(i, n, r, o, t[a + 12], 11, -421815835)),
      (o = md5_hh(o, i, n, r, t[a + 15], 16, 530742520)),
      (n = md5_ii(
        n,
        (r = md5_hh(r, o, i, n, t[a + 2], 23, -995338651)),
        o,
        i,
        t[a + 0],
        6,
        -198630844
      )),
      (i = md5_ii(i, n, r, o, t[a + 7], 10, 1126891415)),
      (o = md5_ii(o, i, n, r, t[a + 14], 15, -1416354905)),
      (r = md5_ii(r, o, i, n, t[a + 5], 21, -57434055)),
      (n = md5_ii(n, r, o, i, t[a + 12], 6, 1700485571)),
      (i = md5_ii(i, n, r, o, t[a + 3], 10, -1894986606)),
      (o = md5_ii(o, i, n, r, t[a + 10], 15, -1051523)),
      (r = md5_ii(r, o, i, n, t[a + 1], 21, -2054922799)),
      (n = md5_ii(n, r, o, i, t[a + 8], 6, 1873313359)),
      (i = md5_ii(i, n, r, o, t[a + 15], 10, -30611744)),
      (o = md5_ii(o, i, n, r, t[a + 6], 15, -1560198380)),
      (r = md5_ii(r, o, i, n, t[a + 13], 21, 1309151649)),
      (n = md5_ii(n, r, o, i, t[a + 4], 6, -145523070)),
      (i = md5_ii(i, n, r, o, t[a + 11], 10, -1120210379)),
      (o = md5_ii(o, i, n, r, t[a + 2], 15, 718787259)),
      (r = md5_ii(r, o, i, n, t[a + 9], 21, -343485551)),
      (n = safe_add(n, u)),
      (r = safe_add(r, s)),
      (o = safe_add(o, c)),
      (i = safe_add(i, l));
  }
  return Array(n, r, o, i);
}
function md5_cmn(t, e, n, r, o, i) {
  return safe_add(bit_rol(safe_add(safe_add(e, t), safe_add(r, i)), o), n);
}
function md5_ff(t, e, n, r, o, i, a) {
  return md5_cmn((e & n) | (~e & r), t, e, o, i, a);
}
function md5_gg(t, e, n, r, o, i, a) {
  return md5_cmn((e & r) | (n & ~r), t, e, o, i, a);
}
function md5_hh(t, e, n, r, o, i, a) {
  return md5_cmn(e ^ n ^ r, t, e, o, i, a);
}
function md5_ii(t, e, n, r, o, i, a) {
  return md5_cmn(n ^ (e | ~r), t, e, o, i, a);
}
function core_hmac_md5(t, e) {
  var n = str2binl(t);
  n.length > 16 && (n = core_md5(n, t.length * chrsz));
  for (var r = Array(16), o = Array(16), i = 0; i < 16; i++)
    (r[i] = 909522486 ^ n[i]), (o[i] = 1549556828 ^ n[i]);
  var a = core_md5(r.concat(str2binl(e)), 512 + e.length * chrsz);
  return core_md5(o.concat(a), 640);
}
function safe_add(t, e) {
  var n = (65535 & t) + (65535 & e);
  return (((t >> 16) + (e >> 16) + (n >> 16)) << 16) | (65535 & n);
}
function bit_rol(t, e) {
  return (t << e) | (t >>> (32 - e));
}
function str2binl(t) {
  for (
    var e = Array(), n = (1 << chrsz) - 1, r = 0;
    r < t.length * chrsz;
    r += chrsz
  )
    e[r >> 5] |= (t.charCodeAt(r / chrsz) & n) << r % 32;
  return e;
}
function binl2str(t) {
  for (var e = "", n = (1 << chrsz) - 1, r = 0; r < 32 * t.length; r += chrsz)
    e += String.fromCharCode((t[r >> 5] >>> r % 32) & n);
  return e;
}
function binl2hex(t) {
  for (
    var e = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", n = "", r = 0;
    r < 4 * t.length;
    r++
  )
    n +=
      e.charAt((t[r >> 2] >> ((r % 4) * 8 + 4)) & 15) +
      e.charAt((t[r >> 2] >> ((r % 4) * 8)) & 15);
  return n;
}
function binl2b64(t) {
  for (var e = "", n = 0; n < 4 * t.length; n += 3)
    for (
      var r =
          (((t[n >> 2] >> ((n % 4) * 8)) & 255) << 16) |
          (((t[(n + 1) >> 2] >> (((n + 1) % 4) * 8)) & 255) << 8) |
          ((t[(n + 2) >> 2] >> (((n + 2) % 4) * 8)) & 255),
        o = 0;
      o < 4;
      o++
    )
      8 * n + 6 * o > 32 * t.length
        ? (e += b64pad)
        : (e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
            (r >> (6 * (3 - o))) & 63
          ));
  return e;
}
