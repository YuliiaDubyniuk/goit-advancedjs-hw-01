const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// check for saved data in localStorage and populate formData object and form fields
const savedFormData = JSON.parse(localStorage.getItem('feedback-form-state'));

if (savedFormData) {
  for (const key of Object.keys(savedFormData)) {
    formData[key] = savedFormData[key];
    form.elements[key].value = savedFormData[key];
  }
}

form.addEventListener('input', onFormFieldInput);
form.addEventListener('submit', onFormSubmit);

// save form data to localStorage after each input event
function onFormFieldInput(event) {
  const fieldName = event.target.name;
  const fieldValue = event.target.value.trim();

  formData[fieldName] = fieldValue;

  // save form data to localStorage
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  // prevent sending form with empty fields and alert user
  for (const value of Object.values(formData)) {
    if (!value) {
      alert('Please fill in all fields.');
      return;
    }
  }

  // submit the form and reset all saved data if all fields are filled out
  console.log('Form submitted:', formData);
  form.reset();
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
  localStorage.removeItem('feedback-form-state');
}
