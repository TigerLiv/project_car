import React from 'react';
import {connect} from "dva";
import {Tag} from "antd";
class FilterTag extends React.Component{
	constructor({carpicker}){
		super();
	}
	componentDidMount() {
		
	}
	closeHandler(e){
		e.preventDefault();
		this.props.dispatch({"type":"carpicker/delfilter","name":this.props.item.name})
	}
	cname(){
		switch (this.props.item.name) {
			case "seat":
				return "座位数";

			case "country":
				return "生产国";

			case "price":
				return "价格";
			case "brand":
			 	return "品牌";
			 case "date":
			 	return "上市时间";
			 case "type":
			 	return "车型";
		}
	}
	v(){
		var value=this.props.item.value;
		switch (this.props.item.name) {
			case "seat":
				value=value.map((item)=>{
					return item+"座"
				});
				return value.join("或");
			case "country":
			case "brand":
			case "type":
				return value.join("或");
			case "price":
				return `${value.a}万 至${value.b}`;
			case "date":
				return `${value.a}到${value.b}`;
		}
	}
	render(){
		return   <Tag closable onClose={this.closeHandler.bind(this)}>
			<b>{this.cname()}</b>
			{" : "}
			{this.v()}	
		</Tag>
	}

}
export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}

)(FilterTag);














