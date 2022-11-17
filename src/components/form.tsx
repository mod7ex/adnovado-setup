import React from "react";
import { Form } from "react-router-dom";

export default Form;

type FormSectionProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const FormSection: React.FC<FormSectionProps> = ({ children, className, ...props }) => (
    <div className={`${className} form-section`.trim()} {...props}>
        {children}
    </div>
);
