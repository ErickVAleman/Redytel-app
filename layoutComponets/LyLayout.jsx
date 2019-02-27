import { Layout } from "antd";

/** Componentes mios */
import LyHeader from "./LyHeader";
import LySidder from "./LySidder";
import LyContent from "./LyContent";
import LyFooter from "./LyFooter";

export default ({ children, footer, validate, User }) => (
    <Layout>
        <LyHeader User= {User} validate={validate} menuItems={[{ title: "Home", href: "/" }, { title: "Tareas", href: "/task" }, { title: "Tareas Terminadas", href: "/taskilled" }, { title: "Usuarios", href: "/users" }, { title: "LogOut", href: "/logout" }]} />
        <Layout>
            <Layout>
                <LyContent>
                    { children }
                </LyContent>
            </Layout>
        </Layout>
            <LyFooter>
                { footer }
            </LyFooter>
    </Layout>
);