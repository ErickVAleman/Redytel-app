import { Col, Row } from "antd"
import LyLayout from "../layoutComponets/LyLayout";
export default () => (
    <LyLayout footer="Milka's App 2019@2020" >
        <Row>
            <Col span={8} />
            <Col style={{ textAlign: "center" }} span={8} > 
                <p> Solo un <b>administrador</b> puede dar de alta nuevos usuarios</p>
                <p> favor de contactarse con un <b>administrador</b></p>
            </Col>
            <Col span={8} />
        </Row>
    </LyLayout>
);
