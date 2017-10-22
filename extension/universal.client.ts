(<any>window).browser = (function () {
  return window.chrome;
})();

console.log("Universal browser extension example content script started");

// Convert all unlinked text matching the regex object to links, and pass the resulting links to a callback for any further processing
var linkify = function (regexObject, anchorCallback, linkifyLinks = false) {
  // Iterate over candidate nodes
  var excludeTags = ['head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'];
  if (!linkifyLinks)
    excludeTags.push('a');

  var exclude = " and not(ancestor::" + excludeTags.join(") and not(ancestor::") + ") ";
  var exclude_editor = " and not(ancestor-or-self::*[contains(@class, 'cke_editable')]) ";

  var xpath = "/html//text()[normalize-space(.) != ''" + exclude_editor + exclude + ']';
  var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var cand = null, i = 0;
    (cand = candidates.snapshotItem(i)); i++) {
    var txt = cand.nodeValue;

    // Skip real XML
    if (txt.indexOf("<?xml") === 0) {
      continue;
    }

    // Skip hidden nodes
    try {
      if (getComputedStyle(cand.parentNode, null).display == "none") {
        continue;
      }
    } catch (e) {}

    // Perform matches
    var span = null;
    var p = 0;
    regexObject.lastIndex = 0;
    while (true) {
      var match = regexObject.exec(txt);
      if (!match)
        break;
      if (!span) {
        span = document.createElement('span');
      }

      // Insert text before the link
      span.appendChild(document.createTextNode(txt.substring(p, match.index)));

      // Insert the link itself
      var a = document.createElement('a');
      a.appendChild(document.createTextNode(match[0]));
      a.setAttribute('target', '_top');
      anchorCallback(a, match);
      span.appendChild(a);

      p = regexObject.lastIndex;
    }

    if (span) {
      // Insert remaining text after the link
      span.appendChild(document.createTextNode(txt.substring(p, txt.length)));

      span.normalize();

      // replace the original text with the new span
      // TODO: replace with the span's *children* instead?
      cand.parentNode.replaceChild(span, cand);
    }
  }
};

var generateLinks = function () {
  linkify(
    /\b((?:https?|s?ftp|scp):\/\/(?!p4)[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})\b/ig,
    function (a, match) {
      var m = match[0];
      if (m.indexOf('://') == -1 && m.indexOf('@') != -1) {
        m = 'mailto:' + m;
      }
      a.setAttribute('href', m);
    });
};

try {
  generateLinks();

  // We also want to check when Javascript modifies the page, potentially adding in links
  var modifiedTimeout = null;

  //used to wait for a while before modifying page. Otherwise, we get FAR too many events.
  document.addEventListener("DOMSubtreeModified", function () {
    if (modifiedTimeout !== null) {
      clearTimeout(modifiedTimeout);
    }
    modifiedTimeout = setTimeout(function () {
      generateLinks();
      modifiedTimeout = null;
    }, 1000);
  }, false);
} catch (e) {
  alert('Linkify Error (' + e.lineNumber + '): ' + e + '\n');
}