import { Layout } from 'antd';
const { Content } = Layout;

export default ({ children }) => (
    <Content style={{ padding: 24, margin: 0, minHeight: '83vh' }}>
        { children }
    </Content>
);