document.getElementById('imcForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
  
    if (altura > 0 && peso > 0) {
      // Cálculo do IMC
      const imc = (peso / (altura * altura)).toFixed(2);
  
      // Cálculo da quantidade de água recomendada
      const aguaRecomendada = (peso * 0.035).toFixed(2); // Convertendo para litros
  
      // Definindo a classificação do IMC e a classe CSS correspondente
      let classificacao = '';
      let sugestao = '';
      let imcClass = '';
  
      if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        sugestao = 'Você está abaixo do peso ideal. Considere aumentar o consumo de calorias saudáveis, incluindo proteínas e carboidratos complexos em sua dieta.';
        imcClass = 'imc-abaixo-peso';
      } else if (imc >= 18.5 && imc <= 24.9) {
        classificacao = 'Peso normal'; // Sem sugestão aqui
        imcClass = 'imc-normal';
      } else if (imc >= 25 && imc <= 29.9) {
        classificacao = 'Sobrepeso';
        sugestao = 'Você está com sobrepeso. Tente incorporar mais exercícios físicos em sua rotina e reduzir alimentos com alto teor de gordura e açúcar.';
        imcClass = 'imc-sobrepeso';
      } else {
        classificacao = 'Obesidade';
        sugestao = 'Você está com obesidade. Procure orientação médica e considere mudanças significativas em sua dieta e estilo de vida.';
        imcClass = 'imc-obesidade';
      }
  
      // Exibição dos resultados com um visual mais atraente
      document.getElementById('resultado').innerHTML = `
        <div class="imc-card">
          <h2>Seu IMC é:</h2>
          <div class="imc-number ${imcClass}">${imc}</div>
          <p class="imc-range">${classificacao}</p>
          <p>Você deve beber cerca de <strong>${aguaRecomendada} litros</strong> de água por dia.</p>
        </div>
        ${sugestao ? `
        <div class="suggestion">
          <h3>Sugestão:</h3>
          <p>${sugestao}</p>
        </div>` : ''}
      `;
    } else {
      document.getElementById('resultado').innerHTML = '<p>Por favor, insira valores válidos.</p>';
    }
  });
  