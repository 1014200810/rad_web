/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-25 12:00:12
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 21:12:56
 */
import * as d3 from 'api/d3.min'
class SVG{
    constructor(id,w,h,margin,option={
        xAxis: "bottom"
    }) {
        this.svg = d3.select(id)
        this.width = w
        this.height = h
        ////console.log("svg_width",this.width)
        ////console.log("svg_height",this.height)
        this.innerWidth = this.width - margin.left - margin.right 
        this.innerHeight = this.height - margin.top - margin.bottom
        ////console.log("innerheight",this.innerHeight)
        this.svg.attr("viewBox",[0,0,this.width,this.height])
        //.attr("preserveAspectRatio","xMinYMin slice")
        this.main_group = this.svg.append("g")
        .attr("transform",`translate(${margin.left},${margin.top})`)
        .attr("viewBox",[0,0,this.innerWidth,this.innerHeight])
        //.attr("preserveAspectRatio","xMinYMin slice")
        if(option.xAxis == "bottom"){
            this.xAxis = this.main_group.append("g").attr("class","x")
            .attr("transform",`translate(0,${this.innerHeight})`)
        }else{
            this.xAxis = this.main_group.append("g").attr("class","x")
        }
        this.yAxis = this.main_group.append("g").attr("class","y")
    }
}
export default SVG