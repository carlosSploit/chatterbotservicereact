import React from "react";
import '../css/botoninvert.css';

class Bottonestade extends React.Component{
    render(){
        const {tipo,text,onClick} = this.props;
        return (
            <div className= {((tipo === "true" )? "bottomsal": "inverbottomsal")}
                onClick={()=>
                    onClick()
                }
            >
                {text}
            </div>
        );
    }
}

export default Bottonestade