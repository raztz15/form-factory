export interface IFormField {
    id: string;
    type: 'text' | 'number' | 'select' | 'checkbox' | 'email';
    label: string;
    required?: boolean;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        options?: string[];
    };
    defaultValue?: string | number | boolean;
    fields?: IFormField[]
}