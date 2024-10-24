import "./style.css"
import formJson from './formData.json';
import { IFormField } from "./interfaces";
import { createFormField } from './formFactory';
import { handleSubmit } from "./formValidations";

const fields: IFormField[] = formJson.fields as IFormField[];

let loading = true;
let error: string | null = null

// Wait until the DOM is fully loaded before rendering the form
document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app')

    if (loading) {
        const loadingElement = document.createElement('h1')
        loadingElement.textContent = 'Loading...'
    }
    if (appContainer) {
        renderForm(appContainer)
    }
})

// Function to render the form
function renderForm(appContainer: HTMLElement): void {
    // Create and render the form container
    const form = document.createElement('form')
    form.className = 'form-container';
    form.id = 'form-container';

    // Loop through each field in the form data and create form fields
    fields.forEach(field => {
        const fieldElement = createFormField(field)
        form.appendChild(fieldElement)
    })

    // Add form buttons (submit and reset)
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'form-buttons';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    const resetButton = document.createElement('button');
    resetButton.type = 'reset';
    resetButton.textContent = 'Reset';

    buttonsContainer.appendChild(submitButton);
    buttonsContainer.appendChild(resetButton);
    form.appendChild(buttonsContainer);

    form.addEventListener('submit', (event) => handleSubmit(event, fields));
    appContainer.appendChild(form);
}
