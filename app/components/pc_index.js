import React from 'react'
import PCHeader from '../views/pc_header'
import PCFooter from '../views/pc_footer'
import PCNewsContainer from '../views/pc_newscontainer'

class PCIndex extends React.Component {
  	render(){
    	return (
      		<div>
        		<PCHeader />
        		<PCNewsContainer />
        		<PCFooter />
      		</div>
    	)	
  	}
}

export default PCIndex;