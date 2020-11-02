/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-25 16:41:52
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 22:00:57
 */
import * as d3 from 'api/d3.min'
import * as d3Array from 'd3-array'
import $ from 'jquery'
import SVG from 'api/SVG'
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
}
  
const format = date=>{
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h;
    let min = date.getMinutes()
    min = min < 10? ('0' + min) : min;
    let sec = date.getSeconds()
    sec = sec < 10? ('0' + sec) :sec
    return h+':'+min+':'+sec;  
}
//const tip = d3tip.tip().attr("class","d3-tip")
//计算多边形的点
class River extends SVG{
    constructor(id,width,height,margin={
        top:30,left:50,right:15,bottom:0
    }){
        super(id,width,height,margin,{xAxis:"top"})
        this.xScale = d3.scaleLinear().range([0,this.innerWidth])
        this.yScale = d3.scaleTime().range([this.innerHeight,0])
        this.River_Line = d3.line().x(d=>this.xScale(d.freq))
        .y(d=>this.yScale(d.time))
                    //增加clipPath 蒙版 
            //蒙版会受到所在元素transform的影响 所以这里为0
        this.svg.append("clipPath").attr("id","stackClip").append("rect")
        .attr("height",this.innerHeight).attr("width",this.innerWidth)
        .attr("x",0).attr("y",0);
        //这个用于线条组
        this.River_Line_Group = this.main_group.append("g").attr("id","River_Line_Group")
        this.River_Polygon_Group = this.main_group.append("g")
        this.AllData = []
        this.groupId = []
        this.MaxBand = 0 
        this.MinBand = Infinity
        this.MaxSnr = 0
        this.MinSnr = Infinity
        this.MaxDbm = 0
        this.MinDbm = Infinity
        //this.svg.call(tip)
    }
    DateUpData(data) {
        this.yScale.domain([data[data.length-1].time,data[0].time])
        let axisLeft = d3.axisLeft(this.yScale).tickFormat(format)
        this.yAxis.transition().duration(500).call(axisLeft)
        //按id分类，且将fred=0数据剥离分段
        //let data_id;
        Array.from(d3Array.group(data,d=>d.id))
        .map(([,d])=>{  //这里的每个d代表一个id的数组 根据状态分类
            let start_cnt = 0
            let end_cnt = 0
            d.forEach((ele,index)=>{
                if(ele.band > this.MaxBand) {
                    this.MaxBand = ele.band
                }
                if(ele.band < this.MinBand &&ele.band!=0) {
                    this.MinBand = ele.band
                }
                if(ele.snr > this.MaxSnr) {
                    this.MaxSnr = ele.snr
                }
                if(ele.snr<this.MinSnr && ele.snr!=0){
                    this.MinSnr = ele.snr
                }
                if(ele.dbm > this.MaxDbm) {
                    this.MaxDbm = ele.dbm
                }
                if(ele.dbm<this.MinDbm && ele.dbm!=0){
                    this.MinDbm = ele.dbm
                }
                if(ele.freq != 0 ) end_cnt++;
                else if(ele.freq==0){
                    if(start_cnt!=end_cnt){
                        this.groupId.push(d.slice(start_cnt,end_cnt))
                        end_cnt++
                        start_cnt = end_cnt
                    }else{
                        end_cnt++;
                        start_cnt = end_cnt
                    }
                }
                if(index==d.length-1){
                    if(ele.freq != 0)
                    this.groupId.push(d.slice(start_cnt,end_cnt))
                }
            })
        })
        //console.log("bandFRE",this.MinBand,this.MaxBand)
        this.AllData = this.groupId.flatMap(d=>d3.pairs(d)) //d是一个数组
        //console.log(this.AllData)
    }
    upProgram(freRange){  //数据集、频率范围
        //let fre_groupId = this.groupId.filter(d=>d)
        this.xScale.domain([freRange[0],freRange[1]])
        let axisTop = d3.axisTop(this.xScale);
        this.xAxis.transition().duration(500).call(axisTop)

        this.River_Line_Group.selectAll(".RiverLine").data(this.groupId).join("path")
        .transition().duration(500)
        .attr("clip-path","url(#stackClip)")
        .attr("class","RiverLine")
        .attr("d",this.River_Line)
        .attr("stroke",d=>{
            if(d[0].state==1) return "green"  //82c247
            else if(d[0].state==2) return "#cac5cb" //7e7d7b
            else if(d[0].state==3) return "yellow"  //fadd55
        })
        let ipColor =  d3.scaleLinear()
        .domain([this.MinDbm, this.MinDbm])
          .range(['#3b7e9d', '#2cd4f9', '#c9fbfb']);

        this.dbmColor = d3.scaleSequential()
        .interpolator(ipColor)
        .domain([this.MinDbm, this.MinDbm])

        this.snrColor = d3.scaleSequential(d3.interpolate('#565656', '#b0b0b0', '#c2c2c2'))
                    .domain([this.MinSnr,this.MaxSnr]), 
        this.drawPolygon(this.River_Polygon_Group, this.AllData, {
            className: 'pl',
            direction: 'left',
            color: (d, i) => {
              return this.dbmColor(d[0].dbm)
            }
          })
        this.drawPolygon(this.River_Polygon_Group, this.AllData, {
            className: 'pr',
            direction: 'right',
            color: (d, i) => {
              return this.snrColor(d[0].snr)
            }
          })
    }   
    drawPolygon(oC, data, options) {
        oC.selectAll(`.${options.className}`)
          .data(data)
          .join("polygon")
          .transition().duration(500)
          .attr("clip-path","url(#stackClip)")
          .attr("class", options.className)
          .attr("fill", options.color)
          .attr("points", (d, i) =>this.getPoints(d[0], d[1], options.direction))
        oC.selectAll(`.${options.className}`).on('mouseover', ([,d]) => {
        showToolTip({x: d3.event.x, y: d3.event.y}, `
            <p>freq: ${d.freq}Mhz</p>
            <p>dbm: ${d.dbm}</p>
            <p>snr: ${d.snr}</p>
            <p>time: ${d.time}</p>
        `)
        })
        .on('mouseout', () => hideToolTip());
    }
    getPoints(node, next, option) {

        /*let scaleBaud = d3.scaleLinear()
                          .domain([this.MinBand, this.MaxBand])
                          .range([8,20]);*/
        let start_x = this.xScale(node.freq-node.band/2)
        let end_x = this.xScale(node.freq + node.band/2)
        let next_start_x = this.xScale(next.freq - next.band/2)
        let next_end_x = this.xScale(next.freq + next.band/2)

        let now_point = option == 'left' ? start_x : end_x;
        let next_point = option == 'left' ? next_start_x : next_end_x;
        let inter = option == 'left' ? -1 : 1;
        return `${now_point}, ${this.yScale(node.time)}
            ${this.xScale(node.freq)+inter}, ${this.yScale(node.time)}
            ${this.xScale(next.freq)+inter}, ${this.yScale(next.time)}
            ${next_point}, ${this.yScale(next.time)}
        `
      }
}
export default River