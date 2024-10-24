# form-factory
[demo](https://raztz15.github.io/form-factory/)

A dynamic, customizable form builder in TypeScript that supports nested fields, validation, loading/error handling, and local storage state persistence. Designed for flexibility and scalability, this project demonstrates clean, maintainable code and advanced form management techniques.

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 20.16.0 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/raztz15/form-factory.git
   cd form-factory

   ```

2. npm install

3. npm run dev

4. Open the project in your browser: Navigate to http://localhost:3000 to see the form dynamically generated.

## Explanation of Technical Choices

1. Vanilla TypeScript

The decision to use TypeScript over plain JavaScript was made to benefit from static typing, which helps prevent common runtime errors and provides better tooling support (autocomplete, type checking, etc.).

The project was developed using Vanilla TypeScript (without frameworks like React or Angular) to keep it simple and focus on building the form handling logic from scratch, making it easier to integrate into any project.

2. Modular Structure

The code is divided into multiple modules such as formFieldFactory.ts, formValidations.ts, and utils.ts for separation of concerns. This modular design makes the project more maintainable and easier to extend with additional features.

Each module handles specific responsibilities, like form rendering, validation, and error handling.

3. Local Storage for Persistence

To ensure form data is preserved even if the user refreshes the page, Local Storage was used. This provides a simple mechanism to store data in the browser, without relying on backend systems or external databases.

Both regular form fields and nested group fields are stored and retrieved from Local Storage, ensuring that complex form configurations are supported.

4. Dynamic Form Rendering

The form is dynamically generated from a JSON configuration. This allows for flexible form layouts and validation rules that can easily be adjusted by changing the JSON, making the solution adaptable for different form needs.

The fields are rendered using the createFormField function, which adapts to the field type (text, number, select, etc.) and creates the appropriate input element.

5. Simple Validation System

A simple validation mechanism was implemented to handle required fields, min/max values, regex patterns, and custom error messages.

Validation logic is defined in the JSON schema, ensuring that the form's validation rules are flexible and easy to configure.

6. Custom CSS

The project uses custom CSS for styling the form and error messages, providing a basic but clean user interface that can be easily customized for other projects.

## Assumptions Made

1. JSON Structure:

It is assumed that the provided JSON configuration will always adhere to a specific structure as defined in the IFormField interface. This structure includes required properties like id, type, and label, and optional validation rules.

2. Field Types:

The project currently supports a limited set of field types (text, number, select, checkbox, and group). It is assumed that these types cover the majority of common use cases for forms.

3. Browser Compatibility:

The application is assumed to be run in modern web browsers that support Local Storage and ES6 features. Older browsers may not be fully compatible.

4. Validation Rules:

It is assumed that any validation rules provided in the JSON (like min, max, or pattern) will be properly formatted. The application does not handle malformed validation rules.

5. Local Storage Limitations:

The project assumes that Local Storage can handle the data size for typical form inputs. It does not account for potential limitations on storage space, which may vary by browser.

6. User Interaction:

The implementation assumes that users will interact with the form in a straightforward manner (filling fields and submitting). Complex interactions (like nested dynamic fields changing on the fly) are not within the scope of this implementation.

7. Single Form Instance:

The application is designed to handle a single form instance at a time. It does not support managing multiple forms simultaneously.

## Examples of Supported JSON Configurations

1. Basic Text Field

{
"fields": [
{
"id": "username",
"type": "text",
"label": "Username",
"required": true
}
]
}

2. Number Field with Validation

{
"fields": [
{
"id": "age",
"type": "number",
"label": "Age",
"required": true,
"validation": {
"min": 18,
"max": 100
}
}
]
}

3. Select Field

{
"fields": [
{
"id": "gender",
"type": "select",
"label": "Gender",
"required": true,
"validation": {
"options": ["Male", "Female", "Other"]
}
}
]
}

4. Checkbox Field

{
"fields": [
{
"id": "terms",
"type": "checkbox",
"label": "I agree to the terms and conditions",
"required": true
}
]
}

5. Group Field with Nested Fields

{
"fields": [
{
"id": "address",
"type": "group",
"label": "Address",
"fields": [
{
"id": "street",
"type": "text",
"label": "Street",
"required": true
},
{
"id": "city",
"type": "text",
"label": "City",
"required": true
},
{
"id": "zip",
"type": "number",
"label": "Zip Code",
"required": true,
"validation": {
"min": 10000,
"max": 99999
}
}
]
}
]
}

6. Example of Unsupported Field Type

{
"fields": [
{
"id": "favoriteColor",
"type": "colorPicker", // Unsupported type
"label": "Favorite Color"
}
]
}

7. Example of Supported JSON Configuration

{
"fields": [
{
"id": "username",
"type": "text",
"label": "Username",
"required": true,
"validation": {
"min": 3,
"max": 15,
"pattern": "^[a-zA-Z0-9]\*$"
      },
      "defaultValue": "User123"
    },
    {
      "id": "age",
      "type": "number",
      "label": "Age",
      "required": true,
      "validation": {
        "min": 18,
        "max": 100
      }
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
}
},
{
"id": "gender",
"type": "select",
"label": "Gender",
"required": true,
"validation": {
"options": ["Male", "Female", "Other"]
},
"defaultValue": "Male"
},
{
"id": "subscribe",
"type": "checkbox",
"label": "Subscribe to newsletter",
"defaultValue": false
},
{
"id": "userGroup",
"type": "group",
"label": "User Group",
"fields": [
{
"id": "groupName",
"type": "text",
"label": "Group Name",
"required": true
},
{
"id": "groupDescription",
"type": "text",
"label": "Group Description",
"required": false
}
]
}
]
}

## Additional Features

1. Loading State:

The application displays a loading message while simulating the fetching of form data. This is implemented to enhance the user experience by informing users that data is being processed.

The loading message appears as "Loading..." until the data is ready to be displayed.

2. Simulation of Data Fetching:

A simulated delay of 2 seconds is introduced to mimic the time it may take to fetch data from an API. During this period, the loading message is shown.

3. Random Error Simulation:

To demonstrate error handling, there is a random chance (50%) of an error occurring during the simulated fetching process. If an error occurs, an error message will be displayed, indicating that the form failed to load.

This showcases how the application manages error states and user notifications.
