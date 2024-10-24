import { IFormField } from "./interfaces";
import { clearValidationErrors, handleValidationError } from "./Utils";

/**
 * Handles form submission by validating each field, showing validation errors,
 * and collecting form data if validation passes.
 * 
 * @param e - The event triggered by form submission
 * @param formFields - An array of form field objects to be validated and submitted
 */
export function handleSubmit(e: Event, formFields: IFormField[]): void {
    e.preventDefault()
    let isValid = true // Tracks if the form is valid overall

    // Loop through each form field for validation
    formFields.forEach(({ id, required, label, validation }) => {
        const inputElement = document.getElementById(id) as HTMLInputElement | HTMLSelectElement

        if (inputElement) {
            // Check if the field is required and empty
            if (required && !inputElement.value) {
                handleValidationError(inputElement, `${label} is required.`)
                isValid = false
                // Check if the value doesn't match the expected pattern
            } else if (validation?.pattern && !new RegExp(validation.pattern).test(inputElement.value)) {
                handleValidationError(inputElement, `Please match the requested format for ${label}.`)
                // Check if the value is less than the minimum allowed
            } else if (validation?.min && parseFloat(inputElement.value) < validation.min) {
                handleValidationError(inputElement, `${label} should be at least ${validation.min}.`);
                isValid = false;
                // Check if the value exceeds the maximum allowed
            } else if (validation?.max && parseFloat(inputElement.value) > validation.max) {
                handleValidationError(inputElement, `${label} should be at most ${validation.max}.`);
                isValid = false;
                // Clear validation errors if the field passes all checks
            } else {
                clearValidationErrors(inputElement)
            }
        }
    })
    // If all fields are valid, collect the form data
    if (isValid) {
        const formData = getFormData(formFields);
        console.log('Form submitted:', formData);
    }
}

/**
 * Collects the form data by iterating through each field and fetching its value.
 * Handles both normal fields and group fields (nested forms).
 * 
 * @param fields - An array of form field objects to collect data from
 * @returns An object containing the collected form data
 */
function getFormData(formFields: IFormField[]): Record<string, any> {
    const formData: Record<string, any> = {} // Initialize an empty object to hold form data

    // Loop through each form field to gather its value
    formFields.forEach(({ id, type }) => {
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