
import gql from "graphql-tag";
import { HttpLink, InMemoryCache, ApolloClient } from "apollo-boost"
import { Form, Icon, Input, Button, Checkbox, Row, Col, Avatar } from "antd";
import Router from "next/router";
import LyLayout from "../layoutComponets/LyLayout";



class NormalLoginForm extends React.Component {
    handleSubmit = async (e) => {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        const { data, loading } = await this.handleLogin({ password: values.password, email: values.userName });
        if(data){
          localStorage.setItem('loginUser', JSON.stringify(data.loginUser));
          sessionStorage.setItem('loginUser', Date.now() + 2);
          Router.push('/index');
        }
      });

    }
   
    handleLogin = async ({ password, email }) => {
      const client = new ApolloClient({
        link: new HttpLink({uri: "http://localhost:5000/graphql"}),
        cache: new InMemoryCache(),
      });

      const { data, loading } = await client.query({
        query: gql`
        query LoginUser($password: String, $email: String) {
          loginUser(input: { password: $password, email: $email }){
            uuid,
            nombre,
            email,
            password,
            uuid,
            nombre,
            apellidos,
            direccion,
            fech_nac,
            habilidades,
            habilidades_desc,
            rol,
            createdAt,
            updateAt

          }
        }
        `,
        variables: {
          password: password,
          email: email
        }
      });
      return({
        data,
        loading
      })
    }

    render() {
      const { getFieldDecorator } = this.props.form;  
      return (
        <Row>
          <Col span={4} ></Col>
          <Col span={16} >
            <Col>
              <Row align="middle" justify="center" span={8} >
                <Avatar size={100} icon="user" />
              </Row>
            </Col>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Ingresa tu correo!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Correo" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Ingresa tu contraseña!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="">Forgot password</a>
                <br />
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                <br />
                Or <a href="/register">register now!</a>
              </Form.Item>
            </Form>
          </Col>
          <Col span={4} ></Col>
        </Row>
      );
    }
  }
  
  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default () => (
    <LyLayout footer="Milka's App 2019@2020" >
        <WrappedNormalLoginForm />
    </LyLayout>
);   