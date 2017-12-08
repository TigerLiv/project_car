import React from 'react';
import {connect} from "dva";
import {Table,Button} from "antd";
import {routerRedux} from "dva/router";
class CarDataBox extends React.Component{
	constructor({carpicker,dispatch}) {
		super();
		this.state={
			cols:[
			{
				title:"图片",
				dataIndex:"pic",
				key:"pic",
				render(text,record,index){
					return <img src={`carpic/${text}`} width="100"/>
				},
				width:140
			},
			{
				title:"型号",
				dataIndex:"model",
				key:"model",
				sorter:true
			},
			{
				title:"产地",
				dataIndex:"country",
				key:"country",
				sorter:true
			},
			{
				title:"品牌",
				dataIndex:"brand",
				key:"brand",
				sorter:true
			},
			{
				title:"类型",
				dataIndex:"type",
				key:"type",
				sorter:true
			},
			{
				title:"座位数",
				dataIndex:"seat",
				key:"seat",
				sorter:true
			},
			{
				title:"售价",
				dataIndex:"price",
				key:"price",
				sorter:true
			},
			{
				title:"发售日期",
				dataIndex:"date",
				key:"date",
				sorter:true
			},
			{
				title:"操作",
				dataIndex:"manipulation",
				render(text,record){
					return <div>
						<Button onClick={()=>{dispatch(routerRedux.push("/picshow/"+record.picdir))}}>查看图集</Button>
					</div>
				}
			}
			],
			cars:[]
		}
	};
	componentDidMount() {
		
	}
	componentWillReceiveProps({carpicker}) {
		this.setState({
			...this.state,
			"cars":carpicker.cars
		})
	}
	onShowSizeChangehandler(page,pageSize){
		this.props.dispatch({
			"type":"carpicker/changepage",
			page,
			pageSize
		})
	}
	onchangehandler(pagination,filters,sorter){
		this.props.dispatch({
			"type":"carpicker/changepage",
			"page":pagination.current,
			"pageSize":pagination.pageSize,
			"field":sorter.field,
			"oreder":sorter.order
		});
	}
	render(){
		return <div>
			<Table
				dataSource={this.state.cars}
				columns ={this.state.cols}
				rowKey="id"
				pagination={{
					current:this.props.carpicker.paginations.current,
					total:this.props.carpicker.paginations.total,
					pageSize:this.props.carpicker.paginations.pageSize,
					onChange:(page,pageSize)=>{
						this.onShowSizeChangehandler(page,pageSize);
					},
					showSizeChanger:true,
					onShowSizeChange:(page,pageSize)=>{
						this.onShowSizeChangehandler(page,pageSize);
					}
				}}
				onChange={(pagination,filters,sorter)=>{
					this.onchangehandler(pagination,filters,sorter);
				}}
			></Table>

		</div>
	}
}
export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}


	)(CarDataBox);

























