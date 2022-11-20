import { default as Form, FormSection } from "@/form";
import TextInput from "@/text-input";
import CheckBox from "@/check-box";
import useTranslation from "~/hooks/useTranslation";
import Link from "@/link";
import React from "react";

type Props = { onSwitchProcess: (e: React.MouseEvent) => void };

const Login: React.FC<Props> = ({ onSwitchProcess }) => {
    const { i18n: t } = useTranslation();

    const footer = (
        <Link to="#" onClick={onSwitchProcess}>
            {t("Don't have an account ?")}
        </Link>
    );

    return (
        <Form title={t("Login")} footer={footer} cta={t("Login")}>
            <FormSection>
                <TextInput error="this is how error will show up here" id="username" name="username" label={t("username")} />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" id="password" name="password" label={t("password")} />
            </FormSection>

            <FormSection>
                <CheckBox label={t("Remember me")} name="remember" />
            </FormSection>
        </Form>
    );
};

export default Login;
