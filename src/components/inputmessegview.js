import React from "react";
// components
import Chipt from "./chipts";
// rezise events
import useWindowDimensions from "../userWindowsDi0men0sions";
// css
import "../css/inputmessegview.css";
// componets
import {hidenmodel} from "../components/modalcomport";
// fontawason
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// configuracion
import configuracion from '../config.json';
// axios
import axios from 'axios';

export class Inputmessegview extends React.Component{

    constructor(props){
        super(props);
        this.delectmessechat = this.delectmessechat.bind(this);
    }

    async delectmessechat(codechat,codemess){
        const resultado = await axios.delete(`${configuracion.repository.remoto.host}/app/mess/${codechat}/${codemess}`);
    }

    render(){
        const {idcodechat,messge,onedit,onupdate} = this.props;
        const Component = () => {
            const { height, width } = useWindowDimensions();
            return (
            <div className="contentinputmess p-3"
                style={{
                    marginRight: `${(width < 820)? "15px":  "15px"}`,
                    width: `${(width < 820)? (width - 50)+"px": "auto"}`
                }}
            >
                <div className="content">
                    <div className="info">
                        <div className="inputs">{messge.input}</div>
                        <div className="output">{messge.ouputs}</div>
                    </div>
                    <div className="d-flex flex-row">
                        <div className="editcont">
                            <div onClick={()=>onedit(messge)}><FontAwesomeIcon icon={faPen} color="#ffff"/></div>
                        </div>
                        <div className="mx-1"></div>
                        <div className="elimcont">
                            <div onClick={async ()=>{
                                await this.delectmessechat(idcodechat,messge.id);
                                await onupdate(idcodechat);
                            }}><FontAwesomeIcon icon={faTrash} color="#ffff"/></div>
                        </div>
                    </div>
                </div>
                
                <div className="tippalclab d-flex flex-row w-auto justify-content-between">
                    <div>Palabras claves:</div>
                    <select class="selectrender" aria-label="Default select example"
                        defaultValue = {messge.inputpalclab.tipo}
                        disabled
                    >
                        <option selected>Select Tipo</option>
                        <option value="1" >secuencia</option>
                        <option value="2" >conbinaciones</option>
                        <option value="3" >no-dependientes</option>
                    </select>
                </div>

                <div className="lischip">
                    {messge.inputpalclab.palabras.map(
                        pall => {
                            return (
                                <Chipt label = {pall}/>
                            );
                        }
                    )}
                </div>
            </div>
            );
        };

        return (
            <Component>
            </Component>
        );
    }   
}

export class Inserinputmessege extends React.Component{

    constructor(props){
        super(props);
        this.changeinserpal = this.changeinserpal.bind(this);
        this.changeselecttipo = this.changeselecttipo.bind(this);
        this.state = {
            id: 3,
            input: "",
            inputpalclab: {
                idmessege: 3,
                tipo: 1,
                palabras: [
                ]
            },
            ouputs: ""
        };
    }

    changeselecttipo(){
        const inputed = document.getElementById('infoinserinput').value;
        const outputed = document.getElementById('infoinseroutput').value;
        var text = document.getElementById("infoinsertiposelect").value;
        this.setState({
            input:inputed,
            ouputs:outputed,
            inputpalclab: {
                idmessege: 3,
                tipo:  text,
                palabras: this.state.inputpalclab.palabras
            },
        });
        console.log(this.state);
    }

    changeinserpal(){
        const inputed = document.getElementById('infoinserinput').value;
        const outputed = document.getElementById('infoinseroutput').value;
        var text = document.getElementById("infoinserpalclab").value;
        var arrayaux = this.state.inputpalclab.palabras;
        if (text != "" && arrayaux.indexOf(text) != 1) {
            arrayaux.push(text);
            this.setState({
                input:inputed,
                ouputs:outputed,
                inputpalclab: {
                    idmessege: 3,
                    tipo:  this.state.inputpalclab.tipo,
                    palabras: arrayaux
                },
            });
            console.log(this.state);
        }
    }

    delectinsepal(palabra){
        const inputed = document.getElementById('infoinserinput').value;
        const outputed = document.getElementById('infoinseroutput').value;
        var arrayaux = this.state.inputpalclab.palabras;
        var arraypal = [];
        arrayaux.map(pal => {
            if(pal != palabra){
                arraypal.push(pal);
            }else{
                console.log("Eliminado: ",pal);
            }
        });
        this.setState({
            input:inputed,
            ouputs:outputed,
            inputpalclab: {
                idmessege: 3,
                tipo:  this.state.inputpalclab.tipo,
                palabras: arraypal
            }
        });
        console.log(this.state);
    }

