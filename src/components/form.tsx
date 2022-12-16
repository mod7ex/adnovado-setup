import React from "react";
import { Form as RawForm } from "react-router-dom";
import styles from "~/assets/scss/components/form.module.scss";
import Button from "@/button";

type RawProps = React.ComponentPropsWithoutRef<"div">;

export const FormSection: React.FC<RawProps> = ({ children, className, ...props }) => {
    const _class = `${className ?? ""} ${styles.formSection}`;

    return (
        <div className={_class} {...props}>
            {children}
        </div>
    );
};

/** ***************************************** Form *****************************************  **/

type FormProps = React.ComponentPropsWithoutRef<typeof RawForm>;

type Props = FormProps & { disabled?: true; title?: React.ReactNode; footer?: React.ReactNode; cta?: string };

const Form: React.FC<Props> = ({ disabled, children, className, title, footer, cta, ...rest }) => {
    const _class = (className ?? "") + ` ${styles.root}`;

    let head = null;

    if (title) {
        head = typeof title === "string" ? <p>{title}</p> : title;
        head = <FormSection className={styles.head}>{head}</FormSection>;
    }

    let _footer = null;

    if (footer) {
        _footer = <FormSection className={styles.footer}>{footer}</FormSection>;
    }

    return (
        <RawForm className={_class} {...rest}>
            {head}

            <fieldset disabled={disabled}>
                {children}

                <FormSection>
                    <Button label={cta} small={1} type="submit" primary={1} />
                </FormSection>
            </fieldset>

            {_footer}
        </RawForm>
    );
};

export default Form;
