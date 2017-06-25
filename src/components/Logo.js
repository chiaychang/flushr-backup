import React from 'react';
var Link = require("react-router").Link;

class Logo extends React.Component{

    render() {
        return(

         <div className="flshr-logo ui button" data-inverted="" 
              data-tooltip="Home" 
              data-position="bottom left">
	         <Link to="/">
		         <img src={require('../../public/assets/images/logo.png')} alt="flushr-logo" className="img-responsive"/>
	         </Link>
         </div>

        );
	}
}

export default Logo;