    // agregar un mensjade en un chatbot por medio de la api, como reaccion al botton guardar
    async addmessege(codechat){
        const inputed = document.getElementById('infoinserinput').value;
        const outputed = document.getElementById('infoinseroutput').value;
        this.setState({
            input:inputed,
            ouputs:outputed
        });
        console.log(this.state);
        const response = await axios.post(`${configuracion.repository.remoto.host}/app/mess/${codechat}`,this.state);
        console.log(response.data);
        hidenmodel(()=>{
            this.setState({
                id: 3,
                input: "",
                inputpalclab: {
                    idmessege: 3,
                    tipo: 1,
                    palabras: [
                    ]
                },
                ouputs: ""
            });
        });
    }

    render(){
        const Component = () => {
            const { height, width } = useWindowDimensions();
            const {idchatbot,onupdate} = this.props;
            return (
            <div className="p-3"
                style={{
                    width: `${(width < 820)? (width - 50)+"px": "auto"}`
                }}
            >
                <div>Ingresa tu entrada esperada y la salida de tu socket de mensaje:</div>
                <div className="content my-2">
                    <div className="infoinser">
                        <input id="infoinserinput" className="input" type="text" placeholder="input" defaultValue={this.state.input}/>
                        <div className="my-1"></div>
                        <input id="infoinseroutput" className="input" type="text" placeholder="output" defaultValue={this.state.ouputs}/>
                    </div>
                </div>
                
                <div className="tippalclab d-flex flex-row w-auto justify-content-between my-2">
                    <div>Palabras claves:</div>
                    <select id="infoinsertiposelect" class="selectrender" aria-label="Default select example"
                        defaultValue={this.state.inputpalclab.tipo}
                        onChange={this.changeselecttipo}
                    >
                        <option selected>Select Tipo</option>
                        <option value="1" >secuencia</option>
                        <option value="2" >conbinaciones</option>
                        <option value="3" >no-dependientes</option>
                    </select>
                </div>
                <div>Ingresa palabras clabes que esten relacionadas al input:</div>
                <div className="insertpalclab d-flex flex-row my-2">
                    <input id="infoinserpalclab" className="infoinserinputc" type="text" placeholder="input"/>
                    <div onClick={this.changeinserpal}><FontAwesomeIcon icon={faPen} color="#7d3dcf"/></div>
                </div>
                <div className="lischip" datacontent="">
                    {this.state.inputpalclab.palabras.map(pall=>{
                        return (<Chipt tip = "true" label = {pall} ondelect={pal => this.delectinsepal(pal)}/>);
                    })}
                </div>
                <div className="my-2"></div>
                <div className="my-2 d-flex justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <div className="mx-2"></div>
                    <button id="subminchan" type="button" class="btn btn-primary" onClick={async()=>{
                        await this.addmessege(idchatbot);
                        await onupdate();
                        // this.addchatbot();
                        // await onupdate();
                    }}>Guardar</button>
                </div>
            </div>
            );
        };
        return (
            <Component>
            </Component>
        );    
    }

}

export class Editinputmessege extends React.Component{


    constructor(props){
        super(props);
        this.changeinserpal = this.changeinserpal.bind(this);
        this.changeselecttipo = this.changeselecttipo.bind(this);
        this.state = {
            id: 0,
            input: "",
            inputpalclab: {
                idmessege: 0,
                tipo: 1,
                palabras: [
                ]
            },
            ouputs: ""
        };
    }

    changeselecttipo(){
        const inputed = document.getElementById('infoupdateinput').value;
        const outputed = document.getElementById('infoupdateoutput').value;
        var text = document.getElementById("infoinsertiposelect").value;
        this.setState({
            input:inputed,
            ouputs:outputed,
            inputpalclab: {
                idmessege: 3,
                tipo:  text,
                palabras: this.state.inputpalclab.palabras
            },
        });
        console.log(this.state);
    }

    changeinserpal(){
        const inputed = document.getElementById('infoupdateinput').value;
        const outputed = document.getElementById('infoupdateoutput').value;
        var text = document.getElementById("infoinserpalclab").value;
        var arrayaux = this.state.inputpalclab.palabras;
        if (text != "" && arrayaux.indexOf(text) != 1) {
            arrayaux.push(text);
            this.setState({
                input:inputed,
                ouputs:outputed,
                inputpalclab: {
                    idmessege: 3,
                    tipo:  this.state.inputpalclab.tipo,
                    palabras: arrayaux
                },
            });
            console.log(this.state);
        }
    }

