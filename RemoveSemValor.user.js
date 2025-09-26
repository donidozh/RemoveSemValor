// ==UserScript==
// @name         Ajustar Layout Documento GED
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Ajusta largura de tabelas e remove marca d'água do histórico.
// @author       Você
// @match        http://sigeduca.seduc.mt.gov.br/ged/hwgedteladocumento.aspx?0,36
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Verifica se existe a imagem "documentosemvalor.jpg"
    const semValorImg = document.querySelector('img[src="imagem/documentosemvalor.jpg"]');
    if (!semValorImg) return; // Se não existir, não faz nada

    // Cria o botão
    const btn = document.createElement("button");
    btn.innerText = "📄 Remover Sem Valor";
    btn.style.position = "fixed";
    btn.style.top = "10px";
    btn.style.right = "10px";
    btn.style.zIndex = "9999";
    btn.style.padding = "8px 12px";
    btn.style.background = "#007BFF";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    btn.style.fontSize = "14px";

    document.body.appendChild(btn);

    // Função que ajusta layout e remove elementos indesejados
    function ajustarLayout() {
        // Ajusta tabelas
        document.querySelectorAll("table").forEach(tbl => {
            tbl.style.width = "100%";
            tbl.style.tableLayout = "auto";
        });

        // Ajusta divs principais
        document.querySelectorAll("div, td, th").forEach(el => {
            if (el.id === "content" || el.style.width) {
                el.style.width = "100%";
            }
        });

        // Ajusta imagens gerais
        GM_addStyle(`
            img {
                max-width: 100% !important;
                height: auto !important;
            }
            @media print {
                button { display: none !important; }
            }
        `);

        // Remove marca d'água
        document.querySelectorAll('img[src="imagem/documentosemvalor.jpg"]').forEach(img => img.remove());

        // Remove qualquer <script> com window.print()
        document.querySelectorAll("script").forEach(scr => {
            if (scr.innerText.includes("window.print")) {
                scr.remove();
            }
        });

        btn.innerText = "✅ Marca d'água Removida";
        btn.disabled = true;
        btn.style.background = "#28a745"; // verde
    }

    // Clicar ativa o ajuste
    btn.addEventListener("click", ajustarLayout);
})();
