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