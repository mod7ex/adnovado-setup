import React from "react";
import { Form as RawForm } from "react-router-dom";
import styles from "~/assets/scss/components/form.module.scss";
import btnStyles from "~/assets/scss/components/button.module.scss";
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

type Size = { large?: true | 1 } | { small?: true | 1 };

type Props = FormProps & { disabled?: true } & Size;

const Form: React.FC<Props> = ({ disabled, children, className, ...rest }) => {
    const _class = (className ?? "") + ` ${styles.root}`;

    let _btnClass = `${btnStyles.root} ${btnStyles.primary}`;
    if ("small" in rest) _btnClass += ` ${btnStyles.sm}`;
    if ("large" in rest) _btnClass += ` ${btnStyles.lg}`;

    return (
        <RawForm className={_class} {...rest}>
            <fieldset disabled={disabled}>
                {children}

                <FormSection>
                    <Button label={"Login"} small type="submit" primary={1} />
                </FormSection>
            </fieldset>
        </RawForm>
    );
};

export default Form;
