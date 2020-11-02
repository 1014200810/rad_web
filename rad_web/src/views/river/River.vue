<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-19 13:10:15
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 21:22:20
-->
<template>
  <div>
      <div id="tooltip">
      </div>
      <h2 class="title">River</h2>
      <svg id="RiverSvg" width="1680px" height="798"></svg>
  </div>
</template>

<script>
import $ from 'jquery'
import River from 'api/river/River'
export default {
    name: "River",
    props: {
      cFrerange: {
        type: Array
      },
      riverData: {
        type: Array,
        default() { return [] }
      }
    },
    data() {
      return {
        DrawRiver: {}
      }
    },
    mounted() {
      let width = $('#RiverSvg').width()
      let height = $('#RiverSvg').height()    
      this.DrawRiver = new River("#RiverSvg",width,height)
    },
    watch: {
      cFrerange() {
        this.DrawRiver.upProgram(this.cFrerange)
      },
      riverData() {
       // console.log("this is river")
        this.DrawRiver.DateUpData(this.riverData)
        this.DrawRiver.upProgram(this.cFrerange)
      }
    }
}
</script>

<style>
.RiverLine{
   fill:none;
   /*stroke:teal;*/
   stroke-width: 3;
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
</style>