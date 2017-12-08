export default {
    namespace:"picshow",
    state:{
        "nowcolor":0,//当前颜色
        "nowtype":0,//当前类型
        "nowidx":0,//当前图片的序列号
        "colors":[],//颜色数组
        "types":[],
        "data":{}
    },
    reducers:{
        init_sync(state,{data}){
            //该类型车的颜色的数组

            var colorarr=Object.keys(data.colors);
            console.log(data.colors);
            console.log(colorarr);
            var types=[];
            if (Object.keys(data.colors[colorarr[0]].types).includes("view")){
                types.push("view");
            }
            if (Object.keys(data.colors[colorarr[0]].types).includes("center")){
                types.push("center");
            }
            if (Object.keys(data.colors[colorarr[0]].types).includes("detail")){
                types.push("detail");
            }
            return {
                ...state,
                data,
                colors:colorarr,
                types:types
            }
        },
        //切换类型
        changetype(state,{typename}){
            return {
                ...state,
                "nowtype":state.types.indexOf(typename),
                "nowidx":0
            }
        },
        //改变颜色
        changecolor(state,{n}){
            var colorarr=Object.keys(state.data.colors);
            //控制type的顺序
            var types=[];
            if (Object.keys(state.data.colors[colorarr[n]].types).includes("view")){
                types.push("view");
            }
            if (Object.keys(state.data.colors[colorarr[n]].types).includes("center")){
                types.push("center");
            }
            if (Object.keys(state.data.colors[colorarr[n]].types).includes("view")){
                types.push("view");
            }
            return {
                ...state,
                types:types,
                nowcolor:n,
                "nowtype":0
            }
        },
        changepic(state,{n}){
            return {
                ...state,
                nowidx:n
            }
        },
        //切换下一张
        gonext(state){
            var types=state.data.colors[state.colors[state.nowcolor]].types;
            var imagearr=types[state.types[state.nowtype]];
            var typeArr=Object.keys(types);
            //图集末尾
            if (state.nowidx+1==imagearr.length){
                if (state.nowtype+1==typeArr.length){
                    var n=state.nowcolor+1;
                    //判断是不是最后一种颜色
                    if (n==Object.keys(state.data.colors).length){
                        return state;
                    }
                    var types=getNewType(state.data,n);
                    return {
                        ...state,
                        nowidx:0,
                        nowtype:0,
                        nowcolor:state.nowcolor+1,
                        types:types
                    }
                }
                return{
                    ...state,
                    nowidx:0,
                    nowtype:state.nowtype+1
                }
            }
            return {
                ...state,
                nowidx:state.nowidx+1
            }
        },
        goprev(state){
            //判断是不是到图集第0张了
            if (state.nowidx==0){
                //判断是不是到改颜色的第一个类型的图集的第0张
                if (state.nowtype==0){
                    //该图集的第一张
                    if (state.nowcolor==0){
                        alert("到头了");
                        return state;
                    }
                    //再切换颜色的时候  需要获取上一个图集的图片张数
                    let types=state.data.colors[state.colors[state.nowcolor-1]].types;
                    let typesArr=getNewType(state.data,state.nowcolor-1);
                    let imagesarr=types[typesArr[typesArr.length-1]];
                    return {
                        ...state,
                        nowtype:typesArr.length-1,
                        nowidx:imagesarr.length-1,
                        nowcolor:state.nowcolor-1,
                        types:typesArr
                    }
                }
                let types=state.data.colors[state.colors[state.nowcolor]].types;
                let imagesarr=types[state.types[state.nowtype]];
                let typesArr=Object.keys(types);
                return {
                    ...state,
                    nowidx:types[state.types[state.nowtype-1]].length-1,
                    nowtype:state.nowtype-1
                }
            }
            return{
                ...state,
                nowidx:state.nowidx-1
            }

        }
    },
    //上一张

    effects:{
        //拉取数据
        init:function* ({cartype},{put}) {
            var data=yield fetch("/api/car/"+cartype).then((data)=>{

                return data.json();
            });
            yield put({"type":"init_sync",data})

        }
    }
}
function getNewType(data,n) {
    var colorarr=Object.keys(data.colors);
    //type顺序控制
    var types=[];
    if (Object.keys(data.colors[colorarr[n]].types).includes("view")){
        types.push("view");
    }
    if (Object.keys(data.colors[colorarr[n]].types).includes("center")){
        types.push("center");
    }
    if (Object.keys(data.colors[colorarr[n]].types).includes("detail")){
        types.push("detail");
    }
    return types;
}