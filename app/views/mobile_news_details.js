import React from 'react'
import { Row, Col, BackTop } from 'antd'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import CommonComments from '../components/common_comments'

class MobileNewsDetails extends React.Component {
	
	constructor() {
		super();
		this.state = {
			newsItem: ''
		};
	}

	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		console.log(this.props);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" 
			+ this.props.match.params.uniquekey)
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({
				newsItem: json
			});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		})
	};
	createMarkup() {
		return {__html: this.state.newsItem.pagecontent};
	};
	render() {
		return (
			<div id="mobileDetailsContainer">
				<MobileHeader />
				<div className="ucmobileList">
					<Row>
						<Col span={24} className="container">
							<div className="articleContainer" 
								dangerouslySetInnerHTML={this.createMarkup()}>
							</div>
							<hr/>
							<CommonComments uniquekey={this.props.match.params.uniquekey}/>
						</Col>
					</Row>
					<MobileFooter />
					<BackTop />
				</div>
			</div>
		);
	};
}

export default MobileNewsDetails;
