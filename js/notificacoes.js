function mostrarToast(mensagem) {
const toast = document.getElementById("toast");
  if (typeof Toastify !== "undefined") {
    Toastify({
      text: mensagem,
      duration: 3000,
      gravity: "bottom",
      position: "right",
      close: true
    }).showToast();

    return;
  }

  if (!toast) return;

  toast.textContent = mensagem;
  toast.classList.add("ativo");

  window.clearTimeout(mostrarToast.timer);

  mostrarToast.timer = window.setTimeout(() => {
    toast.classList.remove("ativo");
  }, 3000);
}