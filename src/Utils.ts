export function handleValidationError(inputElement: HTMLInputElement | HTMLSelectElement, message: string): void {
    const parentElement = inputElement.parentElement
    let errorMessageElement = parentElement?.querySelector('.error-message') as HTMLElement

    if (inputElement.validity.valid) {
        if (errorMessageElement) {
            errorMessageElement.remove()
        }
        inputElement.style.borderColor = ''
    } else {
        if (!errorMessageElement) {
            errorMessageElement = document.createElement('div')
            errorMessageElement.className = 'error-message'
            parentElement?.appendChild(errorMessageElement)
        }
    }

    if (errorMessageElement) {
        errorMessageElement.textContent = message
        inputElement.style.borderColor = 'red'
    }
}

export function clearValidationErrors(inputElement: HTMLInputElement | HTMLSelectElement) {
    const perantElement = inputElement.parentElement
    const errorMessageElement = perantElement?.querySelector('.error-message') as HTMLElement

    if (errorMessageElement) errorMessageElement.remove()
    inputElement.style.borderColor = ''
}