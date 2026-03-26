document.addEventListener('DOMContentLoaded', function(){
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item =>{
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', ()=>{
      const isActive = item.classList.contains('active');
      console.log('working')

      accordionItems.forEach(accordionItem =>{
        accordionItem.classList.remove('active');
      })

      if(!isActive){
        item.classList.add('active');
      }
    });
  });
});