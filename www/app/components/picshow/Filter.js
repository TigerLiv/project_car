import React from "react";
import {connect} from "dva";
import "./Filter.less";
import classnames from "classnames";
class Filter extends React.Component{
    constructor({picshow}){
        super();
    }
    // componentDidMount(){
    //     $(this.refs.colorfilter).find("li").each(function () {
    //         $(this).css("background",$(this).data("color"));
    //     })
    // }
    render(){
        //获取当前的颜色
        var nowcolor=this.props.picshow.colors[this.props.picshow.nowcolor]
        //由于第一次render的时候 this.props.picshow.data是空的
        if (this.props.picshow.data.colors){
            var types=this.props.picshow.data.colors[nowcolor].types;

        }
        return <div className="filter_warp">

            <h3 className="carName">{this.props.picshow.data.name}</h3>
            <div className="typefilter">
                <ul>
                    {
                        this.props.picshow.types.includes("view")
                        &&
                            <li
                            className={classnames({"cur":this.props.picshow.types[this.props.picshow.nowtype]=="view"})}
                            onClick={()=>{this.props.dispatch({"type":"picshow/changetype","typename":"view"})}}
                            >外观({types.view.length})</li>
                    }
                    {
                        this.props.picshow.types.includes("center")
                        &&
                            <li
                            className={classnames({"cur":this.props.picshow.types[this.props.picshow.nowtype]=="center"})}
                            onClick={()=>{this.props.dispatch({"type":"picshow/changetype","typename":"center"})}}
                            >
                                中控({types.center.length})
                            </li>
                    }
                    {
                        this.props.picshow.types.includes("detail")
                        &&
                            <li
                            className={classnames({"cur":this.props.picshow.types[this.props.picshow.nowtype]=="detail"})}
                            onClick={()=>{this.props.dispatch({"type":"picshow/changetype","typename":"detail"})}}
                            >
                                细节({types.detail.length})
                            </li>
                    }
                </ul>
            </div>
            <div className="cl"></div>
            <div className="colorfilter" ref="colorfilter">
                <h4>颜色:</h4>
                <ul>
                    {
                        this.props.picshow.colors.map((item,index)=>{
                            return <li
                                key={index}
                                style={{"backgroundColor":item}}
                                className={classnames({"cur":index==this.props.picshow.nowcolor})}
                                onClick={()=>{this.props.dispatch({"type":"picshow/changecolor","n":index})}}
                                >
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}
export default connect(
    ({picshow})=>{
        return {
            picshow
        }
    }
)(Filter);