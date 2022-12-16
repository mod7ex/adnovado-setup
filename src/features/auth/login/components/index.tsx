import styles from "~/assets/scss/modules/auth.module.scss";
import { default as Form, FormSection } from "@/form";
import TextInput from "@/text-input";
import CheckBox from "@/check-box";
import Link from "@/link";
import { useContext } from "react";
import { Language } from "~/contexts";

type Props = { onSwitchProcess: (e: React.MouseEvent) => void };

const Login: React.FC<Props> = ({ onSwitchProcess }) => {
    const { $t } = useContext(Language);

    const footer = (
        <Link to="#" onClick={onSwitchProcess}>
            {$t?.public?.auth?.login?.switch_process}
        </Link>
    );

    return (
        <Form title={$t?.public.auth.login.head} footer={footer} cta={$t?.public.auth.login?.cta}>
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
    );
};

export default Login;
