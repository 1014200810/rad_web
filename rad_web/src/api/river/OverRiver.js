/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-23 11:08:07
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 21:33:17
 */
import * as d3 from 'api/d3.min'
import SVG from 'api/SVG'
let config = require("api/config")
const format = date=>{
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h;
    let min = date.getMinutes()
    min = min < 10? ('0' + min) : min;
    let sec = date.getSeconds()
    sec = sec < 10? ('0' + sec) :sec
    return h+':'+min+':'+sec;  
}
class OverRiver extends SVG{
    constructor(id,width,height,vue_component,margin={
        left:50,right:20,top:30,bottom:0
    }){
        super(id,width,height,margin,{xAxis:"top"})
        this.xScale = d3.scaleLinear().domain([config.MaxFreRange[0],config.MaxFreRange[1]])
        .range([0,this.innerWidth])
        this.yScale = d3.scaleTime().range([this.innerHeight,0])
        this.component = vue_component
        this.brush = d3.brushX().extent(
            [[0,0],
            [this.innerWidth,this.innerHeight]]
        )//.move(this.main_group,[[30,0],[80,this.innerHeight]])
        .on("brush end",()=>{
            if(d3.event.type != "end") return;
            this.component.freRange = d3.event.selection.map(this.xScale.invert)
        })
    }
    upData(data){
        let startTime = data[0].time;
        let startAddSe = new Date(data[0].time.getTime()+1000)
        let endTime = data[data.length-1].time;
        this.yScale.domain([endTime,startTime])
        let axisTop = d3.axisTop(this.xScale);
        let axisLeft = d3.axisLeft(this.yScale).tickFormat(format) ;
        this.xAxis.transition().duration(500).call(axisTop)
        this.yAxis.transition().duration(500).call(axisLeft)
        let rect_height = (this.yScale(startAddSe) - this.yScale(startTime))/2
        let new_data = []
        for(let item of data){
            if(item.time.getTime() == startTime.getTime()){
                new_data.push(item)
            }else{
                break;
            }
        }
        let freq;
        let band;
        this.main_group.selectAll(".overRiverRect").data(data).join("rect")
        .classed("overRiverRect",true)
        .attr("x",d=>{
            for(let item of new_data){
                if(item.id == d.id)
                {
                    freq = item.freq
                    band = item.band
                    break;
                }
            }
            return this.xScale(freq-band/2)
        })
        .attr("y",d=>{
            if(d.time.getTime() == startTime.getTime()){
                return this.yScale(d.time)
            }else{
                return this.yScale(d.time)-rect_height-1.3
            }
        })
        .attr("width",d=>{
            for(let item of new_data){
                if(item.id == d.id)
                {
                    freq = item.freq
                    band = item.band
                    break;
                }
            }
            return this.xScale(freq+band/2)- this.xScale(freq-band/2)
        })
        .attr("height",(d,i)=>{
            if(d.time.getTime() == startTime.getTime()){
                return rect_height
            }
            else{
                return rect_height*2 +1.3
            }
        })
        .attr("fill",d=>{
            if(d.state==1) return "#82c247"  //008b00 39b54a
            else if(d.state==2) return "#cac5cb" //7e7d7b
            else if(d.state==3) return "#fadd55"
        })
        this.main_group.call(this.brush)
    }
}
export default OverRiver