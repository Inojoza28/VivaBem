document.getElementById('imcForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
  
    if (altura > 0 && peso > 0) {
      // Cálculo do IMC
      const imc = (peso / (altura * altura)).toFixed(2);
  
      // Cálculo da quantidade de água recomendada
      const aguaRecomendada = (peso * 0.035).toFixed(2); // Convertendo para litros


      // Calculando o número de copos (cada copo de 250ml = 0.25 litros)
      const numeroCopos = Math.ceil(aguaRecomendada / 0.25); // Arredondando para cima


      // RELATÓRIO DE SAUDE
      const frasesMotivacionais = [
        "A jornada para o sucesso é feita de pequenos passos. Continue firme e veja o progresso acontecer!",
        "O seu corpo é o reflexo da sua força interior. Nunca subestime o que você pode alcançar!",
        "A cada esforço, você está mais perto dos seus objetivos. Transforme obstáculos em oportunidades!",
        "Você já superou muitos desafios até aqui, e cada vitória conta. Continue, você está no caminho certo!",
        "Grandes mudanças começam com pequenas decisões. Persistência é a chave para o seu sucesso!",
        "Você é capaz de alcançar qualquer objetivo. Acredite em si mesmo e na sua capacidade de evoluir!",
        "Toda transformação começa com um simples passo. Hoje é o dia perfeito para começar o seu!",
        "Desafios são oportunidades disfarçadas. Encare-os com coragem e determinação!",
        "A força não está na velocidade, mas na consistência. Continue avançando, um dia de cada vez!",
        "A verdadeira conquista está em não desistir. Mantenha-se firme e a recompensa virá!"
      ];      
      
      // Seleciona uma frase aleatória
      const fraseMotivacional = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
      
      // Exibir botão de download
       document.getElementById('downloadBtn').style.display = 'block';// Função para gerar e baixar o relatório

       document.getElementById('downloadBtn').addEventListener('click', function() {
         const textoRelatorio = `
Relatório de Saúde - VivaBem
       
Altura: ${altura} metros
Peso: ${peso} kg
IMC: ${imc} (${classificacao})
Consumo de água recomendado: ${aguaRecomendada} litros por dia
${sugestao ? 'Sugestão: ' + sugestao : ''}
           
Frase de motivação: ${fraseMotivacional}
         `;
       
         const blob = new Blob([textoRelatorio], { type: 'text/plain' });
         const link = document.createElement('a');
         link.href = URL.createObjectURL(blob);
         link.download = 'relatorio-saude-VivaBem.txt';
         link.click();
       });
    // FIM DO RELATÓRIO DE SAUDE
  
      // Definindo a classificação do IMC e a classe CSS correspondente
      let classificacao = '';
      let sugestao = '';
      let imcClass = '';
  
      if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        sugestao = 'Você está abaixo do peso ideal. Considere aumentar o consumo de calorias saudáveis, incluindo proteínas e carboidratos complexos em sua dieta.';
        imcClass = 'imc-abaixo-peso';
        icon = '<i class="fas fa-arrow-down" style="color: #17a2b8;"></i>'; // Ícone de seta para baixo
      } else if (imc >= 18.5 && imc <= 24.99) {
        classificacao = 'Peso normal'; // Sem sugestão aqui
        imcClass = 'imc-normal';
        icon = '<i class="fas fa-check-circle" style="color: #28a745;"></i>'; // Ícone de "check"
      } else if (imc >= 25 && imc <= 29.99) {
        classificacao = 'Sobrepeso';
        sugestao = 'Você está com sobrepeso. Tente incorporar mais exercícios físicos em sua rotina e reduzir alimentos com alto teor de gordura e açúcar.';
        imcClass = 'imc-sobrepeso';
        icon = '<i class="fas fa-exclamation-circle" style="color: #ffc107;"></i>'; // Ícone de alerta
      } else {
        classificacao = 'Obesidade';
        sugestao = 'Você está com obesidade. Procure orientação médica e considere mudanças significativas em sua dieta e estilo de vida.';
        imcClass = 'imc-obesidade';
        icon = '<i class="fas fa-times-circle" style="color: #dc3545;"></i>'; // Ícone de perigo
      }
  

      // Gerando os copos visualmente
      let coposHtml = '';
      for (let i = 0; i < numeroCopos; i++) {
        coposHtml += '<div class="copo"></div>'; // Adiciona copos
      }

      // Exibição dos resultados com a quantidade de copos
      document.getElementById('resultado').innerHTML = `
        <div class="imc-card">
          <h2>Seu IMC é:</h2>
          <div class="imc-number ${imcClass}">${imc}</div>
          <p class="imc-range">${icon} ${classificacao}</p>
          <div class="water-recommendation">
            <h3>Consumo de Água:</h3>
            <p>Você deve beber cerca de <strong>${aguaRecomendada} litros</strong> de água por dia.</p>
            <div class="copos-container">
              ${coposHtml}
            </div>
            <br>
            <p>Isso equivale a aproximadamente <strong>${numeroCopos} copos</strong> de 250ml.</p>
          </div>
        </div>
        ${sugestao ? `
        <div class="suggestion">
          <h3><h3><i class="fas fa-info-circle"></i> Sugestão:</h3>
          <p>${sugestao}</p>
        </div>` : ''}
      `;
    } else {
      document.getElementById('resultado').innerHTML = '<p>Por favor, insira valores válidos.</p>';
    }
});