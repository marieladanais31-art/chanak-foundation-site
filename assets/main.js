/**
 * CHANAK TRAINUP EDUCATION INC (501c3) - foundation.chanakacademy.org
 * Client-side script for institutional form handling & non-profit intake
 */

document.addEventListener('DOMContentLoaded', () => {
  // Handle scholarship and intake form submissions
  const forms = document.querySelectorAll('form[data-foundation-form]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const successBox = form.parentElement.querySelector('.form-alert-success');
      
      // Visual feedback
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando solicitud institucional...';
      
      setTimeout(() => {
        // Collect form data
        const formData = new FormData(form);
        const dataObj = Object.fromEntries(formData.entries());
        
        console.info('[CHANAK Foundation] Intake submission received:', dataObj);
        
        // Reset form & show confirmation
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        if (successBox) {
          successBox.style.display = 'block';
          successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          alert('¡Gracias por su solicitud! Su postulación ha sido enviada al Comité Académico y de Becas de CHANAK TRAINUP EDUCATION INC. Nos comunicaremos a la brevedad.');
        }
      }, 700);
    });
  });

  // Diagnostic Quiz interactive handler if present
  const diagForm = document.getElementById('diagnostic-form');
  if (diagForm) {
    diagForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const resultsContainer = document.getElementById('diagnostic-results');
      if (resultsContainer) {
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
