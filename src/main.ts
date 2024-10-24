import "./style.css"
import formJson from './formData.json';
import { IFormField } from "./interfaces";
import { createFormField } from './formFactory';
import { handleSubmit } from "./formValidations";
import { populateFormFieldsWithSavedData } from "./getLocalStorageData";

const fields: IFormField[] = formJson.fields as IFormField[];

let loading = true;
let error: string | null = null

// Wait until the DOM is fully loaded before rendering the form
document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app')
    if (appContainer) {
        // Display a loading message if the form is still loading
        if (loading) {
            const loadingElement = document.createElement('h1')
            loadingElement.textContent = 'Loading...'
            loadingElement.id = 'loading';
            appContainer.appendChild(loadingElement);
        } else {
            // Render the form once loading is complete
            renderForm(appContainer)
        }

        // Simulate a delay (e.g., fetching data), and randomly introduce an error for demonstration
        setTimeout(() => {
            if (Math.random() < .2) {
                error = 'Failed to load the form. Please try again later.';
                loading = false;
                renderForm(appContainer); // Re-render form with error state
                return;
            } else {
                loading = false
                renderForm(appContainer) // Re-render form once data is loaded
            }
        }, 2000);
    }
})

// Function to render the form
function renderForm(appContainer: HTMLElement): void {
    // Remove the loading message once loading is complete
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.remove();
    }

    // If there's an error, display it and stop further rendering
    if (error) {
        const errorElement = document.createElement('h1');
        errorElement.className = 'error-message';
        errorElement.textContent = error;
        appContainer.appendChild(errorElement);
        return;
    }

    // Create and render the form container
    const form = document.createElement('form')
    form.className = 'form-container';
    form.id = 'form-container';

    // Loop through each field in the form data and create form fields
    fields.forEach(field => {
        const fieldElement = createFormField(field)
        form.appendChild(fieldElement)

        const { id, type, fields: nestedFields } = field

        // Add event listener to save data to localStorage
        fieldElement.addEventListener('input', (e) => {
            const inputElement = e.target as HTMLInputElement | HTMLSelectElement;
            if (type === 'group' && nestedFields) {
                const groupData: Record<string, any> = {}
                nestedFields.forEach(({ id: nestedId }) => {
                    const nestedInputElement = document.getElementById(nestedId) as HTMLInputElement | HTMLSelectElement;
                    if (nestedInputElement) {
                        groupData[nestedId] = nestedInputElement.value
                    }
                })
                localStorage.setItem(id, JSON.stringify(groupData))
            } else {
                if (type === 'checkbox') {
                    localStorage.setItem(id, (inputElement as HTMLInputElement).checked.toString())
                } else {
                    localStorage.setItem(id, inputElement.value)
                }
            }
        })
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

    // Clear localStorage on reset
    resetButton.addEventListener('click', () => {
        fields.forEach(({ id, type, fields: nestedFields }) => {
            localStorage.removeItem(id)
            if (type === 'group' && nestedFields) {
                nestedFields.forEach(({ id }) => {
                    localStorage.removeItem(id)
                })
            }
        })
    })

    buttonsContainer.appendChild(submitButton);
    buttonsContainer.appendChild(resetButton);
    form.appendChild(buttonsContainer);

    form.addEventListener('submit', (event) => handleSubmit(event, fields));
    appContainer.appendChild(form);

    // Now that the fields are rendered, populate them with values from localStorage
    populateFormFieldsWithSavedData()
}
