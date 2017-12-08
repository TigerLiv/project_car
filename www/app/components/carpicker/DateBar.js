import React from 'react';
import {connect} from "dva";
import { Row , Col , Slider ,Button,DatePicker } from 'antd';
import moment from "moment";
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat="YYYY/MM/DD";
class DateBar extends React.Component{
	constructor({min,max}) {
		super();
		this.state={
			"a":min,
			"b":max
		}
		
	}
	componentDidMount() {
		
	}
	render(){

		return <div>

		<RangePicker 
			defaultValue={[moment(this.props.min, dateFormat), moment(this.props.max, dateFormat)]}
				format={dateFormat}
		onChange={(value,moment)=>{this.setState({"a":moment[0],"b":moment[1]})}} />
		{" "}
		<Button type="primay"
			onClick={()=>{this.props.dispatch({"type":"carpicker/addfilter","value":this.state,"name":this.props.name})}}

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

	)(DateBar);