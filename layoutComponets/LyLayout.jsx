import { Layout } from "antd";

/** Componentes mios */
import LyHeader from "./LyHeader";
import LySidder from "./LySidder";
import LyContent from "./LyContent";
import LyFooter from "./LyFooter";

export default ({ children, footer, validate }) => (
    <Layout>
        <LyHeader validate={validate} menuItems={[{ title: "Home", href: "/" }, { title: "Tareas", href: "/task" }, { title: "Tareas Terminadas", href: "/taskilled" }, { title: "Usuarios", href: "/users" }]} />
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