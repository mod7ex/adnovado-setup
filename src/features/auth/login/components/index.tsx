import { default as Form, FormSection } from "@/form";

const Login = () => {
    return (
        <>
            <Form>
                <FormSection>
                    <label htmlFor="username">
                        <span>{"username"}</span>
                        <input id="username" type="text" name="username" />
                    </label>
                </FormSection>

                <FormSection>
                    <label htmlFor="password">
                        <span>{"password"}</span>
                        <input id="password" type="password" name="password" />
                    </label>
                </FormSection>

                <FormSection>
                    <input type="submit" value="Login" />
                </FormSection>
            </Form>
        </>
    );
};

export default Login;