    delectinsepal(palabra){
        const inputed = document.getElementById('infoupdateinput').value;
        const outputed = document.getElementById('infoupdateoutput').value;
        var arrayaux = this.state.inputpalclab.palabras;
        var arraypal = [];
        arrayaux.map(pal => {
            if(pal != palabra){
                arraypal.push(pal);
            }else{
                console.log("Eliminado: ",pal);
            }
        });
        this.setState({
            input: inputed,
            ouputs: outputed,
            inputpalclab: {
                idmessege: 3,
                tipo:  this.state.inputpalclab.tipo,
                palabras: arraypal
            }
        });
        console.log(this.state);
    }

    // agregar un mensjade en un chatbot por medio de la api, como reaccion al botton guardar
    async updatemessege(codechat){
        const inputed = document.getElementById('infoupdateinput').value;
        const outputed = document.getElementById('infoupdateoutput').value;
        console.log("Estado a enviar antes ",this.state);
        console.log(`estado ingresado de los input ${inputed} - ${outputed}`);
        this.state.input = inputed;
        this.state.ouputs = outputed;
        this.setState({
        });
        console.log("Estado a enviar",this.state);
        const response = await axios.put(`${configuracion.repository.remoto.host}/app/mess/${codechat}`,this.state);
        // cerrar el modal
        hidenmodel(()=>{
            this.setState({
                id: 0,
                input: "",
                inputpalclab: {
                    idmessege: 0,
                    tipo: 1,
                    palabras: [
                    ]
                },
                ouputs: ""
            });
        });
        await this.listchatbots();
    }

    // // al iniciar la apliccion
    // async componentDidMount() {
        
    //     //this.listmessege(this.state.data[0].userchatbot)
    // }

    render(){
        const Component = () => {
            const {width} = useWindowDimensions();
            const {idchatbot,onupdate,messge} = this.props;
            const {} = this.props;
            if (this.state.id != messge.id) {
                this.setState(messge);
            }
            // this.setState(messge);
            return (
            <div className="p-3"
                style={{
                    width: `${(width < 820)? (width - 50)+"px": "auto"}`
                }}
            >
                <div>Ingresa tu entrada esperada y la salida de tu socket de mensaje:</div>
                <div className="content my-2">
                    <div className="infoinser">
                        <input id="infoupdateinput" className="input" type="text" placeholder="input" defaultValue={this.state.input}/>
                        <div className="my-1"></div>
                        <input id="infoupdateoutput" className="input" type="text" placeholder="output" defaultValue={this.state.ouputs}/>
                    </div>
                </div>
                
                <div className="tippalclab d-flex flex-row w-auto justify-content-between my-2">
                    <div>Palabras claves:</div>
                    <select id="infoinsertiposelect" class="selectrender" aria-label="Default select example"
                        defaultValue={this.state.inputpalclab.tipo}
                        onChange={this.changeselecttipo}
                    >
                        <option selected>Select Tipo</option>
                        <option value="1" >secuencia</option>
                        <option value="2" >conbinaciones</option>
                        <option value="3" >no-dependientes</option>
                    </select>
                </div>
                <div>Ingresa palabras clabes que esten relacionadas al input:</div>
                <div className="insertpalclab d-flex flex-row my-2">
                    <input id="infoinserpalclab" className="infoinserinputc" type="text" placeholder="input"/>
                    <div onClick={this.changeinserpal}><FontAwesomeIcon icon={faPen} color="#7d3dcf"/></div>
                </div>
                <div className="lischip" datacontent="">
                    {this.state.inputpalclab.palabras.map(pall=>{
                        return (<Chipt tip = "true" label = {pall} ondelect={pal => this.delectinsepal(pal)}/>);
                    })}
                </div>
                <div className="my-2"></div>
                <div className="my-2 d-flex justify-content-center">
                    <button type="button" class="btn btn-secondary" onClick={()=>
                        hidenmodel(
                            ()=>{
                                this.setState({
                                    id: 0,
                                    input: "",
                                    inputpalclab: {
                                        idmessege: 0,
                                        tipo: 1,
                                        palabras: [
                                        ]
                                    },
                                    ouputs: ""
                                })
                            }
                        )
                    }>Close</button>
                    <div className="mx-2"></div>
                    <button id="subminchan" type="button" class="btn btn-primary" onClick={async()=>{
                        this.updatemessege(idchatbot);
                        onupdate();
                        // this.addchatbot();
                        // await onupdate();
                    }}>Guardar</button>
                </div>
            </div>
            );
        };
        return (
            <Component>
            </Component>
        );    
    }

}

