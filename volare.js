window.volare2commons = function() {
  var info = extract();
  var href =
    "https://tools.wmflabs.org/url2commons/index.html" +
    "#urls=" +
    encodeURIComponent(
      info.img + " " + info.title.replace(/[^A-Za-z0-9ÄÖÜäöüß]+/g, "_") + ".jpg"
    ) +
    "&desc=" +
    encodeURIComponent(info.description);
  console.log(href);
  window.location = href;

  function extract() {
    var elm = document.getElementById("inhalt");
    var content = elm.innerHTML;

    var m;
    var info = {
      source: document.location.href,
      id: (m = document.location.href.match(/o:(\d+)/)) && m[1],
      img: (m = content.match(/[^"]*fedora.volare.vorarlberg.at[^"]*/)) && m[0],
      title: (m = elm.getElementsByTagName("h2")) && m[0] && m[0].innerHTML,
      collection: (m = content.match(/Sammlung: ([^<]+)/)) && m[1],
      year: ((m = content.match(/Jahr: (\d+)/)) && m[1]) || "{{other date|?}}"
    };
    var cc_by = content.match("creativecommons.org/licenses/by/");

    var description = [
      "=={{int:filedesc}}==",
      "{{Information",
      "|description={{de|1=${title}}}",
      "|date=${year}",
      "|source=${source}",
      "|author=Sammlung ${collection}, Vorarlberger Landesbibliothek",
      "|other versions=",
      "}}",
      "",
      "=={{int:license-header}}==",
      cc_by ? "{{Volare|id=${id}|collection=${collection}}}" : "",
      ""
    ].join("\n");

    for (k in info) {
      description = description.replace(
        new RegExp("\\${" + k + "}", "g"),
        info[k]
      );
    }

    info.description = description;
    return info;
  }
};
