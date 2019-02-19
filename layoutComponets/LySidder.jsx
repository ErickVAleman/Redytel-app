import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { Item } = Menu;

export default ({ itemsMenu }) => (
    <Sider breakpoint ='lg' collapsedWidth="0" >
        <Menu theme="dark" mode="vertical" style={{ lineHeight: 64 }} >
            { itemsMenu.map( (menuOption, key) => <Item key={key}> <Icon type="user" /> { menuOption.name  }</Item> ) }
        </Menu>
    </Sider>
);