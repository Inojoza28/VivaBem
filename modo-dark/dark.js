document.addEventListener('DOMContentLoaded', function() {
  const themeToggleButton = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Função para alternar o tema e ícone
  function alternarTema() {
    document.body.classList.toggle('dark-mode');
    
    // Verificar se o modo é escuro ou claro
    if (document.body.classList.contains('dark-mode')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark'); // Salvar no LocalStorage
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light'); // Salvar no LocalStorage
    }
  }

  // Adicionar o listener no botão
  themeToggleButton.addEventListener('click', alternarTema);

  // Verificar o LocalStorage para carregar o tema salvo
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.add('fa-moon'); // Lua aparece por padrão
  }
});
