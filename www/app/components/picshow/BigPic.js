import React from "react";
import {connect} from "dva";
import "./BigPic.less";
class BigPic extends React.Component{
    constructor({picshow}){
        super();
    }
    componentDidMount(){
        $(this.refs.inner).css("height",$(window).height());
    }
    render(){
        //控制台报错 img的url出现undefined
        if(!this.props.picshow.data.colors) return <div></div>
        //需要获取 汽车的名字 当前的颜色 图片类型 图片名字
        var picshow=this.props.picshow;
        var images=picshow.data.colors[picshow.colors[picshow.nowcolor]].types[picshow.types[picshow.nowtype]];
        var carname=this.props.picshow.data.name;
        var color=this.props.picshow.colors[this.props.picshow.nowcolor];
        var type=this.props.picshow.types[this.props.picshow.nowtype];
        var image=images[this.props.picshow.nowidx];
        return <div className="bigpicwarp">
                    <div className="inner" ref="inner">
                        <img src={`carpic/${carname}/${color}/${type}/${image}`}/>
                        <div className="leftBtn" onClick={()=>{this.props.dispatch({"type":"picshow/goprev"})}}></div>
                        <div className="rightBtn" onClick={()=>{this.props.dispatch({"type":"picshow/gonext"})}}></div>
                    </div>
        </div>
    }
}
export  default connect(
    ({picshow})=>{
        return{
            picshow
        }
    }
)(BigPic);