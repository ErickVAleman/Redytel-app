import { Layout } from "antd"
const { Footer } = Layout;
export default ({ children }) => (
    <Footer style={{ textAlign: "center", backgroundColor: "#001529", color: "#FFF" }} >
        { children }
    </Footer>
);