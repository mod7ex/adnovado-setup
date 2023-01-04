import styles from "~/assets/scss/modules/auth.module.scss";
import { default as Form, FormSection } from "@/form";
import TextInput from "@/text-input";
import CheckBox from "@/check-box";
import Link from "@/link";
import { Translate, DICTIONARY_NAMESPACES } from "~/i18n";

type Props = { onSwitchProcess: (e: React.MouseEvent) => void };

/* const Login: React.FC<Props> = ({ onSwitchProcess }) => {
    const Footer = ({ $t }: { $t: any }) => (
        <Link to="#" onClick={onSwitchProcess}>
            {$t?.public?.auth?.login?.switch_process}
        </Link>
    );

    return (
        <Translate ns={DICTIONARY_NAMESPACES.AUTH}>
            {({ $t }) => (
                <Form title={$t?.public.auth.login.head} footer={<Footer $t={$t} />} cta={$t?.public.auth.login?.cta}>
                    <FormSection>
                        <TextInput error="this is how error will show up here" id="username" name="username" label={$t?.public?.auth?.login?.credentials?.username} value="modex98" />
                    </FormSection>

                    <FormSection>
                        <TextInput error="this is how error will show up here" id="password" name="password" label={$t?.public?.auth?.login?.credentials?.email} value="password" />
                    </FormSection>

                    <FormSection className={styles.checkbox}>
                        <CheckBox label={$t?.public?.auth?.login?.remember} name="remember" />
                    </FormSection>
                </Form>
            )}
        </Translate>
    );
}; */

const Login: React.FC<Props> = ({ onSwitchProcess }) => {
    const Footer = ({ i18n }: { i18n: (dictionary_path: string, fallback?: string) => string }) => (
        <Link to="#" onClick={onSwitchProcess}>
            {i18n("login.switch_process")}
        </Link>
    );

    return (
        <Translate ns={DICTIONARY_NAMESPACES.AUTH}>
            {({ i18n }) => (
                <Form title={i18n("login.head")} footer={<Footer i18n={i18n} />} cta={i18n("login.cta")}>
                    <FormSection>
                        <TextInput error="this is how error will show up here" id="username" name="username" label={i18n("login.credentials.username")} value="modex98" />
                    </FormSection>

                    <FormSection>
                        <TextInput error="this is how error will show up here" id="password" name="password" label={i18n("login.credentials.email")} value="password" />
                    </FormSection>

                    <FormSection className={styles.checkbox}>
                        <CheckBox label={i18n("login.remember")} name="remember" />
                    </FormSection>
                </Form>
            )}
        </Translate>
    );
};

export default Login;
