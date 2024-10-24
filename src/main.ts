import "./style.css"
import formJson from './formData.json';
import { IFormField } from "./interfaces";
import { createFormField } from './formFactory';

const fields: IFormField[] = formJson.fields as IFormField[];


document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app')
    if (appContainer) {
        renderForm(appContainer)
    }
})

function renderForm(appContainer: HTMLElement): void {
    const form = document.createElement('form')
    form.className = 'form-container';
    form.id = 'form-container';

    fields.forEach(field => {
        const fieldElement = createFormField(field)
        form.appendChild(fieldElement)
    })

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

    appContainer.appendChild(form);
}
