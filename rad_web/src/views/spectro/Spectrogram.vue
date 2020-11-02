<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-19 13:10:10
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-29 22:39:20
-->
<template>
  <div id="Spect">
      <!--<el-button @click="tick">观察</el-button>-->
      <el-row :gutter="20">
        <el-col :span="7">
            <div>
                <el-date-picker
                v-model="signalTime"
                type="datetime"
                placeholder="选择日期时间"
                >
                </el-date-picker>
            </div>
        </el-col>
        <el-col :span="2"><div><el-button  type="primary" @click="signalSelect" >单个</el-button></div></el-col>
        <el-col :span="3" :offset="1"><div><el-button  
            :icon="iconName"
            @click="playPause">{{stop_name}}</el-button></div></el-col>
        <el-col :span="3"><div><el-button  icon="el-icon-refresh" @click="refresh">刷新</el-button></div></el-col>
        <el-col :span="8"><div><span>当前频谱对应时间:{{format(current_time)}}</span></div></el-col>
    </el-row>
      <svg width="100%" height="90%">
      </svg>
  </div>
</template>

<script>
let config = require("api/config")
import * as drawSpectr from 'api/spectro/Spectrogram'
import * as axios from 'utils/dataRequest'
export default {
    name: "Spectrgram",
    computed: {
        timerange() {
            return this.$store.state.timeRange
        },
        maxtime() {
            return this.$store.state.maxTime
        },
        mintime() {
            return this.$store.state.minTime
        }
    },
    data(){
        return {
            Spectrum: {},
            current_time: new Date(config.timeRange[0]),
            stop: false,
            stop_name: "播放",
            signalTime: new Date(),
            iconName: "el-icon-video-play",
        }
    },
    mounted(){
        let svg = this.$d3.select("#Spect").select("svg")
        drawSpectr.create(svg)
        this.stop = 1
        console.log(this.timerange)
        setTimeout(()=>{
            this.current_time = this.timerange[0]
            this.stop_name = "播放"
            this.$options.methods.Signal_Watch(this.current_time)
        },500)
        //this.$options.methods.Signal_Watch(this.timerange[0])
    },
    watch:{
        timerange() {
            this.stop = 1
            console.log(this.timerange)
            setTimeout(()=>{
                this.current_time = this.timerange[0]
                this.stop_name = "播放"
                this.$options.methods.Signal_Watch(this.current_time)
            },500)
        },
        stop() {
            if(this.stop) this.iconName="el-icon-video-play"
            else this.iconName="el-icon-video-pause"
        }
    },
    methods:{
        refresh() {
            this.stop = 1
            setTimeout(()=>{
                this.current_time = this.timerange[0]
                this.stop_name = "播放"
                this.$options.methods.Signal_Watch(this.current_time)
            },500)
        },
        playPause() {
            if(!this.stop){//若此时是暂停状态
                this.stop_name = "播放"
                this.stop = !this.stop
            }else{//若此时是继续状态
                this.stop_name = "暂停"
                this.stop = !this.stop
                this.$options.methods.replay(this);
            }
        },
        format (date) {  
            let y = date.getFullYear();  
            let m = date.getMonth() + 1;  
            m = m < 10 ? '0' + m : m;  
            let d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            let h = date.getHours()
            h = h < 10 ? ('0' + h) : h;
            let min = date.getMinutes()
            min = min < 10? ('0' + min) : min;
            let sec = date.getSeconds()
            sec = sec < 10? ('0' + sec) :sec
            return y + '-' + m + '-' + d + '-'+h+':'+min+':'+sec;  
        },
        signalSelect(){
            //console.log(this.signalTime)
            if(this.signalTime<this.mintime ||this.signalTime>this.maxtime){
                this.$message.error('错误,没有该时间的频谱信息');
            }else{
                this.stop = 1
                setTimeout(()=>{
                    this.current_time = this.signalTime
                    this.stop_name = "播放"
                    this.$options.methods.Signal_Watch(this.current_time)
                },500)
            }
        },
        async replay(that){
            while(that.current_time < that.timerange[1] && !that.stop){
                await axios.get_Spectrum(that.current_time.getTime()).then(d=>{
                    that.Spectrum = d
                })
                await drawSpectr.updata(that.Spectrum)
                that.current_time = new Date(that.current_time.getTime() + 1000);
            }
        },
        Signal_Watch(time){
            axios.get_Spectrum(time.getTime()).then(d=>{
                drawSpectr.updata(d)
            })
        }
    }
}
</script>

<style>
#Spect{
   height:550px;
   border:thin teal solid;
   background-color:black;
   color: white;
}
#MaxSpec{
   fill:none;
   stroke:teal;
   stroke-width: 0.5;
}
#AvgSpec{
   fill:none;
   stroke:red;
   stroke-width: 0.5;
}
#Spectr_yAxis line{
    stroke: white;

}

</style>