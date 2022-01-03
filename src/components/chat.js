import React from "react";
// components
import Messege from './messegearch'
// fontawason
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// axios
import axios from "axios";
// configuracion
import configuracion from '../config.json';

class TestChat extends React.Component{

    correcthor(timeset){
        return (timeset < 10 ) ? `0${timeset}` : timeset;
    }

    horaactual(){
        var hoy = new Date();
        // + ':' + this.correcthor(hoy.getSeconds())
        var hora = hoy.getHours() + ':' + this.correcthor(hoy.getMinutes());
        return hora;
    }

    constructor(props){
        super(props);
        this.conversando = this.conversando.bind(this);
        this.state = {
            idmess: "",
            messges:[
                {
                    content: "Bienvenido a la aplicacion, ingrese algo para comensar el test",
                    type : "true",
                    hors: this.horaactual()
                }
            ]
        }
    }

    async conversando(){
        const messege = document.getElementById("inputmesse").value;
        this.ingresameessegeemi(messege);
        await  this.respondemessege(messege);
        document.getElementById("inputmesse").value = "";
    }

    ingresameessegeemi(messege){
        const auxarray = this.state.messges;
        
        auxarray.push({
            content: messege,
            type : "false",
            hors: this.horaactual()
        });
        this.setState({
            messges: auxarray
        });
    }

    async respondemessege(messege){
        const responde = await axios.get(`${configuracion.repository.remoto.host}/app/chatbot/${this.state.idmess}/${messege}`);
        console.log("Id del chatbot :",this.state.idmess);
        console.log(responde.data);
        const auxarray = this.state.messges;
        auxarray.push({
            content: responde.data.messeg,
            type : "true",
            hors: this.horaactual()
        });
        this.setState({
            messges: auxarray
        });
    }

    
    render(){
        const {idchatbot} = this.props;
        if (idchatbot != this.state.idmess && idchatbot != undefined && idchatbot != "") {
            console.log(idchatbot);
            this.setState({
                idmess : idchatbot
            });
            console.log(this.state.idmess);
        }
        return (
            <div className="d-flex flex-column justify-content-between">
                <div className="titlechatbot w-auto">
                    Probar Chatbot
                </div>
                <div className="scrollernone"
                    style={
                        {
                            overflowX: `hidden`,
                            overflowY: `scroll`,
                            height: '100%',
                        }
                    }
                >   
                    <div className="d-flex flex-column">
                        {
                            this.state.messges.map(
                                messeg => {
                                    return <Messege
                                        condition = {messeg.type}
                                        messege = {messeg.content}
                                        datehors = {messeg.hors}
                                    />
                                }
                            )
                        }
                    </div>
                </div>
                <div className="envimess d-flex">
                    <div className="enviinput px-3">
                        <input type="text" id="inputmesse" placeholder="Escribe tu peticion..."/>
                        <div onClick={()=> this.conversando()}>
                            <FontAwesomeIcon icon={faPaperPlane} color="#7D3DCF"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestChat