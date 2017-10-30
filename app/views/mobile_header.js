import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom' 
import {Row, Col, Menu, Tabs, message, Modal} from 'antd'
import { 
	Form, 
	Input, 
	Tooltip, 
	Icon, 
	Cascader, 
	Select, 
	Checkbox, 
	Button, 
	AutoComplete 
} from 'antd'

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class MobileHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		};
	}
	setModalVisible(value){
		this.setState({modalVisible: value});
	}
	handleClick(e) {
		if (e.key = "register") {
			this.setState({current: 'register'});
			this.setModalVisible(true);
		} else {
			{
				this.setState({current: e.key});
			}
		}
	}
	handleSubmit(e) {
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData= this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
			+ "&username=" + formData.userName + "&password=" + formData.password
			+ "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password 
			+ "&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({
				userNickName:json.NickUserName,
				userid:jso.UserId
			});
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	}

	login(){
		this.setModalVisible(true);
	}
	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	}

	render() {
		let {getFieldDecorator} = this.props.form;
		const userShow = this.state.hasLogined 
		
		?   <Link to={`/usercenter`}>
				<Icon type="inbox"/>
			</Link>
		: 	<Icon type="setting" onClick={this.login.bind(this)}/>

		return (
      		<div id="mobileheader">
        		<header>
        			<a href="/">
          				<img src="/static/images/logo.png" alt="logo"/>
     				</a>
     				{ userShow }
        		</header>

				<Modal title="用户中心" 
					wrapClassName="vertical-center-modal" 
					visible={this.state.modalVisible} 
					onCancel= {()=>this.setModalVisible(false)} 
					onOk={() => this.setModalVisible(false)} okText = "关闭"
				>
					<Tabs type="card">
						<TabPane tab="登录" key="1">
							<Form className="login-form" 
	                  			onSubmit={this.handleSubmit.bind(this)} 
	                  			style={{ padding: 20 }}
	                  		>
	                    		<FormItem>
	                    			{ getFieldDecorator('userName', {
							            rules: [{ 
							            	required: true,
							            	 message: '请输入您的账号' 
							            }]
							          })(
							            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="登录账号" />
							          )}
	                    		</FormItem>
	                    		<FormItem>
	                    		{ getFieldDecorator('password', {
						            rules: [{ 
						            	required: true, 
						            	message: 'Please input your Password!'
						            }]
						          })(
						            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="登录密码" />
						          )}
	                    		</FormItem>
	                    		<FormItem>
	                    			{getFieldDecorator('remember', {
						            	valuePropName: 'checked',
						            	initialValue: true,
						          	})(
						            	<Checkbox>记住我</Checkbox>
						         	)}
						          	<a className="login-form-forgot" href="javascript:void(0)">忘记密码</a>
						         	<Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
						    	</FormItem>
						    </Form>
						</TabPane>
						<TabPane tab="注册" key="2">
							<Form onSubmit={this.handleSubmit.bind(this)} style={{ padding: 20 }}>
	                    		<FormItem label="注册账号" hasFeedback>
	                    			{ getFieldDecorator('r_userName', {
	                    				rules: [{
	                    					required: true, 
	                    					message: '请输入您的账号', 
	                    					whitespace: true
	                    				}]
	                    			})(
	                    				<Input type="text"/>
	                    			)}
	                    		</FormItem>
	                    		<FormItem label="输入密码" hasFeedback>
	                    			{ getFieldDecorator('r_password', {
	                    				rules: [{
	                    					required: true, 
	                    					message: '请输入您的密码', 
	                    					whitespace: true
	                    				}]
	                    			})(
	                    				<Input type="password"/>
	                    			)}
	                    		</FormItem>
	                    		<FormItem label="确认密码" hasFeedback>
	                      			{ getFieldDecorator('r_confirmPassword', {
	                    				rules: [{
	                    					required: true, 
	                    					message: '请再次输入密码', 
	                    					whitespace: true
	                    				}]
	                    			})(
	                    				<Input type="password"/>
	                    			)}
	                    		</FormItem>
	                    		<FormItem label="邮箱" hasFeedback>
	                      			{ getFieldDecorator('r_email', {
	                    				rules: [{
	                    					type: 'email',
	                    					required: true, 
	                    					message: '请输入正确邮箱', 
	                    					whitespace: true
	                    				}]
	                    			})(
	                    				<Input />
	                    			)}
	                    		</FormItem>
	                    		<FormItem style={{ marginBottom: 8 }}>
						          	{ getFieldDecorator('agreement', {
						            	valuePropName: 'checked',
						          	})(
						            	<Checkbox>我已经同意<a href="javascript:void(0)">网站事项</a></Checkbox>
						          	)}
        						</FormItem>
        						<FormItem>
	                    			<Button type="primary" htmlType="submit">注册</Button>
	                  			</FormItem>
	                  		</Form>
						</TabPane>
					</Tabs>
				</Modal>

      		</div>
		);
	};
}

export default MobileHeader = Form.create({})(MobileHeader);
