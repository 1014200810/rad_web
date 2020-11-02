<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-19 11:05:01
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 21:16:04
-->
<template>
<el-container>
    <el-aside width='85vw'>
        <div id="map">
        <div id="tooltip"></div>
        <svg width="100%" height="100%">
        </svg>
        </div>
    </el-aside>
    <el-main width='15vw'>
        <map-select @trackChange="trackUp"></map-select>
    </el-main>
</el-container>
</template>
<script>
import create from 'api/map/Map'
import MapSelect from './MapSelect'
import {upData} from 'api/map/Map'
import * as dataRequest from 'utils/dataRequest'
export default {
    name:"MapPage",
    data(){
        return {
            trackData: []
        }
    },
    components: {
        MapSelect
    },
    mounted() {
        let svg = this.$d3.select("#map").select("svg")
        dataRequest.get_ocean_init().then(results=>{
            create(svg,results[0].data);
            this.trackData = results[1].data
        })
    },
    methods: {
        trackUp(item) {
            //若不活跃 删除数据
            if(!item.isActive) {
                this.trackData = this.trackData.filter(d=>d.id!=item.id)
                console.log(this.trackData)
            }else {
                dataRequest.get_signalOcean(item.id).then(res=>{
                    this.trackData.push(res.data)
                })
            }
        }
    },
    watch: {
        trackData() {
            console.log(this.trackData)
            upData(this.trackData)
        }
    }
}
</script>

<style>
#map{
    height:90vh;
    
}
#tooltip {
	padding: 20px;
	background-color: rgba(50, 50, 50, .8);
	border-radius: 4px;
	font-size: 24px;
	color: #fff;
	position: absolute;
	z-index: 99;
	display: none;
}
.el-container{
  padding:0 20px;
}
</style>