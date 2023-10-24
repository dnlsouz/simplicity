"use strict";

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");

//Seleção do campo telefone usando JS puro
const campoTelefone = formulario.querySelector("#telefone");

//ou: seleção do campo telefone usando jQuery
//const campoTelefone = $("#telefone");

//Ativando a máscara para o telefone 
$(campoTelefone).mask("(00) 0000-0000"); //Exemplo: (11 2135-0300)
$(campoCep).mask ()

//Detectando o evento de Click  no botão buscar
botaoBuscar.addEventListener("click", async function(event){
    event.preventDefault();
    //console.log("Botão acionado...");
    let cep; //undefined

    /* Verificando se o cep NÃO tem 8 digitos
    O OPERADOR !== SIGNIFICA "DIFEENTE DE" */
     if (campoCep.value.length !==9){
        mensagem.textContent = "Digite um Cep válido";
        mensagem.style.color = "purple";
       
       } else {
        //Caso contrário (ou seja, tem 8 digitos), guarde o valor 
        cep = campoCep.value;

        console.log("CEP válido, tem os 8 digitos...");



       }

       /* Ajax -> Técnica de comunicação assincrona para acessar uma API (www.viacep.com.br) */

       //Etapa 1: preparar a URL da API com o CEP digitado
      

     const url = `https://viacep.com.br/ws/${cep}/json/`;

    //Etapa 2: acessar a API (com a URL) e aguardar o retorno dela
    const resposta = await fetch(url);
     
    //Etapa 3: extrair os dados da resposta em formato JSON
    const dados = await resposta.json();

   //Etapa 4: lidar com os dados de reposta ( em caso de erro ou sucessso )
   if( "erro" in dados){
    mensagem.textContent = "CEP inexistente!";
    mensagem.style.color = "red";
    
   } else {
    mensagem.textContent = "CEP encontrado";
    mensagem.style.color = "blue";
    
    
    campoEndereco.value = dados.logradouro; 
    campoBairro.value = dados.bairro;
    campoCidade.value = dados.localidade;
    campoEstado.value = dados.uf;
   }
});
