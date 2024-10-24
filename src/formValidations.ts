import { IFormField } from "./interfaces";
import { clearValidationErrors, handleValidationError } from "./Utils";

export function handleSubmit(e: Event, formFields: IFormField[]): void {
    e.preventDefault()
    let isValid = true

    formFields.forEach(({ id, required, label, validation }) => {
        const inputElement = document.getElementById(id) as HTMLInputElement | HTMLSelectElement

        if (inputElement) {
            if (required && !inputElement.value) {
                handleValidationError(inputElement, `${label} is required.`)
                isValid = false
            } else if (validation?.pattern && !new RegExp(validation.pattern).test(inputElement.value)) {
                handleValidationError(inputElement, `Please match the requested format for ${label}.`)
            } else if (validation?.min && parseFloat(inputElement.value) < validation.min) {
                handleValidationError(inputElement, `${label} should be at least ${validation.min}.`);
                isValid = false;
            } else if (validation?.max && parseFloat(inputElement.value) > validation.max) {
                handleValidationError(inputElement, `${label} should be at most ${validation.max}.`);
                isValid = false;
            } else {
                clearValidationErrors(inputElement)
            }
        }
    })

    if (isValid) {
        const formData = getFormData(formFields);
        console.log('Form submitted:', formData);
    }
}

function getFormData(formFields: IFormField[]): Record<string, any> {
    const formData: Record<string, any> = {}

    formFields.forEach(({ id, type, fields: nestedFields }) => {
        const inputElement = document.getElementById(id) as HTMLInputElement | HTMLSelectElement

        if (inputElement) {
            if (type === 'checkbox') {
                formData[id] = (inputElement as HTMLInputElement).checked
            } else {
                formData[id] = inputElement.value
            }
        }
    })

    return formData
}