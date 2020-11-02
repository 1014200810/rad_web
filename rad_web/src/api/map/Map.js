/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-19 17:12:25
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 20:09:38
 */
import * as d3 from 'api/d3.min'
import config from 'api/config'
//import * as d3Array from 'd3-array'
//import $ from 'jquery'
const width = 1600;
const height = 1600;
const margin = {left:30,right:30,bottom:30,top:50};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.bottom - margin.top;
/*
function showToolTip (aPosition, sHtml) {
    let toolTip = $("#tooltip");
    toolTip.html(sHtml);
    toolTip.css({
      "top": aPosition.y,
      "left": aPosition.x
    })
    toolTip.show();
}
  
function hideToolTip () {
let toolTip = $("#tooltip");
toolTip.hide();
}*/
let main_group;
let svg;
const zoom = d3.zoom()
.scaleExtent([1, 100])
.on("zoom", zoomed);
const projection = d3.geoMercator();
//const projection = d3.geoOrthographic();
//const projection = d3.geoStereographic();
//const projection = d3.geoEquirectangular();
//const projection = d3.geoNaturalEarth1();
//const projection = d3.geoTransverseMercator();
const pathGenerator = d3.geoPath().projection(projection);
const mapColor = d3.scaleOrdinal(d3.schemeSet3);
export const color = d3.scaleOrdinal()
  .domain([config.idMin, config.idMax])
  .range(config.d3_category437);
function zoomed() {
    //console.log(d3.event.type); //当前事件形式
    //返回相对位移量与缩放因子
    let t = d3.zoomTransform(main_group.node());
    /*
    *transform.x - 在x-轴上的平移量 tx
    *transform.y - 在y-轴上的平移量 ty
    *transform.k - 缩放因子 k
    */
    //返回经过缩放后的平移坐标和比例
    let trans = d3.zoomIdentity.translate(t.x, t.y).scale(t.k);
    //还能获取缩放后的点的坐标 具体查吧 apply
    //console.log(trans)
    main_group.attr("transform", trans);
    //此方法是大坑 不可用，因为event是相对于svg的 
    //main_group.attr("transform", d3.event.transform);
}
function reset() {
    if(d3.event.target.tagName != "svg") return;
    svg.transition().duration(750).call(
    zoom.transform,
    d3.zoomIdentity
        .scale(1)
        .translate(margin.left,margin.top)
    );
}
let line_path
function create(svg_test,appData) {
    svg = svg_test.attr("viewBox", [0, 0, width, height])
    .attr("preserveAspectRatio","xMinYMin slice")
    .on("click",reset);
    main_group = svg.append("g").attr("class","main_group")
    .attr("transform",`translate(${margin.left},${margin.top})`)
    svg.call(zoom);

    projection.fitSize([innerWidth,innerHeight],appData);

    main_group.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type:"Sphere"}))
    .attr("fill","LightSkyBlue");

    main_group.selectAll(".data_path").data(appData.features,d=>d.properties.SOVEREIGNT)
    .join("path")
    .attr("class","data_path")
    .attr("d",pathGenerator)
    .attr("fill",d=>mapColor(d.properties.SOVEREIGNT))
    .attr("opacity",0.5)
    .attr("stroke-width",1)
    .attr("stroke","black")
    .on("click", clicked)
    .attr("stroke-width",0.5)

    line_path = d3.line().x(d=>{return projection([d.LON,d.LAT])[0]})
    .y(d=>{return projection([d.LON,d.LAT])[1]})

    let trans = d3.zoomIdentity.translate(-8116.459649875271, -4312.415119207606)
    .scale(6.946640450369004);

    main_group.attr("transform", trans);
}
export function upData(data) {
    main_group.selectAll(".ocean_path").data(data).join("path")
    .transition().duration(1000)
    .attr("class","ocean_path")
    .attr("d",d=>line_path(d.data))
    .attr("fill","none")
    .attr("stroke",d=>color(d.id))
    .attr("stroke-width",0.4)
}
function clicked(d) {
    //projection.bound(d) 返回当前path的最小坐标 最大坐标
    if(d3.event.target.tagName == "svg") return;

    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(d);
    //console.log(x0,x1,y0,y1); 
    d3.event.stopPropagation(); //阻止事件分发,防止rest触发
    //console.log(Math.min(8, 0.9 / Math.max((x1 - x0) / innerWidth, (y1 - y0) / innerHeight)));
    //console.log(-(x0 + x1) / 2, -(y0 + y1) / 2);
    svg.transition().duration(750).call(
    zoom.transform,
    d3.zoomIdentity
        .translate(innerWidth / 2, innerHeight / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / innerWidth, (y1 - y0) / innerHeight)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
    );
}

export default create

            
