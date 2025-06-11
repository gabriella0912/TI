document.addEventListener('DOMContentLoaded', function() {
    const btn = document.createElement('button');
    btn.id = 'lerBtn';
    btn.textContent = 'Ler Texto';
    document.body.appendChild(btn);
    
    const synth = window.speechSynthesis;
    let utterance = null;
    let estaLendo = false;

    function configurarVoz() {
        if (utterance) {
            const vozes = synth.getVoices();
            if (vozes.length > 0) {
                const vozPT = vozes.find(voz => voz.lang.includes('pt')) || vozes[0];
                utterance.voice = vozPT;
            }
            utterance.rate = 1;
            utterance.pitch = 1;
        }
    }

    function lerTexto() { //pega os textos 
        const texto = document.body.innerText;
        
        if (synth.speaking && !synth.paused) {
            synth.pause();
            estaLendo = false;
            btn.textContent = 'Continuar Leitura';
            btn.classList.remove('parar');
        } else if (synth.speaking && synth.paused) {
            synth.resume();
            estaLendo = true;
            btn.textContent = 'Parar Leitura';
            btn.classList.add('parar');
        } else {
            utterance = new SpeechSynthesisUtterance(texto);
            configurarVoz();
            
            utterance.onend = function() {
                estaLendo = false;
                btn.textContent = 'Ler Texto';
                btn.classList.remove('parar');
            };
            
            synth.speak(utterance);
            estaLendo = true;
            btn.textContent = 'Parar Leitura';
            btn.classList.add('parar');
        }
    }

    synth.onvoiceschanged = configurarVoz;
    btn.addEventListener('click', lerTexto);
    configurarVoz();
});