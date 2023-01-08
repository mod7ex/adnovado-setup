import styles from "~/assets/scss/modules/auth.module.scss";
import { default as Form, FormSection } from "@/form";
import TextInput from "@/text-input";
import CheckBox from "@/check-box";
import Link from "@/link";
import { DICTIONARY_NAMESPACES, useTranslate } from "~/i18n";

type Props = { onSwitchProcess: (e: React.MouseEvent) => void };

const Login: React.FC<Props> = ({ onSwitchProcess }) => {
    const { $t } = useTranslate(DICTIONARY_NAMESPACES.AUTH);

    const Footer = () => (
        <Link to="#" onClick={onSwitchProcess}>
            {$t((_) => _.login.switch_process)}
        </Link>
    );

    return (
        <Form title={$t((_) => _.login.head)} footer={<Footer />} cta={$t((_) => _.login.cta)}>
            <FormSection>
                <TextInput error="this is how error will show up here" id="username" name="username" label={$t((_) => _.login.credentials.username)} value="modex98" />
            </FormSection>

            <FormSection>
                <TextInput error="this is how error will show up here" id="password" name="password" label={$t((_) => _.login.credentials.email)} value="password" />
            </FormSection>

            <FormSection className={styles.checkbox}>
                <CheckBox label={$t((_) => _.login.remember)} name="remember" />
            </FormSection>
        </Form>
    );
};

export default Login;
