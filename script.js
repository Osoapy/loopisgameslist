// INICIALIZANDO O CONTADOR DE JOGOS
contador = localStorage.getItem("contador")
if (contador == null) {
  // CASO SEJA A PRIMEIRA VEZ ADICIONANDO UM JOGO, O CONTADOR É 1
  localStorage.setItem("contador", "1");
  contador = 1;
}

if (contador == 1) { // SE NÃO TIVER NENHUM JOGO (CONTADOR == 1), DIGA QUE NÃO TEM JOGOS
  // LOCALIZANDO A DIV
  let listaDeJogosDiv = document.getElementById("lista_de_normais");
  // CRIANDO O SPAN E O TEXTO
  let spanElement = document.createElement("span");
  spanElement.id = "sem_jogos";
  let h2Element1 = document.createElement("h1");
  // COLOCANDO O SPAN NA LISTA
  listaDeJogosDiv.appendChild(spanElement);
  // COLOCANDO O TEXTO DENTRO DO SPAN
  h2Element1.textContent = "Nenhum jogo foi adicionado ainda :(";
  spanElement.appendChild(h2Element1);
}


// CRIANDO A FUNÇÃO ADICIONAR JOGO
// A FUNÇÃO ADICIONAR JOGO CRIA AS TAGS EM HTML PRA CADA JOGO, SEJA ELE UM JOGO COLOCADO NA SESSÃO ATUAL OU ARMAZENADO NO LOCALSTORAGE
function adicionarJogo(nome, descricao, favorito, novoJogo) {
  let nenhum_jogo_ainda = document.getElementById("sem_jogos");
  if (nenhum_jogo_ainda) { // SE ESTIVER MARCADO COMO SE NÃO TIVESSE JOGOS; RETIRE A MARCAÇÃO
    nenhum_jogo_ainda.remove(); // TIRANDO O "Nenhum jogo foi adicionado ainda :("
  }
  
  // CRIANDO OS ELEMENTOS A SEREM ADICIONADOS
  let spanElement = document.createElement("span");
  spanElement.classList.add("jogo_na_lista");
  let h1Element = document.createElement("h1");
  h1Element.classList.add("titulo_de_jogo");
  let h2Element = document.createElement("p");
  
  if (novoJogo == 1){ // CASO SEJA UM JOGO NOVO, O ADICIONE E O INCLUA NA LISTA
    let meuObjeto = {nome: nome, descricao: descricao, favorito: favorito}; // CRIANDO O OBJETO
    let objetoSerializado = JSON.stringify(meuObjeto); // TRANSFORMANDO O OBJETO EM STRING PARA ARMAZENA-LO
    localStorage.setItem(`objeto${contador}`, objetoSerializado); // ADICIONANDO-O AO LOCALSTORAGE
    contador++; // ATUALIZANDO A VARIÁVEL CONTADOR JÁ QUE ADICIONAMOS MAIS UM OBJETO
    localStorage.setItem("contador", contador); // ATUALIZANDO O CONTADOR NO LOCALSTORAGE
    h1Element.textContent = nome; // DEFININDO O NOME QUE VAI APARECER
    h2Element.textContent = descricao; // DEFININDO A DESCRIÇÃO QUE VAI APARECER
    // ADICIONANDO ELES AO "SPAN"
    spanElement.appendChild(h1Element);
    spanElement.appendChild(h2Element);
    // ENCONTRANDO A DIV E INCLUINDO O SPAN NELA
    
    if (favorito == 1) { // SE FOR FAVORITO, COLOQUE NA LISTA DE FAVORITOS
      let listaDeFavoritosDiv = document.getElementById("lista_de_favoritos");
      listaDeFavoritosDiv.appendChild(spanElement);
    }
      
    else { // SE NÃO FOR FAVORITO, COLOQUE NA LISTA DE JOGOS NORMAIS
      let listaDeJogosDiv = document.getElementById("lista_de_normais");
      listaDeJogosDiv.appendChild(spanElement);
    }
  }
    
  // SENÃO FOR UM JOGO NOVO (DE UMA SESSÃO PASSADA), O ADICIONE NA LISTA E NÃO O INCLUA NO LOCALSTORAGE
  else {
    // DEFININDO O TEXTO DELES COM BASE NO INPUT
    h1Element.textContent = nome;
    h2Element.textContent = descricao;
    // ADICIONANDO ELES AO "SPAN"
    spanElement.appendChild(h1Element);
    spanElement.appendChild(h2Element);
    // ENCONTRANDO A DIV E INCLUINDO O SPAN NELA
    if (favorito == 1) { // SE FOR FAVORITO, COLOQUE NA LISTA DE FAVORITOS
      let listaDeFavoritosDiv = document.getElementById("lista_de_favoritos");
      listaDeFavoritosDiv.appendChild(spanElement);
    }
      
    else { // SE NÃO FOR FAVORITO, COLOQUE NA LISTA DE JOGOS NORMAIS
      let listaDeJogosDiv = document.getElementById("lista_de_normais");
      listaDeJogosDiv.appendChild(spanElement);
    }
  }
}


