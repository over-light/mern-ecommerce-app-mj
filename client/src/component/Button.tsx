type ButtonProps = {
    children: string;
    type: any;
    cssClass: string;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    const { cssClass = '', type } = props;
    return (
        <button type={type} className={cssClass}>{children}</button>
    );
}