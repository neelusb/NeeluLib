// Start NeeluLib Creation

function ElementObj(tag, html, attr) {
  var outp = {};
  outp.tag = tag;
  outp.innerHTML = html;
  outp.attributes = {};
  for (i in attr) {
    outp.attributes[i] = attr[i];
  }
  return outp
};

function NeeluLib() {}

// NeeluLib.prototype.

// End NeeluLib Creation

// Start NeeluLib Function Creation

NeeluLib.prototype.create = function(tag, html, attr) {
    var element = document.createElement(tag);
    if (attr) {
      for (i in attr) {
        element.setAttribute(i, attr[i]);
      }
    }
    element.innerHTML = html || '';
    return element;
};

NeeluLib.prototype.escHTML = function(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

NeeluLib.prototype.inclJS = function(src, ele, asynch) {
  var request = new XMLHttpRequest();
  request.open('GET', src, asynch);
  request.send('');
  var element = document.createElement('script');
  element.type = "text/javascript";
  element.text = request.responseText;
  if (ele) {
    ele.appendChild(element);
  } else {
    document.head.appendChild(element);
  }
};

NeeluLib.prototype.inclCSS = function(src) {
  var element = NeeluLib.prototype.create('link', '', {type: 'text/css', rel: 'stylesheet', href: src});
  document.head.appendChild(element);
};

NeeluLib.prototype.ready = function(inputFunc) {
  document.addEventListener("DOMContentLoaded", function(event) {
    inputFunc();
  });
};

NeeluLib.prototype.in = function(element, array) {
  if (array.indexOf(element) > -1) {
    return true;
  } else {
    return false;
  }
  return array;
};

NeeluLib.prototype.serialize = function(inp) {
  var outp = [];
  for (i in inp) {
   outp.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
  }
  return outp.join("&");
};

NeeluLib.prototype.ajax = function(url, req, data, headers, cb) {
  var request = new XMLHttpRequest();
  request.open(req, url, false);
  for (i = 0; i < headers.length; i++) {
    request.setRequestHeader(i, headers[i]);
  }
  request.send(NeeluLib.prototype.serialize(data));
  cb(request.response);
  return request.response;
};

NeeluLib.prototype.get = function(url, headers, cb) {
  return NeeluLib.prototype.ajax(url, 'GET', {}, headers, cb);
};

NeeluLib.prototype.post = function(url, data, headers, cb) {
  return NeeluLib.prototype.ajax(url, 'POST', data, headers, cb);
};

NeeluLib.prototype.e = function(element) {
  if (element) {
    return document.querySelectorAll(element);
  }
};

NeeluLib.prototype.el = function(element) {
  var outp = [];
  document.querySelectorAll(element).forEach(function(i) {
    var attr = {};
    for (j = 0; j < i.attributes.length; j++) {
      attr[i.attributes[j].nodeName] = i.attributes[j].nodeValue;
    }
    outp.push(new ElementObj(i.tagName, i.innerHTML, attr));
  });
  return outp || undefined;
};

// End NeeluLib Function Creation

var nl = new NeeluLib(); // Assign variable nl to prototype NeeluLib()
var π = new NeeluLib(); // Assign variable π to prototype NeeluLib()

// Start Import Libraries

NeeluLib.prototype.importLibs = function() {
  for (var j = 0; j < NeeluLib.prototype.e('nl').length; j++) {
    var el = NeeluLib.prototype.e('nl')[j];
    el.innerHTML = "";
    for (var i = 0, atts = el.attributes, n = atts.length, nlattr = []; i < n; i++){
      nlattr.push(atts[i].nodeName);
    }
    for (i = 0; i < nlattr.length; i++) {
      if (nlattr[i] == 'jquery') {
        NeeluLib.prototype.inclJS('https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js', el); // jQuery
      } else if (nlattr[i] == 'angular') {
        NeeluLib.prototype.inclJS('https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js', el); // AngularJS
      } else if (nlattr[i] == 'cheetjs') {
        NeeluLib.prototype.inclJS('https://raw.githubusercontent.com/namuol/cheet.js/master/cheet.min.js', el); // Cheet.js
      } else if (nlattr[i] == 'normalize') {
        NeeluLib.prototype.inclCSS('https://rawgit.com/necolas/normalize.css/master/normalize.css', el); // Normalize.css
      } else if (nlattr[i] == 'w3css') {
        NeeluLib.prototype.inclCSS('http://www.w3schools.com/lib/w3.css', el); // W3.CSS
      }
    }
  }
};

if (document.querySelector('nl')) {
  NeeluLib.prototype.importLibs();
}

// End Import Libraries
