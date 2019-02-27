import React, { Component } from "react";
import Router from "next/router";
import gql from "graphql-tag";
import LyLayout from "../layoutComponets/LyLayout";
import { HttpLink, InMemoryCache, ApolloClient } from "apollo-boost"
import { Row, Col, Button, Table, Modal, Form, Input, Icon, Checkbox } from "antd"
import uuid from "uuid"


class Tareas extends Component {
    constructor(loginUser, sessionUser, props){
        super(loginUser, sessionUser, props)
        this.loginUser = loginUser;
        this.sessionUser = sessionUser;
        this.state = {
            user: {},
            task: {},
            taskNewLoad: false,
            visibleNewTaskModal: false,
            newUuid: uuid.v4(),
        }
    }
    async componentDidMount() {
        try{
            this.loginUser = await localStorage.getItem('loginUser');
            this.sessionUser = await sessionStorage.getItem('loginUser');
            if (!this.loginUser && !this.sessionUser){
                console.log("Te vas pero derechito alv", this.loginUser, this.sessionUser);
                Router.push('/login');
            }else { 
                console.log("Te encuentras Logeado", this.loginUser, this.sessionUser);
                this.setState({ user: JSON.parse(this.loginUser) });

                const data = this.getTareas();
                this.setState({ task: data })
            }
        }catch(err){
            throw new Error(err);
        }
    }

    async getTareas() {
        const client = new ApolloClient({
            link: new HttpLink({uri: "http://localhost:5000/graphql"}),
            cache: new InMemoryCache(),
          });
        const { data, loading } = await client.query({
            query: gql`
            query AllTareas {
                getTareas{
                    asignado_a
                    descripcion
                    fecha_fin
                    fecha_inicio
                    id
                    nombre_tarea
                    status
                    uuid
                }
            }
            `,
            });
        console.log(data.getTareas)
        return data.getTareas;
      }
      showModal = () => {
        this.setState({
            visibleNewTaskModal: true,
            newUuid: uuid.v4()
        });
        this.props.form.setFieldsValue({ uuid: this.state.newUuid });
      }
    
      handleOk = (e) => {
        e.preventDefault();
        this.setState({ taskNewLoad: true });
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              const client = new ApolloClient({
                link: new HttpLink({uri: "http://localhost:5000/graphql"}),
                cache: new InMemoryCache(),
              });
            const { data, loading } = await client.query({
                query: gql`
                mutation setTarea($descripcion: String, $nombre_tarea: String, $uuid: ID) {
                    setTarea(input: { 
                        descripcion: $descripcion,
                        nombre_tarea: $nombre_tarea,
                        status: "En Espera",
                        uuid: $uuid,
                     }){
                        asignado_a
                        descripcion
                        fecha_fin
                        fecha_inicio
                        id
                        nombre_tarea
                        status
                        uuid
                    }
                }
                `,
                variables: {
                    descripcion: values.description,
                    nombre_tarea: values.nombre,
                    uuid: uuid
                }
                });
                console.log(data)
            }
        });

        setTimeout(() => {
          this.setState({ taskNewLoad: false, visibleNewTaskModal: false });
        }, 3000);
      }
    
      handleCancel = () => {
        this.setState({ visibleNewTaskModal: false });
      }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },{
                title: 'UUID',
                dataIndex: 'uuid',
                key: 'uuid'
            },{
                title: 'Nombre',
                dataIndex: 'nombre_tarea',
                key: 'nombre_tarea'
            },{
                title: 'Descripcion',
                dataIndex: 'descripcion',
                key: 'descripcion'
            },{
                title: 'Asignado',
                dataIndex: 'asignado_a',
                key: 'asignado_a'
            },{
                title: 'Fecha de Inicio',
                dataIndex: 'fecha_inicio',
                key: 'fecha_inicio'
            },{
                title: 'Fecha Terminada',
                dataIndex: 'fecha_fin',
                key: 'fecha_fin'
            },{
                title: 'Status',
                dataIndex: 'status',
                key: 'status'
            },
        ];
        const { taskNewLoad, visibleNewTaskModal } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <LyLayout User={this.state.user} validate={this.sessionUser} footer="Milka's App 2019@2020" >
                <Row type="flex" justify="end" >
                    <Button type="primary" shape="round" icon="form" size="default" onClick={this.showModal} >Nueva Tarea</Button>
                </Row>
                <Row>
                    { this.state.task.length > 0 ? <Table dataSource={this.state.task} columns={columns} /> : <p>Sin Tareas :D</p> }
                    <div>
                        <Modal
                        visible={visibleNewTaskModal}
                        title="Nueva tarea"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Return</Button>,
                            <Button key="submit" type="primary" loading={taskNewLoad} onClick={this.handleOk}>
                            Submit
                            </Button>,
                        ]}
                        >
                        <Form onSubmit={this.handleOk}>
                            <Form.Item >
                                {getFieldDecorator('uuid', {
                                rules: [{ required: true }],
                                })(
                                <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" disabled />)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('nombre', {
                                rules: [{ required: true, message: 'Ingresa el nombre de la tarea' }],
                                })(
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="tarea" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Ingresa una breve descripcion' }],
                                })(
                                <Input.TextArea autosize={{ minRows: 4 }} prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Breve descripcion" />
                                )}
                            </Form.Item>
                        </Form>
                        </Modal>
                    </div>
                </Row>
            </LyLayout>
        )
    }
}

const WrappedTareas = Form.create({ name: 'NewTarea' })(Tareas);

export default () => (
    <WrappedTareas />
)