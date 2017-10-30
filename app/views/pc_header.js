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

class PCHeader extends React.Component{
	constructor(){
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		}
	}

	componentWillMount() {
		if (localStorage.userid) {
			this.setState({
				hasLogined: true,
				userNickName: localStorage.userNickName,
				userid: localStorage.userid
			});
			
		}
	}

	setModalVisible(value) {
		this.setState({modalVisible: value});
	}

	handleClick(e) {
		if (e.key == "register") {
			this.setState({
				current: 'register'
			});
			this.setModalVisible(true);
		} else {
			this.setState({current: e.key});
		}
	}
	
	handleSubmit(e){
		e.preventDefault();

		var myFetchOptions = {
			method: 'GET'
		};
		var formData= this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
			+ "&username=" + formData.userName + "&password=" + formData.password
			+ "&r_userName="+formData.r_userName+"&r_password="+formData.r_password
			+ "&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({
				userNickName: json.NickUserName,
				userid: json.UserId
			});
			localStorage.userid = json.UserId;
			localStorage.userNickName = json.NickUserName;
			console.log(this.state.userNickName, localStorage.userid);
		});

		if (this.state.action == "login") {
			this.setState({
				hasLogined: true
			});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	}
	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	}
	logout(){
		localStorage.userid= '';
		localStorage.userNickName = '';
		this.setState({
			hasLogined: false
		});
	}
  	 render() {
	    const { getFieldDecorator } = this.props.form;
	    const userShow = this.state.hasLogined
	    ? 
	    	<Menu.Item key="logout" className="register" >
		      	<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
		      	&nbsp;&nbsp;
		      	<Link target="_blank" to="/usercenter">
		        	<Button type="dashed" htmlType="button">个人中心</Button>
		      	</Link>
		      	&nbsp;&nbsp;
	        	<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
	        </Menu.Item>
	    :
		    <Menu.Item key="register" className="register" >
		      <Icon type="appstore" />注册／登录
		    </Menu.Item>;

		const formItemLayout = {
	      	labelCol: {
	        	xs: { span: 24 },
	        	sm: { span: 6 },
	      	},
	      	wrapperCol: {
	        	xs: { span: 24 },
	        	sm: { span: 14 },
	      	},
	    }
	    const tailFormItemLayout = {
	      	wrapperCol: {
	        	xs: {
	          		span: 24,
	          		offset: 0,
	        	},
	       		sm: {
	          		span: 14,
	          		offset: 6,
	        	}
	      	}
	    }    

    return (
      	<header>
        	<Row>
	          	<Col span={1}></Col>
	          	<Col span={4}>
		            <a href="/" className="logo">
		              	<img src="/static/images/logo.png" alt="logo" />
		            </a>
	          	</Col>
          		<Col span={18}>
            	<Menu mode="horizontal" 
            		onClick={this.handleClick.bind(this)} 
            		selectedKeys={[this.state.current]}
            	>
              		<Menu.Item key="top"><Icon type="appstore" />头条</Menu.Item>
              		<Menu.Item key="shehui"><Icon type="appstore" />社会</Menu.Item>
              		<Menu.Item key="guonei"><Icon type="appstore" />国内</Menu.Item>
              		<Menu.Item key="guoji"><Icon type="appstore" />国际</Menu.Item>
              		<Menu.Item key="yule"><Icon type="appstore" />娱乐</Menu.Item>
              		<Menu.Item key="tiyu"><Icon type="appstore" />体育</Menu.Item>
              		<Menu.Item key="keji"><Icon type="appstore" />科技</Menu.Item>
              		<Menu.Item key="shishang"><Icon type="appstore" />时尚</Menu.Item>
              		{userShow}
            	</Menu>

	            <Modal title="用户中心" wrapClassname="vertical-center-modal"
	            	className="login-modal"
	            	visible={this.state.modalVisible} 
	            	onCancel={() => this.setModalVisible(false)} 
	            	onOk={()=>this.setModalVisible(false)} okText="关闭" 
	            >
              		<Tabs type="card" onChange={this.callback.bind(this)}>

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
	                    		<FormItem {...formItemLayout} label="注册账号" hasFeedback>
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
	                    		<FormItem {...formItemLayout} label="输入密码" hasFeedback>
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
	                    		<FormItem {...formItemLayout} label="确认密码" hasFeedback>
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
	                    		<FormItem {...formItemLayout} label="邮箱" hasFeedback>
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
	                    		<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
						          	{ getFieldDecorator('agreement', {
						            	valuePropName: 'checked',
						          	})(
						            	<Checkbox>我已经同意<a href="javascript:void(0)">网站事项</a></Checkbox>
						          	)}
        						</FormItem>
        						<FormItem {...tailFormItemLayout}>
	                    			<Button type="primary" htmlType="submit">注册</Button>
	                  			</FormItem>
	                  		</Form>
	                	</TabPane>

              		</Tabs>

            	</Modal>

          	</Col>

          	<Col span={1}></Col>
        </Row>
      </header>
    );
  };
}

export default PCHeader = Form.create({})(PCHeader);