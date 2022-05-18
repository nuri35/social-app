import React from "react";
import Button from "./../components/CustomButtons/Button";
import Nav from "./Nav"

function NotAuthenticatedContext(){

    return (
  
      
    <>
<Nav />

  <div  className="postBodyx">
        <div className="postBody_containerx">
            <span className="word">START A BLOG FOR FREE</span>
            <h1 className="ttype">Publish, grow, and earn, all in one place.</h1>
            <h4 className="smalltype">If you have a story to tell, knowledge to share, or a perspective to offer — welcome home. Sign up for free so your writing can thrive in a network supported by millions of readers — not ads.</h4>

           
            </div>

            <div >
                <img src="https:/accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"  alt=""/>
   </div>
   
     </div>

    
     <Button color="black" round="true">Start Writing</Button>
     </>
    
   
    )
}

export default NotAuthenticatedContext