// CRIANDO A FUNÇÃO ADICIONAR
// A FUNÇÃO ADICIONAR CHAMA A FUNÇÃO ADICIONARJOGO E DIZ PRA ELA QUE É UM JOGO NOVO, NÃO UM JOGO QUE FOI LIDO DO LOCALSTORAGE DE UMA SESSÃO PASSADA
function adicionar(event) {
  event.preventDefault(); // PREVINE QUE AO ADICIONAR QUALQUER JOGO A PÁGINA DÊ REUNLOAD
  let nome = document.getElementById("nome_do_jogo").value; // PEGANDO O NOME DO JOGO
  let descricao = document.getElementById("descricao_do_jogo").value; // PEGANDO A DESCRIÇÃO DO JOGO
  let botoes_favorito = document.getElementsByName("favorito"); // PEGANDO OS BOTÕES QUE SIMBOLIZAM O ESTADO DE FAVORITO
  // Itere pelos botões de rádio para encontrar o selecionado
  let botao_checado = 0, resposta_selecionada = 0;
  for (botao_checado = 0; botao_checado < 2; botao_checado++) {
    if (botoes_favorito[botao_checado].checked) { // SE A CAIXA ESTIVER SELECIONADA
      botoes_favorito[botao_checado].checked = false; // DESMARQUE A CAIXA PARA O PRÓXIMO JOGO A SER ADICIONADO
      break; // SAIR DO LOOP CASO TENHA ENCONTRADO UM BOTÃO MARCADO
    }
  }
  
  if (botao_checado == 0) { // SE O BOTÃO CHECADO FOR O PRIMEIRO (o Sim) ADICIONE COMO FAVORITO
    if(nome !== "" && descricao !== "") { // CONFERINDO SE OS CAMPOS NOME E DESCRIÇÃO ESTÃO PREENCHIDOS
      adicionarJogo(nome, descricao, 1, 1);
      // ZERE OS VALORES DE NOME E DESCRIÇÃO PARA O PRÓXIMO JOGO
      document.getElementById("nome_do_jogo").value = "";
      document.getElementById("descricao_do_jogo").value = ""; 
    }
  }
    
  else if (botao_checado == 1) { // SENÃO SE O BOTÃO CHECADO FOR O SEGUNDO (o Não) ADICIONE COMO NÃO-FAVORITO
    if(nome !== "" && descricao !== "") { // CONFERINDO SE OS CAMPOS NOME E DESCRIÇÃO ESTÃO PREENCHIDOS
      adicionarJogo(nome, descricao, 0, 1);
      // ZERE OS VALORES DE NOME E DESCRIÇÃO PARA O PRÓXIMO JOGO
      document.getElementById("nome_do_jogo").value = "";
      document.getElementById("descricao_do_jogo").value = ""; 
    }
  }
  // POR LÓGICA, SE O USUÁRIO NÃO MARCOU "SIM" OU "NÃO" PRA FAVORITO, POR PADRÃO NÃO IREMOS ADICIONAR O JOGO
}









// CRIANDO A FUNÇÃO INICIAR APÓS RECARGA
function iniciarAposRecarga() { // UM PROBLEMA É DESCOBRIR QUANDO A PÁGINA FOI REINICIADA PARA OLHAR O LOCALSTORAGE
  // LENDO TODOS OS OBJETOS ARMAZENADOS E ADICIONANDO CADA UM DELES A LISTA (ORDEM DE ADIÇÃO)
  for(let k = 1; k < contador; k++){
    let objetoSerializado = localStorage.getItem(`objeto${k}`);
    if (objetoSerializado){
      let Objeto = JSON.parse(objetoSerializado); // TRANSFORMANDO UMA STRING EM OBJETO DE NOVO
      adicionarJogo(Objeto["nome"], Objeto["descricao"], Objeto["favorito"], 0);
    }
  }
}
window.addEventListener("beforeunload", function() { // TODA VEZ QUE FOR DAR F5 COLOCAR UM ITEM "PÁGINA RECARREGADA" COM VALOR TRUE
  localStorage.setItem("paginaRecarregada", "true");
});
window.addEventListener("load", function() { // TODA VEZ QUE CARREGAR FAZER A LEITURA DOS DADOS
  if (localStorage.getItem("paginaRecarregada") === "true") { // SE EXISTIR UM ITEM "PÁGINA RECARREGADA: TRUE" FAÇA O PROCESSO DE INICIAR APÓS RECARGA
    iniciarAposRecarga();
    localStorage.removeItem("paginaRecarregada");
  }
});
