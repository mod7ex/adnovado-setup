import { default as Form, FormSection } from "@/form";
import TextInput from "@/text-input";
import CheckBox from "@/check-box";
import useTranslation from "~/hooks/useTranslation";
import Link from "@/link";
import React from "react";
import styles from "~/assets/scss/modules/auth.module.scss";

type Props = { onSwitchProcess: (e: React.MouseEvent) => void };

const Register: React.FC<Props> = ({ onSwitchProcess }) => {
    const { i18n: t } = useTranslation();

    const footer = (
        <Link to="#" onClick={onSwitchProcess}>
            {t("Already have an account ?")}
        </Link>
    );

    return (
        <Form title={t("Sign up")} footer={footer} cta={t("Sign up")}>
            <FormSection>
                <TextInput error="this is how error will show up here" id="first_name" name="first_name" label={t("first_name")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" id="last_name" name="last_name" label={t("last name")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" id="username" name="username" label={t("username")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" type="email" id="email" name="email" label={t("email")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" type="password" id="password" name="password" label={t("password")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" type="password" id="password_confirmation" name="password_confirmation" label={t("password confirmation")} />
            </FormSection>

            <FormSection className={styles.termsConditions}>
                <CheckBox label={t("I agree")} />
                <Link to="#">{t("Terms")}</Link>
                <span>&</span>
                <Link to="#">{t("Conditions")}</Link>
            </FormSection>
        </Form>
    );
};

export default Register;
