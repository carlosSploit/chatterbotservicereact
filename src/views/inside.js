import React from "react";
import ReactDOM from 'react-dom';
// import boostrat -
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import {Modal} from "bootstrap/dist/js/bootstrap"
// rezise events
import useWindowDimensions from "../userWindowsDi0men0sions";
// css
import "../css/inside.css"
// components
import {Inputmessegview, Inserinputmessege, Editinputmessege} from "../components/inputmessegview";
import {Chatbotmessegview,AddChatbotmessegview,EditChatbotmessegview} from "../components/chatbotmessegview";
import Bottonestade from "../components/botoninvert";
import TestChat from "../components/chat";
import {showmodalinit} from "../components/modalcomport";
// fontawason
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy,faCommentAlt,faPlus } from '@fortawesome/free-solid-svg-icons'
// image
import Logo from '../images/logo.png';
// axios
import axios from 'axios';
// configure
import configuracion from '../config.json';
class Insideview extends React.Component{

    state = {
        data: [],
        idchatbot: "",
        listmess:[]
    }

    constructor(props){
        super(props);
        this.changeaddchatbot = this.changeaddchatbot.bind(this);
    }

    //lista los chat que se encuentran en patalla
    listchatbots=()=>{
        axios.get(`${configuracion.repository.remoto.host}/app/user`).then( response  => {
            this.setState({
                data: response.data
            });
        })
    }

    // ondelectchatbot
    // elimina los chats que se encuentran en la lista
    async delectchatbot(code){
        await axios.delete(`${configuracion.repository.remoto.host}/app/user/${code}`);
        await this.listchatbots();
    }

    // onclickchat
    // lista los inputs contenidos en el chat
    async listmessege(code){
        await axios.get(`${configuracion.repository.remoto.host}/app/mess/list/${code}`).then( response  => {
            this.setState({
                listmess: response.data,
                idchatbot: code
            });
            console.log(response.data);
        })
    }

    // oncopypaste
    // metodo para poder ecopiar y pagar en cortapaletes lo que se quiere
    copiarcortapapeler(){
        var content = document.getElementById('urlapimeschatbot').innerHTML;
        navigator.clipboard.writeText(content)
            .then(() => {
            console.log("Text copied to clipboard...")
        })
            .catch(err => {
            console.log('Something went wrong', err);
        })
    }

    // changennoton
    // ingresa una casilla de nombre para poder agregar un chatbot
    changeaddchatbot(){
        setTimeout(()=>{showmodalinit(
        "Agregar chatbot",
        "Guardar chatbot",
        <AddChatbotmessegview
            onupdate = {() => this.listchatbots()}
        />
        );});
    }

    // changeeditchat
    // edita el nombre dentro del chatbot 
    changeeditchat(code,messges){
        console.log(messges);
        setTimeout(()=>{showmodalinit(
        "Editar mensaje",
        "Guardar mensaje",
            <EditChatbotmessegview
                code = {code}
                messg = {messges}
                onupdate = {() => this.listchatbots()}
            />
        );});
    }
    

    // changeaddmessege
    // agregar un mensaje dentro del chatbot 
    changeaddmessege(){
        setTimeout(()=>{showmodalinit(
        "Agregar mensaje",
        "Guardar mensaje",
            <Inserinputmessege
                idchatbot = {this.state.idchatbot}
                onupdate = {() => this.listmessege(this.state.idchatbot)}
            />
        );});
    }

    // changeeditmessege
    // edita un mensaje dentro del chatbot 
    changeeditmessege(messges){
        console.log(messges);
        setTimeout(()=>{showmodalinit(
        "Editar mensaje",
        "Guardar mensaje",
            <Editinputmessege
                idchatbot = {this.state.idchatbot}
                messge = {messges}
                onupdate = {code => this.listmessege(code)}
            />
        );});
    }

    // testchat
    async componentDidMount() {
        this.listchatbots()
        //this.listmessege(this.state.data[0].userchatbot)
    }

