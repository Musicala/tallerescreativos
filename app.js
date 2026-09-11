
const COP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

const discipline = document.getElementById('discipline');
const plan = document.getElementById('plan');
const people = document.getElementById('people');
const audience = document.getElementById('audience');
const locationField = document.getElementById('location');
const goal = document.getElementById('goal');
const summaryPrice = document.getElementById('summaryPrice');
const summaryText = document.getElementById('summaryText');
const toast = document.getElementById('toast');

function getSelectedPrice() {
  const opt = plan.options[plan.selectedIndex];
  return Number(opt.dataset.price || 0);
}

function updateSummary() {
  const price = getSelectedPrice();
  summaryPrice.textContent = COP.format(price);
  summaryText.textContent = `${discipline.value} · ${plan.value} · ${people.value || 0} participantes`;
}

[discipline, plan, people, audience, locationField, goal].forEach(el => {
  el.addEventListener('input', updateSummary);
});

document.querySelectorAll('.choose-exp').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.experience-card');
    discipline.value = card.dataset.category;
    updateSummary();
    document.getElementById('cotizador').scrollIntoView({behavior:'smooth'});
  });
});

document.querySelectorAll('.select-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    plan.value = btn.dataset.plan;
    updateSummary();
    document.getElementById('cotizador').scrollIntoView({behavior:'smooth'});
  });
});

document.getElementById('copyProposal').addEventListener('click', async () => {
  const price = getSelectedPrice();
  const text = [
    'Hola, Musicala 👋',
    'Quisiera solicitar una propuesta para un Taller Creativo.',
    '',
    `Experiencia: ${discipline.value}`,
    `Plan: ${plan.value}`,
    `Valor de referencia: ${COP.format(price)}`,
    `Participantes: ${people.value}`,
    `Tipo de grupo: ${audience.value}`,
    `Lugar: ${locationField.value}`,
    goal.value.trim() ? `Objetivo: ${goal.value.trim()}` : '',
    '',
    'Quedo atento(a) para revisar disponibilidad, logística y propuesta final.'
  ].filter(Boolean).join('\n');

  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    const temp = document.createElement('textarea');
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    temp.remove();
  }

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

updateSummary();
