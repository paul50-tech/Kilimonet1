const intakeForm = document.getElementById('project-intake-form');
const intakeConfirmation = document.getElementById('intake-confirmation');

// Pre-fill parameters if arriving from the Feasibility Estimator
const urlParams = new URLSearchParams(window.location.search);
const pType = urlParams.get('type');
const pScale = urlParams.get('scale');
const pFramework = urlParams.get('framework');

if (pType && document.getElementById('farm-type')) {
  document.getElementById('farm-type').value = pType;
}
if (pScale && document.getElementById('scale')) {
  document.getElementById('scale').value = pScale;
}
if (pFramework && document.getElementById('description')) {
  document.getElementById('description').value = `Selected Blueprint: ${pFramework}\n`;
}

if (intakeForm) {
  intakeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    intakeForm.style.display = 'none';
    if (intakeConfirmation) {
      intakeConfirmation.hidden = false;
      intakeConfirmation.style.display = 'block';
      intakeConfirmation.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
