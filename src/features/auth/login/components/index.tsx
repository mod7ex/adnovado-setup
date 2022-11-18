import { default as Form, FormSection } from "@/form";
import Button from "@/button";
import TextInput from "@/text-input";
import useTranslation from "~/hooks/useTranslation";

const Login = () => {
    const { i18n: t } = useTranslation();

    return (
        <Form>
            <FormSection>
                <TextInput error="some" id="username" label={t("username")} />
            </FormSection>

            <FormSection>
                <TextInput error="some" id="password" label={t("password")} />
            </FormSection>

            <FormSection>
                {/* <input type="submit" value="Login" /> */}
                <Button label={"click"} small={1} />
            </FormSection>
        </Form>
    );
};

export default Login;
