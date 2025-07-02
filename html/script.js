document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  function toggleBlock(id) {
    const el = document.getElementById(id);
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
  }

  window.toggleBlock = toggleBlock;

  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('/send-telegram', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        phone: formData.get('phone'),
        message: formData.get('message')
      }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Спасибо! Ваша заявка отправлена.");
        form.reset();
      } else {
        alert("Ошибка при отправке: " + (data.error || 'Попробуйте позже.'));
      }
    })
    .catch(() => alert("Ошибка сети. Попробуйте позже."));
  });
});
