import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, DatePicker  } from 'antd'
import 'antd/dist/antd.less'
import MediaQuery from 'react-responsive'
import PCIndex from './components/pc_index'
import MobileIndex from './components/mobile_index'
import PCNewsDetails from './views/pc_news_details'
import MobileNewsDetails from './views/mobile_news_details'
import PCUserCenter from './views/pc_usercenter'
import MobileUserCenter from './views/mobile_usercenter'

class Root extends React.Component {
	
	render(){
		
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<Router>
						<div>
							<Route exact path="/" component={PCIndex}/>
							<Route path="/details/:uniquekey" component={PCNewsDetails}/>
							<Route path="/usercenter" component={PCUserCenter}/>
						</div>	
					</Router>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<Router>
						<div>
							<Route exact path="/" component={MobileIndex}/>
							<Route path="/details/:uniquekey" component={MobileNewsDetails}/>
							<Route path="/usercenter" component={MobileUserCenter}/>
						</div>	
					</Router>
				</MediaQuery>
			</div>
		)
	}
}

export default Root;