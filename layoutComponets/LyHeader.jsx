import Link from "next/link"
import { Layout, Menu, Col } from "antd";
const { Header } = Layout;
const { Item } = Menu;
export default ({ menuItems }) => (
    <Header className="header" style={{ position: "flex", zIndex: 1, width: "100%", backgroundColor: "#FFF", padding: "0px 30px" }} >
        <Col>
            <Col span={8} >Tareas</Col>
            <Col span={8} style={{ textAlign: "center", color: "#5179b5", fontSize: "24pt", fontFamily: "'Russo One', sans-serif" }} >Redytel</Col>
            <Col span={8} style={{ textAlign: "center" }} >
                <Menu mode="horizontal" style={{ lineHeight: "63px" }}>
                    { menuItems.map( (menuItem, key) => (
                        <Item key={key + 1}><Link href={menuItem.href} >{ menuItem.title }</Link></Item>
                    )) }    
                </Menu>
            </Col>
        </Col>
    </Header>
);