document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('lerBtn');
    const synth = window.speechSynthesis;
    let utterance = null;
    let isSpeaking = false;

    // Função para ler todo o texto da página
    function lerTexto() {
        // Se já estiver lendo, para a leitura
        if (isSpeaking) {
            synth.cancel();
            isSpeaking = false;
            btn.textContent = 'Ler Texto';
            btn.classList.remove('parar');
            return;
        }

        // Se não estiver lendo, começa a leitura
        const texto = document.body.textContent || document.body.innerText;
        utterance = new SpeechSynthesisUtterance(texto);
        
        // Configurações da voz
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.lang = 'pt-BR';

        // Evento quando a leitura terminar
        utterance.onend = function() {
            isSpeaking = false;
            btn.textContent = 'Ler Texto';
            btn.classList.remove('parar');
        };

        // Evento em caso de erro
        utterance.onerror = function(event) {
            console.error('Erro na leitura:', event);
            isSpeaking = false;
            btn.textContent = 'Ler Texto';
            btn.classList.remove('parar');
        };

        // Inicia a leitura
        synth.speak(utterance);
        isSpeaking = true;
        btn.textContent = 'Parar Leitura';
        btn.classList.add('parar');
    }

    // Adiciona o evento de clique ao botão
    btn.addEventListener('click', lerTexto);
});