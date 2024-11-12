//============FUNÇÃO PARA NAVEGAR ENTRE AS "PAGINAS"
// Selecionar todos os itens do menu e as seções
const menuItems = document.querySelectorAll('.nav-group-item');
const sections = document.querySelectorAll('.main-content');

// Função para mostrar a seção correspondente e esconder as outras
function showSection(sectionId) {
  sections.forEach(section => {

    section.style.display = 'none';
  });

  const selectedSection = document.getElementById(sectionId);
  selectedSection.style.display = 'block';
}

// Adicionar um evento de clique a cada item do menu
menuItems.forEach(item => {
  item.addEventListener('click', () => {

    const sectionId = item.id.replace('nav-', ''); // Remover o prefixo "nav-" do ID

    showSection(sectionId);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Obtém as referências aos elementos das abas e dos containers
  const tabs = document.querySelectorAll(".tab-item.nav-link");
  const containerAtual = document.getElementById("container-tab");
  const containerHistorico = document.getElementById("container-tab-historico");

  // Define função para alternar a exibição dos containers
  function toggleTabs(tabIndex) {
      // Remove a classe "active" de todas as abas
      tabs.forEach(tab => tab.classList.remove("active"));

      // Adiciona a classe "active" à aba clicada
      tabs[tabIndex].classList.add("active");

      // Alterna a exibição dos containers com base na aba clicada
      if (tabIndex === 0) {
          containerAtual.style.display = "block";
          containerHistorico.style.display = "none";
      } else if (tabIndex === 1) {
          containerAtual.style.display = "none";
          containerHistorico.style.display = "block";
      }
  }

  // Adiciona os ouvintes de eventos de clique para as abas
  tabs.forEach((tab, index) => {
      tab.addEventListener("click", function () {
          toggleTabs(index);
      });
  });

  // Exibe a aba "Atual" por padrão ao carregar a página
  toggleTabs(0);
});

