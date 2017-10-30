import React from 'react'
import { Row, Col } from 'antd'

class PCFooter extends React.Component {
  	render(){
    	return (
      		<div>
        		<Row>
					<Col span={2}></Col>
					<Col span={20} className="footer">
            			&copy;&nbsp;2017 News by react, All Rights Reserved.
					</Col>
					<Col span={2}></Col>
				</Row>
      		</div>
    	)	
  	}
}

export default PCFooter;