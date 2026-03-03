const revealTargets = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.mini-nav a');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.45 }
);

['dmz', 'trust', 'stakes', 'turing', 'counterpoint', 'whatnow', 'cta'].forEach((id) => {
  const section = document.getElementById(id);
  if (section) {
    sectionObserver.observe(section);
  }
});

const answerBox = document.getElementById('turing-answer');
const pickedLine = document.getElementById('picked-line');
const buttons = document.querySelectorAll('[data-choice]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const picked = button.getAttribute('data-choice');
    pickedLine.textContent = `You picked ${picked}.`;
    answerBox.hidden = false;
    requestAnimationFrame(() => {
      answerBox.classList.add('is-visible');
      answerBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
});
