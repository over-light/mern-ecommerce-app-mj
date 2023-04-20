type InputFieldProps = {
    required?: boolean;
    id: string;
    placeholder?: string;
    type: string;
    label: string;
    cssClass?: string
    value: string;
    onHandleChange: any
}

export const InputField: React.FC<InputFieldProps> = (props) => {
    const { label, type, cssClass, required, id, placeholder, onHandleChange } = props;
    return (
        <div>
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <input
                onChange={onHandleChange}
                type={type}
                id={id}
                className={`form-control ${cssClass}`}
                required={required}
                placeholder={placeholder} />
        </div>
    );
}

