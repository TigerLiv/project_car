import React from 'react';
import {connect} from "dva";
import {Row,Col,Slider,Button} from "antd";

class RangeBar extends React.Component{
	constructor({carpicker,dispatch}) {
		super();
		this.state={
			"a":200,
			"b":1000
		}		
	}
	componentDidMount() {
		
	} 
	render(){
		return <div>
			<Row>
        <Col span={1}>
          	<b>{this.props.cname}{" : "}</b>
        </Col>
        <Col span={12}>
           <Slider range defaultValue={[20, 50]}  
           	min={this.props.min}  max={this.props.max}
           	onChange={(value)=>{this.setState({"a":value[0],"b":value[1]})}}
           />
        </Col>
         <Col span={1}>
           <Button type="primary" 
           onClick={()=>{this.props.dispatch({"type":"carpicker/addfilter","value":this.state,"name":this.props.name})}}
           >确定</Button>
        </Col>
        </Row>
		</div>
	}
}
export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}

	)(RangeBar);