export default {
    namespace:"carpicker",
    state:{
        filters:[

        ],
        brandoptions:[],
        filternames:[],
        cars:[],
        paginations:{
            current:1,
            total:0,
            pageSize:10,
            field:"id",
            order:"descend" //正序ascend  降序descend
        }
    },
    reducers:{
        init_sync(state,{brandoptions}){
            return {
                ...state,
                brandoptions
            }
        },
        addfilter_sync(state,{name,value,brandoptions=state.brandoptions}){
            return {
                ...state,
                filters:[
                    ...state.filters,
                    {name,value}
                ],
                filternames:[
                    ...state.filternames,
                    name
                ],
                brandoptions
            }
        },
        delfilter_sync(state,{name,brandoptions=state.brandoptions}){
            return {
                ...state,
                filters:state.filters.filter((item)=>{
                    return item.name!=name
                }),
                filternames:state.filternames.filter((item)=>{
                    return item!=name
                }),
                brandoptions
            }
        },
        fetchCarData_sync(state,{cars,total}){
            return {
                ...state,
                cars:cars,
                paginations:{
                    ...state.paginations,
                    total
                }
            }
        },
        changepage_sync(state,{page,pageSize,field,order}){
            return {
                ...state,
                paginations:{
                    ...state.paginations,
                    current:page,
                    pageSize,
                    field,
                    order
                }
            }
        }
    },
    effects:{
        init:function *(action,{put}) {
            const brandoptions=yield fetch("/api/brands.json").then((data)=>{
                return data.json()
            });
            yield put({"type":"init_sync","brandoptions":Object.values(brandoptions).reduce((a,b)=>{
                return a.concat(b);
            })});
            yield put({"type":"fetchCarData"});
        },
        addfilter:function *({name,value},{put}) {
            if (name=="country"){
                const data=yield fetch("/api/brands.json").then((data)=>{
                    return data.json();
                });
                var brandoptions=[];
                value.forEach((item)=>{
                    brandoptions=brandoptions.concat(data[item]);
                })
                // yield put({"type":"addfilter_sync",name,value,brandoptions});
                // return;
            }
            yield put({"type":"addfilter_sync",name,value,brandoptions});
            yield put({"type":"fetchCarData"});
        },
        delfilter:function *({name},{put}){
            if (name=="country") {
                const data=yield fetch("/api/brands.json").then((data)=>{
                    return data.json();
                })
                var brandoptions=Object.values(data).reduce((a,b)=>{
                    return a.concat(b)
                });
                // yield put({"type":"delfilter_sync",name,brandoptions});
                // return;
            }
            yield put({"type":"delfilter_sync",name,brandoptions})
            yield put({"type":"fetchCarData"});
        },
        changepage:function *({page,pageSize,field,order},{put}){
            //先发送同步 更改state
            yield put({"type":"changepage_sync",page,pageSize,field,order});
            //再发送数据到后台拉取数据
            yield put({"type":"fetchCarData"});
        },
        fetchCarData:function *({},{put,select}){
            //异步函数 使用select 获取state
            const filters=yield select((state)=>{
                return state.carpicker.filters
            });
            const paginations=yield select((state)=>{
                return state.carpicker.paginations
            });
            const {cars,total}=yield fetch("/cars",{
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json"
                },
                "body":JSON.stringify({"filters":JSON.stringify(filters), "paginations":JSON.stringify(paginations)
            })
            }).then((data)=>{
                return data.json();
            });
            yield put({"type":"fetchCarData_sync",cars,total})
        }

    }
}






















