$(document).ready(function () {
  console.log("Ready");

  //  Busque a data atual e atualize-a no DOM
  let currentDate = new Date().toLocaleDateString();
  $("#current-date").text(currentDate);

  // Escreva um evento, quando o botão Enviar for clicado
  $("#button").click(function () {
    //  Obtenha o valor do texto da área de texto usando o método 'val()'
    let text_value = $("#text").val();

    //  Converta-o em um objeto JS.
    //  Forneça uma "chave" aqui e escreva o mesmo no arquivo app.py também para extrair dados
    let input_text = { review: text_value };
    console.log(input_text);

    //  requisição ajax
    $.ajax({
      //  tipo da requisição web
      type: "POST",
      url: "/api_url",

      //  dados a serem enviados no formato JSON
      data: JSON.stringify(input_text),

      //  o tipo de resposta esperado é json
      dataType: "json",

      //  contentType
      contentType: "application/json",

      //  se tudo funcionar, execute esta função
      success: function (result) {
        // extraia previsão e a URL do emoticon do resultado
        let sentiment = result.sentiment;
        let image_path = result.image_path;

        //  atualize os elementos DOM
        $("#sentiment").html(sentiment);
        $("#emoji").attr("src", image_path);
        $("#sentiment").css("display", "block");
        $("#emoji").css("display", "block");

        //  exiba-os
      },

      //  se houver algum erro, execute esta função
      error: function (result) {
        console.log(result);
      },
    });

    //  limpando a caixa de texto após cada pressionamento de botão
    $("#text").val("");
  });
});
