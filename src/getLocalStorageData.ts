import formJson from './formData.json'
import { IFormField } from './interfaces';

const fields: IFormField[] = formJson.fields as IFormField[];

// Function to get the data from the local storage into the input fields
export function populateFormFieldsWithSavedData() {
    fields.forEach(({ id, type, fields: nestedFields }) => {
        const savedValue = localStorage.getItem(id)


        if (savedValue && type === 'group' && nestedFields) {
            const groupData = JSON.parse(savedValue)
            nestedFields.forEach(({ id: nestedId }) => {
                const nestedInputElement = document.getElementById(nestedId) as HTMLInputElement | HTMLSelectElement;
                if (nestedInputElement && groupData[nestedId]) {
                    nestedInputElement.value = groupData[nestedId];  // Set value of nested field
                }
            })
        } else if (savedValue) {
            const inputElement = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
            if (inputElement) {
                if (type === 'checkbox') {
                    (inputElement as HTMLInputElement).checked = JSON.parse(savedValue)
                }
                inputElement.value = savedValue;  // Set the saved value
            }
        }
    })
}