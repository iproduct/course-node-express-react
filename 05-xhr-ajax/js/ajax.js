function loadXMLDoc(method, url, params, successCallback, errorCallback,
  contentType) {
  contentType = contentType || "application/x-www-form-urlencoded";
  params = params || {};
  var xmlhttp;
  var paramStr = "", p;
  var i = 0;
  var delimiter = "&";
  for (p in params) {
    paramStr += ((i > 0) ? delimiter : "") + encodeURIComponent(p) + "="
      + encodeURIComponent(params[p]);
    i++;
  }
  url = url + "?t=" + Math.random();
  if (method !== "POST" && method !== "PUT" && paramStr.length > 0) {
    url += "&" + paramStr;
  }

  if (typeof XMLHttpRequest !== "undefined") {
    xmlhttp = new XMLHttpRequest();
  } else {
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) { }
    if (xmlhttp === null) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) { }
    }
    if (xmlhttp === null) {
      return;
    }
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
        successCallback(xmlhttp);
      } else {
        errorCallback(xmlhttp);
      }
    }
  };
  xmlhttp.open(method, url, true);
  xmlhttp.setRequestHeader("Pragma", "no-cache");
  xmlhttp.setRequestHeader("Cache-Control", "no-cache");
  if ((method === "POST" || method === "PUT") && paramStr.length > 0) {
    xmlhttp.setRequestHeader("Content-type", contentType);
    xmlhttp.send(paramStr);
  } else {
    xmlhttp.send();
  }
}
function getData() {
  // loadXMLDoc("GET", "resources/ajax-info.txt",{}, showResult);
  loadXMLDoc("GET", "resources/book-catalog.xml", null, showBookCatalog);
}
function showResult(xmlhttp) {
  document.getElementById("results").innerHTML = xmlhttp.responseText;
}
function showBookCatalog(xmlhttp) {
  var xmlDoc = xmlhttp.responseXML,
      txt = '<table class="results"><tr><th>Title</th><th>Author</th> \
          <th>Publisher</th><th>Pages</th><th>Price</th></tr>';
  var x = xmlDoc.getElementsByTagName("book");
  //var y=xmlDoc.getElementsByTagName("author");
  for (var i = 0; i < x.length; i++) {
    txt = txt + "<tr><td>"
      + x[i].getElementsByTagName("title")[0].firstChild.nodeValue
      + "</td><td>" + x[i].getElementsByTagName("author")[0].firstChild.nodeValue
      + "</td><td>" + x[i].getElementsByTagName("publisher")[0].firstChild.nodeValue
      + "</td><td>" + x[i].getElementsByTagName("pages")[0].firstChild.nodeValue
      + "</td><td>" + x[i].getElementsByTagName("price")[0].firstChild.nodeValue
      + "</td></tr>";
  }
  txt += "</table>"
  document.getElementById("results").innerHTML = txt;
}