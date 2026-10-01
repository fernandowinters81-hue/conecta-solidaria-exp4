 const dadosProjetos = [
    {
      icone: "🥫",
      categoria: "Doação",
      titulo: "Alimento que Aproxima",
      descricao: "Arrecadação e distribuição de alimentos para famílias em situação de vulnerabilidade.",
      botao: "Saiba mais",
      mensagem: "A campanha recebe alimentos não perecíveis e organiza a distribuição para famílias cadastradas."
    },
    {
      icone: "🧥",
      categoria: "Campanha",
      titulo: "Campanha do Agasalho",
      descricao: "Coleta de roupas e cobertores para pessoas que precisam de apoio durante o inverno.",
      botao: "Participar",
      mensagem: "A campanha recebe roupas e cobertores em bom estado para distribuição durante o período de frio."
    },
    {
      icone: "🤝",
      categoria: "Voluntariado",
      titulo: "Seja voluntário",
      descricao: "Participe da organização de doações, campanhas e atendimento ao público.",
      botao: "Quero ajudar",
      mensagem: "Cadastre-se para receber informações sobre oportunidades de voluntariado da Conecta Solidária."
    }
  ];
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
const CHAVE_CADASTRO = "conectaSolidariaCadastro";

function salvarCadastroLocal(formulario) {
    if (!formulario) return;

    const dados = Object.fromEntries(
      new FormData(formulario).entries()
    );

    // Não armazenar dados mais sensíveis no localStorage
    delete dados.cpf;
    delete dados.nascimento;

    localStorage.setItem(
      CHAVE_CADASTRO,
      JSON.stringify(dados)
    );
  }

  function restaurarCadastroLocal(formulario) {
    if (!formulario) return;

    const dadosSalvos =
      localStorage.getItem(CHAVE_CADASTRO);

    if (!dadosSalvos) return;

    try {
      const dados = JSON.parse(dadosSalvos);

      Object.entries(dados).forEach(([nome, valor]) => {
        const campo =
          formulario.elements.namedItem(nome);

        if (campo) {
          campo.value = valor;
        }
      });
    } catch (erro) {
      localStorage.removeItem(CHAVE_CADASTRO);
    }
  }
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const appSPA = document.getElementById("app");
  const inicioHTML = appSPA ? appSPA.innerHTML : "";
  const toast = document.getElementById("toast");

  

 

  
    

  function configurarMenu() {
    if (!menuToggle || !menu) return;

    menuToggle.addEventListener("click", () => {
      const aberto = menu.classList.toggle("aberto");

      menuToggle.setAttribute("aria-expanded", String(aberto));
      menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
      );
    });
  }

  function atualizarMenuAtivo() {
    const rota = window.location.hash || "#inicio";
    const links = document.querySelectorAll("#menu-principal a");

    links.forEach((link) => {
    const ativo = link.getAttribute("href") === rota;

    link.classList.toggle("ativo", ativo);

    if (ativo) {
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }
});
  }

  

  function renderizarProjetosDinamicos() {
    const gradeProjetos =
      document.querySelector("#app .grid-12");

    if (!gradeProjetos) return;

    gradeProjetos.innerHTML = dadosProjetos
      .map(
        (projeto) => `
        <article class="card projeto-card col-4">
          <div class="card-icone" aria-hidden="true">
            ${projeto.icone}
          </div>

          <span class="badge">
            ${projeto.categoria}
          </span>

          <h2>${projeto.titulo}</h2>

          <p>${projeto.descricao}</p>

          <button
            class="botao abrir-modal"
            type="button"
            data-titulo="${projeto.titulo}"
            data-mensagem="${projeto.mensagem}">
            ${projeto.botao}
          </button>
        </article>
      `
      )
      .join("");
  }

  function ativarProjetosSPA() {
    const modal =
      document.getElementById("modal-projeto");

    const titulo =
      document.getElementById("modal-titulo");

    const texto =
      document.getElementById("modal-texto");

    const botoesAbrir =
      document.querySelectorAll(".abrir-modal");

    const botoesFechar =
      document.querySelectorAll(
        ".modal-fechar, .modal-fechar-secundario"
      );

    if (!modal) return;

    botoesAbrir.forEach((botao) => {
      botao.addEventListener("click", () => {
        if (titulo) {
          titulo.textContent =
            botao.dataset.titulo || "Informações";
        }

        if (texto) {
          texto.textContent =
            botao.dataset.mensagem || "";
        }

        modal.hidden = false;
      });
    });

    botoesFechar.forEach((botao) => {
      botao.addEventListener("click", () => {
        modal.hidden = true;
      });
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.hidden = true;
      }
    });
  }

  function ativarCadastroSPA() {
    const formularioSPA =
      document.getElementById("form-cadastro");

    const modalSPA =
      document.getElementById("modal-confirmacao");

    const fecharModalSPA =
      document.getElementById("fechar-modal");

    const botaoToastSPA =
      document.getElementById("testar-toast");

    const cpfSPA =
      document.getElementById("cpf");

    const telefoneSPA =
      document.getElementById("telefone");

    const cepSPA =
      document.getElementById("cep");

    if (!formularioSPA) return;

    restaurarCadastroLocal(formularioSPA);

    if (botaoToastSPA) {
      botaoToastSPA.addEventListener("click", () => {
        mostrarToast(
          "✓ Cadastro realizado com sucesso!"
        );
      });
    }

    formularioSPA.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        if (!formularioSPA.checkValidity()) {
          formularioSPA.reportValidity();
          return;
        }

        salvarCadastroLocal(formularioSPA);

        if (modalSPA) {
          modalSPA.style.display = "flex";
        }
      }
    );

    formularioSPA.addEventListener(
      "reset",
      () => {
        localStorage.removeItem(CHAVE_CADASTRO);
      }
    );

    if (fecharModalSPA && modalSPA) {
      fecharModalSPA.addEventListener(
        "click",
        () => {
          modalSPA.style.display = "none";
        }
      );
    }

    if (modalSPA) {
      modalSPA.addEventListener(
        "click",
        (event) => {
          if (event.target === modalSPA) {
            modalSPA.style.display = "none";
          }
        }
      );
    }

    if (cpfSPA) {
      cpfSPA.addEventListener("input", () => {
        let valor = cpfSPA.value
          .replace(/\D/g, "")
          .slice(0, 11);

        valor = valor.replace(
          /(\d{3})(\d)/,
          "$1.$2"
        );

        valor = valor.replace(
          /(\d{3})(\d)/,
          "$1.$2"
        );

        valor = valor.replace(
          /(\d{3})(\d{1,2})$/,
          "$1-$2"
        );

        cpfSPA.value = valor;
      });
    }

    if (telefoneSPA) {
      telefoneSPA.addEventListener(
        "input",
        () => {
          let valor = telefoneSPA.value
            .replace(/\D/g, "")
            .slice(0, 11);

          valor = valor.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
          );

          valor = valor.replace(
            /(\d{5})(\d{1,4})$/,
            "$1-$2"
          );

          telefoneSPA.value = valor;
        }
      );
    }

    if (cepSPA) {
      cepSPA.addEventListener("input", () => {
        let valor = cepSPA.value
          .replace(/\D/g, "")
          .slice(0, 8);

        valor = valor.replace(
          /(\d{5})(\d{1,3})$/,
          "$1-$2"
        );

        cepSPA.value = valor;
      });
    }
  }

  function renderizarPagina() {
    if (!appSPA) return;

    const rota =
      window.location.hash || "#inicio";

    if (rota === "#projetos") {
      const templateProjetos =
        document.getElementById(
          "template-projetos"
        );

      if (!templateProjetos) return;

      appSPA.innerHTML = "";

      appSPA.appendChild(
        templateProjetos.content.cloneNode(true)
      );

      renderizarProjetosDinamicos();
      ativarProjetosSPA();

    } else if (rota === "#cadastro") {
      const templateCadastro =
        document.getElementById(
          "template-cadastro"
        );

      if (!templateCadastro) return;

      appSPA.innerHTML = "";

      appSPA.appendChild(
        templateCadastro.content.cloneNode(true)
      );

      ativarCadastroSPA();

    } else {
      appSPA.innerHTML = inicioHTML;
    }

    atualizarMenuAtivo();
    window.scrollTo(0, 0);
  }

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") return;

      const modalProjeto =
        document.getElementById(
          "modal-projeto"
        );

      if (
        modalProjeto &&
        !modalProjeto.hidden
      ) {
        modalProjeto.hidden = true;
      }

      const modalCadastro =
        document.getElementById(
          "modal-confirmacao"
        );

      if (modalCadastro) {
        modalCadastro.style.display = "none";
      }
    }
  );

  configurarMenu();

  window.addEventListener(
    "hashchange",
    renderizarPagina
  );

  renderizarPagina();
});
