document.addEventListener('DOMContentLoaded', function () {

    var btnCopy = document.getElementById('btn-copy');

    // Função para copiar os dados da session storage da página atual
    btnCopy.addEventListener('click', function () {

        chrome.tabs.getSelected(null, function (tab) {
            d = document;

            var script = 'JSON.parse(JSON.stringify(window.sessionStorage))';

            chrome.tabs.executeScript({
                code: script
            }, function (results) {
                console.log(results);

                console.log(results[0]['modulosJubarte']);

                var map = {
                    "token": results[0]['YWNjZXNzX3Rva2Vu'],
                    "modulosJubarte": results[0]['modulosJubarte']
                };

                chrome.storage.sync.set(map, function () {
                    window.close();
                });
            });
        });
    }, false);

    var btnPaste = document.getElementById('btn-paste');

    // Função para colar os dados da session storage copiados anteriormente na página atual
    btnPaste.addEventListener('click', function () {

        chrome.tabs.getSelected(null, function (tab) {
            d = document;
            chrome.storage.sync.get(['token', 'modulosJubarte'], function (result) {
                console.log(result.modulosJubarte);

                var script = `
                    window.sessionStorage.setItem("YWNjZXNzX3Rva2Vu", "${result.token}"); 
                    window.sessionStorage.setItem("modulosJubarte", '${result.modulosJubarte}');
                `;

                chrome.tabs.executeScript({
                    code: script
                }, function (results) {
                    window.close();
                });
            });
        });
    }, false);
}, false);