    render(){
        // console.log(this.state.data[0].fechecreate);
        //console.log(Object.keys(this.state.data[0]));
        
        //this.listmessege(this.state.data[0])
        const Component = () => {
            const { height, width } = useWindowDimensions();
            return (
                <div className="d-flex flex-xl-row flex-lg-row flex-column">
                    {/* contenedor principal*/}
                    <div className="w-100 contenedorprinci row">
                        <nav className="d-block d-lg-none d-xl-none w-100  navbar navbar-light">
                            <div className="container-fluid">
                                <a className="navbar-brand"><img src={Logo} alt="Chatbot" height="30px" width="90px"/></a>
                                <form className="d-flex">
                                    <div className="personlog">
                                        <div className="photo"></div>
                                        <div className="mx-2"></div>
                                        <FontAwesomeIcon icon={faCommentAlt} color="#FFFF" size="2x" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"/>
                                    </div>
                                </form>
                            </div>
                        </nav>
                        {/* contenedor de chatbots*/}
                        <div 
                            className="col-lg-3 col-xl-2 d-sm-inline-flex col d-flex flex-column justify-content-between"
                            style={{
                                height: `${(width < 820)? "auto":  "auto"}`
                            }}
                        >
                            <div className="mx-auto my-3 d-xl-flex d-lg-flex d-none">
                                <div className="logname"></div>
                            </div>
                            <div className="scroller scrollernone my-2 mx-auto w-100"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                {/* listar chatbots */}
                                <div className="d-inline-flex flex-sm-row flex-lg-column align-items-center w-auto">
                                    <div className="chatbotmesseg"
                                        style={{
                                            marginRight: `${(width < 820)? "15px":  "0px"}`,
                                            paddingTop: '5px',
                                            paddingBottom: '5px',
                                            width: `${(width < 820)? "auto":  "100%"}`,
                                            height: '90px',
                                            border: '3px solid #7d3dcf'
                                        }}
                                        onClick={this.changeaddchatbot}
                                    >
                                        <FontAwesomeIcon icon={faPlus} color="#7D3DCF" size="3x"/>
                                    </div>
                                    { this.state.data.map(chatbot=>{
                                        return(<Chatbotmessegview
                                            chatbo = {chatbot.nombrechatb}
                                            code = {chatbot.userchatbot}
                                            fecha = {chatbot.fechecreate}
                                            change = {code => this.listmessege(code)}
                                            ondelect = {code => this.delectchatbot(code)}
                                            onedit = {(code,messe) => this.changeeditchat(code,messe)}
                                            // onClick = {this.listmessege(chatbot.userchatbot)}
                                        />);
                                    })}
                                </div>
                            </div>
                            <div className="mx-auto my-3 d-xl-flex d-lg-flex flex-column d-none justify-content-center align-self-center">
                                <div className="personlog">
                                    <div className="photo"></div>
                                    <div className="mx-1"></div>
                                    <div className="person">Carlos Arturo</div>
                                </div>
                                <div className="my-1"></div>
                                <Bottonestade
                                    tipo = "true"
                                    text = "Salir"
                                />
                            </div>
                        </div>
                        <div className="w-100 d-xl-none d-lg-none d-md-block d-block"></div>
                        {/* contenedor de info de chatbots*/}
                        <div 
                            className="col-lg-9 col-xl-10 col bg-white"
                            style={{
                                height: `${(width < 820)? "70vh":  "100vh"}`
                            }}
                        >
                            {/* contenedor del repositorio */}
                            <div className="row">
                                <div
                                    className="col d-flex flex-column justify-content-center align-items-center"
                                    style={{
                                        height: `25vh`
                                    }}
                                >
                                    <div className="titleapi">
                                            URL Api Request
                                    </div>
                                    < div className="buscador m-3">
                                        <div id="urlapimeschatbot" className="url">https://chartbotapike.herokuapp.com/app/chatbot/{this.state.idchatbot}/</div>
                                        <div
                                            onClick={this.copiarcortapapeler}
                                        >
                                            <FontAwesomeIcon icon={faCopy} color="#7D3DCF"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* contenedor info y test de chatbot */}
                            <div className="row w-auto">
                                {/* contenedor de los inputs del chatbot */}  
                                <div
                                    className="col-lg-8 col-xl-8 col d-flex flex-column align-items-center"
                                    style={{
                                        height: `${(width < 820)? "auto":  "75vh"}`
                                    }}
                                >
                                    <div className="row my-2"></div>
                                    {/* contenedor agregar un input */}
                                    <div className="d-flex justify-content-between flex-row w-100"
                                    >
                                        <div className="d-flex flex-row">
                                            <div className="mx-2"></div>
                                            <div >Ingresa los inputs que deseas en el chatbot:</div>
                                        </div>
                                        <div className="mx-1"></div>
                                        <div className="d-flex flex-row">
                                            <Bottonestade
                                                tipo = "false"
                                                text = "Agregar"
                                                onClick = {()=>this.changeaddmessege()}
                                            />
                                            <div className="mx-2"></div>
                                        </div>
                                    </div>
                                    <div className="row my-2"></div>
                                    {/* contenedor lista de inputs */}
                                    <div className="row w-100 mx-auto">
                                        <div className="scroller scrollernone"
                                            style={
                                                {
                                                    overflowX: `hidden`,
                                                    overflowY: `scroll`,
                                                }
                                            }
                                        >
                                            <div className="contentscroll">
                                                { this.state.listmess.map(rmessege=>{
                                                    return(<Inputmessegview
                                                        idcodechat = {this.state.idchatbot}
                                                        messge = {rmessege}
                                                        onedit = {mess => this.changeeditmessege(mess)}
                                                        onupdate = {code => this.listmessege(code)}
                                                    />);
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* contenedor del test del chatbot */}
                                <div
                                    className="col-lg-4 col-xl-4 col-md-4 col bg-light d-xl-flex d-lg-flex d-md-none d-none"
                                    style={{
                                        height: `${(width < 820)? "75vh":  "75vh"}`,
                                        borderTopLeftRadius: '25px',
                                        borderTopRightRadius: '25px'
                                    }}
                                >
                                    <TestChat
                                        idchatbot = {this.state.idchatbot}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="offcanvas offcanvas-end w-100" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <TestChat
                                idchatbot = {this.state.idchatbot}
                            />
                        </div>
                    </div>
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 id="modaltitle" class="modal-title" >Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div id="modalbody" class="modal-body">
                                    ...
                                </div>
                            </div>
                        </div>
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

export default Insideview