/**
 * Handles displaying a validation error message and applying error styling to the input element.
 * 
 * @param inputElement - The input or select element where the validation error occurred
 * @param message - The error message to display for the validation issue
 */
export function handleValidationError(inputElement: HTMLInputElement | HTMLSelectElement, message: string): void {
    const parentElement = inputElement.parentElement
    let errorMessageElement = parentElement?.querySelector('.error-message') as HTMLElement

    // If the input is valid, remove any existing error message and reset the border color
    if (inputElement.validity.valid) {
        if (errorMessageElement) {
            errorMessageElement.remove()
        }
        inputElement.style.borderColor = ''
    } else {
        // If there isn't an error message element, create one and append it to the parent element
        if (!errorMessageElement) {
            errorMessageElement = document.createElement('div')
            errorMessageElement.className = 'error-message'
            parentElement?.appendChild(errorMessageElement)
        }
    }

    // Update the error message and apply red border styling to indicate an error
    if (errorMessageElement) {
        errorMessageElement.textContent = message
        inputElement.style.borderColor = 'red'
    }
}

/**
 * Clears any existing validation error message and resets the input field's border styling.
 * 
 * @param inputElement - The input or select element to clear validation errors from
 */
export function clearValidationErrors(inputElement: HTMLInputElement | HTMLSelectElement) {
    const perantElement = inputElement.parentElement
    const errorMessageElement = perantElement?.querySelector('.error-message') as HTMLElement

    // Remove the error message if it exists
    if (errorMessageElement) errorMessageElement.remove()
    // Reset the input field's border color to its default
    inputElement.style.borderColor = ''
}