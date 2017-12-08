import React from "react";
import {connect} from "dva";
import "./CarPicker.less";
import { Layout, Menu, Breadcrumb } from 'antd';
import FilterIndicator from "../components/carpicker/FilterIndicator.js";
import CheckBoxBar from "../components/carpicker/CheckBoxBar.js";
import DateBar from "../components/carpicker/DateBar.js";
import RangeBar from "../components/carpicker/RangeBar.js";
import CarDataBox from "../components/carpicker/CarDataBox.js";
const { Header, Content, Footer } = Layout;
class CarPicker extends React.Component{
    constructor({carpicker,dispatch}){
        super();
        dispatch({"type":"carpicker/init"});
    }
    componentDidMount(){

    }
    render(){
        return <div>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">首页</Menu.Item>
                        <Menu.Item key="2">汽车筛选</Menu.Item>

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>汽车筛选</Breadcrumb.Item>

                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <FilterIndicator></FilterIndicator>
                        <div className="filterbar">
                            <CheckBoxBar
                                name="country"
                                cname="产地"
                                options={["国产","美国","日本","其他"]}
                            ></CheckBoxBar>
                        </div>
                        <div className="filterbar">
                            <CheckBoxBar
                                name="brand"
                                cname="品牌"
                                options={this.props.carpicker.brandoptions}
                            ></CheckBoxBar>
                        </div>
                        <div className="filterbar">
                            <CheckBoxBar
                                name="seat"
                                cname="座位数"
                                options={["2","5","7","其他"]}
                            >
                                
                            </CheckBoxBar>
                        </div>
                        <div className="filterbar">
                            <CheckBoxBar
                                name="type"
                                cname="车型"
                                options={["轿车","小型SUV","中型SUV","大型SUV"]}
                            >
                                
                            </CheckBoxBar>
                        </div>
                        <div className="filterbar" 
                            style ={{"display":this.props.carpicker.filternames.includes("price")?"none":"block"}}
                        >
                            <RangeBar
                                name="price"
                                cname="售价"
                                min={2}
                                max={2000}
                            ></RangeBar>
                        </div>
                        <div className="filterbar"
                            style = {{"display":this.props.carpicker.filternames.includes("date")?"none":"block"}}
                        >
                            <DateBar
                                name="date"
                                cname="发布日期"
                                min="2005-01-01"
                                max="2017-01-01"
                            ></DateBar>
                        </div>
                    </div>
                    <div style={{background : '#fff',padding :24,minHeight:280}}>
                       <CarDataBox></CarDataBox>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Design by lihu
                </Footer>
            </Layout>
        </div>
    }
}
export default connect(
    ({carpicker})=>{
        return {
            carpicker
        }
    }
)(CarPicker);