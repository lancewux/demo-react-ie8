import React from 'react'

export default React.createClass({
  render() {
    return (
    	<div>
    		<p>Home</p>
    		{this.props.children}
    	</div>
    )
  }
})