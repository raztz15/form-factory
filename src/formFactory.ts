import { IFormField } from "./interfaces";

// Function to create form dynamically with different inputs from the inputs data
export function createFormField(field: IFormField): HTMLElement {

    const { type, required, label, defaultValue, validation, id } = field
    let inputElement: HTMLElement | null = null

    // Dynamically creating input field by its type
    switch (type) {
        case 'text':
        case 'number':
        case 'email':
            inputElement = document.createElement('input')
            const inputElementTyped = inputElement as HTMLInputElement
            inputElementTyped.type = type
            inputElementTyped.required = required || false
            inputElementTyped.placeholder = label

            if (defaultValue !== undefined) {
                inputElementTyped.defaultValue = defaultValue.toString()
            }

            if (validation?.pattern) {
                inputElementTyped.pattern = validation.pattern
            }

            if (validation?.min) {
                inputElementTyped.min = validation.min.toString()
            }

            if (field.validation?.max) {
                inputElementTyped.max = field.validation.max.toString()
            }
            break;

        case 'select':
            inputElement = document.createElement('select')
            const selectElementTyped = inputElement as HTMLSelectElement
            selectElementTyped.required = required || false

            validation?.options?.forEach(option => {
                const optionElement = document.createElement('option')
                optionElement.value = option
                optionElement.textContent = option
                selectElementTyped.appendChild(optionElement)
            })
            break;

        case 'checkbox':
            inputElement = document.createElement('input');
            (inputElement as HTMLInputElement).type = type;
            (inputElement as HTMLInputElement).required = required || false;
            break;

        default:
            const errorMessage = document.createElement('div')
            errorMessage.className = 'input-type-error-message'
            errorMessage.textContent = `Not expected input type: ${field.type}`
            document.getElementById('form-container')?.appendChild(errorMessage)
            break;
    }

    if (!inputElement) {
        throw new Error(`Unable to create input element for field type: ${type}`);
    }

    inputElement.id = id

    const labelElement = document.createElement('label')
    labelElement.htmlFor = id
    labelElement.textContent = label + ":"

    const fieldContainer = document.createElement('div')
    fieldContainer.appendChild(labelElement)
    fieldContainer.appendChild(inputElement)

    return fieldContainer
}