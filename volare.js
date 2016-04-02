window.volare2commons = function() {

  var info = extract();
  var href = 'https://tools.wmflabs.org/url2commons/index.html' +
    '#urls=' + encodeURIComponent(info.img + ' ' + info.title.replace(/ /g, '_') + '.jpg') +
    '&desc=' + encodeURIComponent(info.description);
  console.log(href);
  window.location = href;

  function extract() {
    var content = document.getElementById('divcontent').innerHTML;

    var m;
    var info = {
      source: document.location.href,
      id: (m = document.location.href.match(/o:(\d+)/)) && m[1],
      img: (m = content.match(/[^"]*fedora.volare.vorarlberg.at[^"]*/)) && m[0],
      title: (m = content.match(/Titel: ([^<]+)/)) && m[1],
      collection: (m = content.match(/Sammlung: ([^<]+)/)) && m[1],
      year: (m = content.match(/Jahr: (\d+)/)) && m[1],
      license: content.match('creativecommons.org/licenses/by/') ? '{{cc-by-sa-4.0}}' : '',
    };

    var description = [
      '=={{int:filedesc}}==',
      '{{Information',
      '|description={{de|1=${title}}}',
      '|date=${year}',
      '|source=${source}',
      '|author=Sammlung ${collection}, Vorarlberger Landesbibliothek',
      '|permission={{Volare|id=${id}|collection=${collection}}}',
      '|other versions=',
      '}}',
      '',
      '=={{int:license-header}}==',
      '${license}',
      '',
    ].join('\n');

    for (k in info) {
      description = description.replace(new RegExp('\\${' + k + '}', 'g'), info[k]);
    }

    info.description = description;
    return info;
  }


};
