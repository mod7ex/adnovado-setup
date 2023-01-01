import React from "react";
import { Form as RawForm } from "react-router-dom";
import styles from "~/assets/scss/components/form.module.scss";
import Button from "@/button";

type RawProps = React.ComponentPropsWithoutRef<"div">;

export const TEST_ID = Date.now().toString();

export const FormSection: React.FC<RawProps> = ({ children, className, ...props }) => {
    const _class = [className ?? "", styles.formSection].join(" ");

    return (
        <div className={_class} {...props}>
            {children}
        </div>
    );
};

/** ***************************************** Form *****************************************  **/

type FormProps = React.ComponentPropsWithoutRef<typeof RawForm>;

type Props = FormProps & { disabled?: true; header?: React.ReactNode; footer?: React.ReactNode; cta?: string };

const Form: React.FC<Props> = ({ disabled, children, className, header, footer, cta = "Submit", role = "form", ...rest }) => {
    const _class = (className ?? "") + ` ${styles.root}`;

    let head = null;

    if (header) {
        head = (
            <FormSection data-testid={TEST_ID} className={styles.head}>
                {typeof header === "string" ? <p>{header}</p> : header}
            </FormSection>
        );
    }

    let _footer = null;

    if (footer) {
        _footer = (
            <FormSection data-testid={TEST_ID} className={styles.footer}>
                {footer}
            </FormSection>
        );
    }

    return (
        <RawForm className={_class} {...rest} role={role}>
            {head}

            <fieldset disabled={disabled} role="group" data-testid={TEST_ID}>
                {children}

                <FormSection>
                    <Button label={cta} small type="submit" primary />
                </FormSection>
            </fieldset>

            {_footer}
        </RawForm>
    );
};

export default Form;
