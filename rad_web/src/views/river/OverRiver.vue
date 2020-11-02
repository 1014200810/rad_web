<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-23 10:52:55
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 21:35:09
-->
<template>
  <div>
      <h2 class="title">OverRiver</h2>
      <svg id="OverRiverSvg" width="1680px" height="130px">

      </svg>
  </div>
</template>

<script>
import OverRiver from 'api/river/OverRiver'
import $ from 'jquery'
export default {
    name: "OverRiver",
    props: {
        OverData: {
            type: Array,
            default() { return [] }
        } 
    },
    data() {
        return {
            freRange: [1280,1300],
            DrawOverRiver: {},
        }
    },
    mounted(){
        let width = $('#OverRiverSvg').width()
        let height = $('#OverRiverSvg').height()   
        console.log(width,height)
        this.DrawOverRiver = new OverRiver("#OverRiverSvg",width,height,this)
    },
    watch: {
        OverData() {
            this.DrawOverRiver.upData(this.OverData,this.freRange,this)
        },
        freRange() {
            console.log(this.freRange)
            this.$emit("upFre",this.freRange)
        }
    },
    methods: {
 
    }
}
</script>

<style>
.title{
    font-size:20px;
    border-bottom:#efef4f solid 1px;
    padding:0px;
    margin:0px;
    color:gray
}
#OverRiver text{
    fill:black;
    stroke: black;
}
#OverRiver .selection{
    fill:black;
    fill-opacity:0.5
}
</style>