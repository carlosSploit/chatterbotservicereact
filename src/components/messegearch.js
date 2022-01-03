import React from "react";
// css
import "../css/messegearch.css"
// rezise events
import useWindowDimensions from "../userWindowsDi0men0sions";

class Messegearch extends React.Component{

    render(){
        const {condition,messege,datehors} = this.props;
        const Component = () => {
            const { height, width } = useWindowDimensions();
            if (condition === "true"){
                return (
                    < div className="contenedorme">
                        <div className="messegeemisor">
                            <div className="d-flex flex-row">
                                <div className="perphoto"
                                ></div>
                                <div className="mx-1"></div>
                                <div className="d-flex flex-column">
                                    <div className="contmessege">
                                        {messege}
                                    </div>
                                    <div className="hoursmess">
                                        {datehors}
                                    </div>
                                    {/* <div className="opccions">
                                        <div className="opciten">
                                            <div>contendor de messege 1</div>
                                            <span>&#62;</span>
                                        </div>
                                        <div className="opciten">
                                            <div>contendor de messege 1</div>
                                            <span>&#62;</span>
                                        </div>
                                        <div className="opciten">
                                            <div>contendor de messege 1</div>
                                            <span>&#62;</span>
                                        </div>
                                        <div className="opciten">
                                            <div>contendor de messege 1</div>
                                            <span>&#62;</span>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }else{
                return (
                    < div className="contenedorme">
                        <div className="messegerecep">
                            <div className="d-flex flex-row-reverse">
                                <div className="perphoto"
                                    style={{
                                        backgroundImage: 'url("https://trilce.ucv.edu.pe/Fotos/Mediana/7001169560.jpg?lastmod=1639022401856")',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover'
                                    }}  
                                ></div>
                                <div className="mx-1"></div>
                                <div className="d-flex flex-column align-items-end">
                                    <div className="contmessege">
                                        {messege}
                                    </div>
                                    <div className="hoursmess">
                                        {datehors}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        };

        return (
            <Component>
            </Component>
        );
    }   
}

export default Messegearch