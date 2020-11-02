/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-19 15:01:45
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-27 19:22:46
 */
import * as d3 from 'api/d3.min'
//import * as axios from '../../../utils/dataRequest'
const width = 1600;
const height = 400;
const margin = {top:50,bottom:30,left:30,right:30}
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.bottom - margin.top
const xScale = d3.scaleLinear().range([0,innerWidth]).nice()
const yScale = d3.scaleLinear().range([innerHeight,0]).nice()
let main_group
let xAxis
let yAxis
let svg

const path = d3.line().x((d,i)=>xScale(i))
.y(d=>yScale(d))
function create(svg_test){
    svg = svg_test.attr("viewBox",[0,0,width,height])
    .attr("preserveAspectRatio","xMinYMin meet")
    svg.append("rect").attr("x",width-80).attr("y",0).attr("width",50)
    .attr("height",2)
    .attr("fill","red")
    svg.append("rect").attr("x",width-80).attr("y",20).attr("width",50)
    .attr("height",2)
    .attr("fill","teal")
    svg.append("text").attr("x",width-85).attr("y",0).attr("text-anchor","end")
    .text("MaxSpectrum").attr("fill","white").attr("font-size",15)
    .attr("dy",7)
    svg.append("text").attr("x",width-85).attr("y",20).attr("text-anchor","end")
    .text("AvgSpectrum").attr("fill","white").attr("font-size",15)
    .attr("dy",7)
    main_group = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`)
    xAxis = main_group.append("g")
    .attr("transform",`translate(0,${innerHeight})`)
    .attr("id","Spectr_xAxis")
    yAxis = main_group.append("g")
    .attr("id","Spectr_yAxis")
    main_group.append("path").attr("id","MaxSpec")
    main_group.append("path").attr("id","AvgSpec")
    main_group.append("text").attr("id","spectrTime")
    /*
    main_group.append("circle")
    .attr("cx",innerWidth/2)
    .attr("cy",innerHeight/2)
    .attr("r",innerHeight/2)
    .attr("fill","black")*/
}
async function updata(data){
    const tran = svg.transition()
    .duration(300)
    .ease(d3.easeLinear)
    let data1 = data.MaxSpectr
    let data2 = data.AvgSpectr
    //yScale.domain([0,Math.max(d3.max(data1),d3.max(data2))])
    yScale.domain([150,280])
    xScale.domain([0,data1.length])
    const axisBottom = d3.axisBottom(xScale).ticks(8).tickSize(-innerHeight)
    const axisLeft = d3.axisLeft(yScale).ticks(10).tickSize(-innerWidth)
    yAxis.call(axisLeft)
    xAxis.call(axisBottom)
    main_group.select("#MaxSpec").datum(data1).transition(tran)
    .attr("d",path)
    main_group.select("#AvgSpec").datum(data2).transition(tran)
    .attr("d",path)
    await tran.end();
}
export{
    create,
    updata
}