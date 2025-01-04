//animations for moving elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { 
      if(entry.isIntersecting) {
          entry.target.classList.add('show');
      }   else {
          entry.target.classList.remove('show');
      }
      entry.target.classList.toggle('show', entry.isIntersecting);
      
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
