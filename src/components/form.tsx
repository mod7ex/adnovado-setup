import React from "react";
import { Form as RawForm } from "react-router-dom";
import styles from "~/assets/scss/components/form.module.scss";

type FormProps = React.ComponentPropsWithoutRef<typeof RawForm>;

type Props = FormProps & { disabled?: true };

const Form: React.FC<Props> = ({ disabled, children, className, ...rest }) => {
    const _class = (className ?? "") + ` ${styles.root}`;

    return (
        <RawForm className={_class} {...rest}>
            <fieldset disabled={disabled}>{children}</fieldset>
        </RawForm>
    );
};

export default Form;

type RawProps = React.ComponentPropsWithoutRef<"div">;

export const FormSection: React.FC<RawProps> = ({ children, className, ...props }) => {
    const _class = `${className ?? ""} ${styles.formSection}`;

    return (
        <div className={_class} {...props}>
            {children}
        </div>
    );
};
