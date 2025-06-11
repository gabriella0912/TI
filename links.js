let fala = null;
let statusLeitura = "parado";

function alternarLeitura() {
  const botao = document.getElementById("botaoLeitor");

  // Se estiver lendo, pausa
  if (statusLeitura === "lendo") {
    window.speechSynthesis.pause();
    statusLeitura = "pausado";
    botao.textContent = "Retomar";
    return;
  }

  // Se estiver pausado, retoma
  if (statusLeitura === "pausado") {
    window.speechSynthesis.resume();
    statusLeitura = "lendo";
    botao.textContent = "Pausar";
    return;
  }

  const texto = document.body.innerText;

  if (!texto.trim()) {
    alert("Não há texto visível para ler.");
    return;
  }

  fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";


  fala.onstart = () => {
    statusLeitura = "lendo";
    botao.textContent = "Pausar";
  };

  fala.onend = () => {
    statusLeitura = "parado";
    botao.textContent = "Ler texto";
  };

  fala.onerror = () => {
    statusLeitura = "parado";
    botao.textContent = "Ler Tudo";
    alert("Erro ao tentar ler o texto.");
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(fala);
}