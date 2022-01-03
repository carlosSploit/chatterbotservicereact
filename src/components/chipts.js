import React from "react";
// css
import "../css/chipts.css";
// fontawason
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class Chipt extends React.Component{
    render(){
        const {label,tip,ondelect} = this.props;
        return (
            <div className="chipitem">
                <div className="title">{label}</div>
                {
                    tip == "true" &&
                    <div onClick={()=>ondelect(label)}>
                        <FontAwesomeIcon icon={faTimes} color="#D2D2D2" size="12px"/>
                    </div>
                    
                }
            </div>
        );
    }
}

export default Chipt;