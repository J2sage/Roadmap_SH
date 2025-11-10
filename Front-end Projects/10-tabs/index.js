document.addEventListener('DOMContentLoaded', function () {
  
  const tabs = document.querySelectorAll('.tab-link');

  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active') );

      this.classList.add('active');

      const tabContent = document.querySelectorAll('.tab-content');

      tabContent.forEach(content => content.classList.remove('active'));

      const tabId = this.getAttribute('data-tab');

      document.getElementById(tabId).classList.add('active');
    })
  })
})
