document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('container');

  setTimeout(() => {
    container.classList.add('show')
  }, 1000);

  const message = document.getElementById('message');
  const min = document.getElementById('min');
  const textCount = document.getElementById('text-count');

  const maxLength = 250;

  function updateCharacterCount(){
    const currentLength = message.value.length;
    min.textContent = currentLength;

    if(currentLength === maxLength){
      message.classList.add('full');
      textCount.classList.add('full');
    }else{
      message.classList.remove('full');
      textCount.classList.remove('full');
    }
  }

  updateCharacterCount();
  message.addEventListener('input', updateCharacterCount);
})



