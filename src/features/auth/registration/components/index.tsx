import { default as Form, FormSection } from "@/form";
import TextInput from "@/text-input";
import CheckBox from "@/check-box";
import Link from "@/link";
import { useContext } from "react";
import styles from "~/assets/scss/modules/auth.module.scss";
import { Language } from "~/contexts";

type Props = { onSwitchProcess: (e: React.MouseEvent) => void };

const Register: React.FC<Props> = ({ onSwitchProcess }) => {
    const { i18n } = useContext(Language);

    const footer = (
        <Link to="#" onClick={onSwitchProcess}>
            {i18n("Already have an account ?")}
        </Link>
    );

    return (
        <Form title={i18n("Sign up")} footer={footer} cta={i18n("Sign up")}>
            <FormSection>
                <TextInput error="this is how error will show up here" id="first_name" name="first_name" label={i18n("first_name")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" id="last_name" name="last_name" label={i18n("last name")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" id="username" name="username" label={i18n("username")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" type="email" id="email" name="email" label={i18n("email")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" autoComplete="new-password" type="password" id="password" name="password" label={i18n("password")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" autoComplete="new-password" type="password" id="password_confirmation" name="password_confirmation" label={i18n("password confirmation")} />
            </FormSection>

            <FormSection className={styles.checkbox}>
                <CheckBox label={i18n("I agree")} />
                <Link to="#">{i18n("Terms")}</Link>
                <span>&</span>
                <Link to="#">{i18n("Conditions")}</Link>
            </FormSection>
        </Form>
    );
};

export default Register;
