



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
      nameChange();
    })
  })
  
})



function nameChange(){

  const cookieConsent = document.getElementById('cookieConsent');
  const acceptCookies = document.getElementById('acceptCookies');

  setTimeout(() => {
    cookieConsent.classList.add('show');
    cookieConsent.classList.remove('hide');
  }, 1000);

  acceptCookies.addEventListener('click', function(){
    cookieConsent.classList.remove('show');
    cookieConsent.classList.add('hide');
  })
}