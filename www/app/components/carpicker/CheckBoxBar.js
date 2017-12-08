import React from 'react';
import {connect} from "dva";
import _ from "underscore";
import { Layout, Menu, Breadcrumb ,Checkbox ,Button  } from 'antd';

class CheckBoxBar extends React.Component{

	constructor(props) {
		super();
	//存储的是复选框的值
	this.state={
		value:[]
	}
	}

	
	componentDidMount() {
		
	}
	changeHandler(e,option){
		//underscore数据的交集 先克隆
		var _value=_.clone(this.state.value);
		if (e.target.checked) {
			_value.push(option);
			this.setState({
				"value":_.intersection(this.props.options,_value)
			})
		}else{
			this.setState({
				"value":this.state.value.filter((item)=>{
					return item!=option;
				})
			})
		}
	}
	submithandle(){
		if( this.state.value.length == 0){
			alert("你要至少选择一个!");
			return;
		}
		this.props.dispatch({"type":"carpicker/addfilter","value":this.state.value,"name":this.props.name})
	}
	render(){
		return <div>
			<b>{this.props.cname}</b>
			{" : "}
			{
				this.props.options.map((option,index)=>{
					return <Checkbox key={index} onChange={(e)=>{this.changeHandler(e,option)}}>{option}</Checkbox>
				})
			}
			<Button
			type="primay"
			onClick={()=>{this.props.dispatch({"type":"carpicker/addfilter","value":this.state.value,"name":this.props.name})}}
			>确定</Button>

		</div>
	}
}
export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}

	)(CheckBoxBar);
