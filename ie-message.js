const fs = require('fs');

const func = hash => `<script>
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
};
if (detectIE()) {
    document.write('<img src="ie-message.svg" style="position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 50%;"/>');
} else {
    document.write('<script src="src.${hash}.js"><\\/script>')
}
</script>`;

fs.readFile('docs/index.html', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const hash = data.match(/src\..*\.js/)[0].split('.')[1];
  console.log(hash);
  const replacement = data.replace(/<script src="src\..*\.js"><\/script>/, func(hash));
  fs.writeFile('docs/index.html', replacement, 'utf8', (err) => {
    if (err) return console.log(err);
  });
});
