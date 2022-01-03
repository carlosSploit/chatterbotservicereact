import React from "react";
// css
import "../css/chatbotmessege.css"
// rezise events
import useWindowDimensions from "../userWindowsDi0men0sions";
// componets
import {hidenmodel} from "../components/modalcomport";
// axios
import axios from 'axios'
// fontawason
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
// configuracion
import configuracion from '../config.json';

export class Chatbotmessegview extends React.Component{

    render(){
        const {chatbo, code, fecha, change, ondelect, onedit} = this.props;
        const Component = () => {
            const { height, width } = useWindowDimensions();
            return (
                <div className="chatbotmesseg"
                    style={{
                        marginRight: `${(width < 820)? "15px":  "0px"}`,
                        paddingTop: '5px',
                        paddingBottom: '5px'
                    }}
                >
                    <div className="infochat"
                        onClick={() => change(code)}
                    >
                        <div className="title">{chatbo}</div>
                        <div className="code">{code}</div>
                        <div className="fecha">{fecha}</div>
                    </div>
                    <div className="d-flex justify-content-end botonopccion">
                        <div className="ondelect"
                            onClick={() => ondelect(code)}
                        ><FontAwesomeIcon icon={faTrash} color="#ffff"/></div>
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

export class AddChatbotmessegview extends React.Component{

    state = {
        chatbot: "contenedor rarp"
    }

    constructor(props){
        super(props);
        this.addchatbot = this.addchatbot.bind(this);
    }

    // agregar un chatbot por medio de la api, como reaccion al botton guardar
    async addchatbot(){
        const namechat = document.getElementById('namechatbot');
        console.log(namechat.value);
        console.log(this.state.chatbot);
        const response = await axios.get(`${configuracion.repository.remoto.host}/app/user/create/${namechat.value}`);
        console.log(response.data);
        hidenmodel(()=>{});
    }

    render(){
        const {onupdate} = this.props;
        const Component = () => {
            const { height, width } = useWindowDimensions();
            return (
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">&#x1f916;</span>
                        <input id="namechatbot" type="text" class="form-control" placeholder="Nombre del chatbot" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="subminchan" type="button" class="btn btn-primary" onClick={async()=>{
                            this.addchatbot();
                            await onupdate();
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

export class EditChatbotmessegview extends React.Component{

    state = {
        chatbot: "contenedor rarp"
    }

    constructor(props){
        super(props);
        this.addchatbot = this.addchatbot.bind(this);
    }

    // agregar un chatbot por medio de la api, como reaccion al botton guardar
    async editchat(code){
        // const namechat = document.getElementById('namechatbot');
        // const response = await axios.get(`${configuracion.repository.remoto.host}/app/user/create/${namechat.value}`);
        // console.log(response.data);
        // hidenmodel(()=>{});
    }

    render(){
        const {onupdate,messg,code} = this.props;
        const Component = () => {
            const { height, width } = useWindowDimensions();
            return (
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">&#x1f916;</span>
                        <input id="namechatbot" type="text" class="form-control" placeholder="Nombre del chatbot" aria-label="Username" aria-describedby="basic-addon1" defaultValue={messg}/>
                    </div>
                    <div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="subminchan" type="button" class="btn btn-primary" onClick={async()=>{
                            await this.editchat(code);
                            await onupdate();
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
