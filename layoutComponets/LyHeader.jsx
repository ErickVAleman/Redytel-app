import Link from "next/link"
import { Layout, Menu, Col } from "antd";
const { Header } = Layout;
const { Item } = Menu;

export default ({ menuItems, validate, User }) => (
    <Header className="header" style={{ position: "flex", zIndex: 1, width: "100%", backgroundColor: "#FFF", padding: "0px 30px" }} >
        <Col>
            <Col span={8} >Welcome <b>{User ? User.nombre : User }</b></Col>
            <Col span={8} style={{ textAlign: "center", color: "#5179b5", fontSize: "24pt", fontFamily: "'Russo One', sans-serif" }} >Redytel</Col>
            <Col span={8} style={{ textAlign: "center" }} >
                <Menu mode="horizontal" style={{ lineHeight: "63px" }}>
                    { 
                        validate ? menuItems.map(
                            ({ href, title }, key) => (
                                <Item key={key + 1}>
                                    <Link href={href} ><a>{ title }</a></Link>
                                </Item>
                                )
                            ) : <div>
                                    <Link href="/login" ><a>Login</a></Link>
                                    / 
                                    <Link href="/register" ><a>Registrar</a></Link>
                                </div>
                    }    
                </Menu>
            </Col>
        </Col>
    </Header>
);