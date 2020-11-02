<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-26 16:07:06
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 21:22:12
-->
<template>
  <el-container>
    <el-aside width="1680px">
      <OverRiver id="OverRiver" 
      :OverData="riverData" 
      @upFre="upFrerange">
      </OverRiver>
      <River id="River" 
      :riverData="riverData" 
      :cFrerange="freRange">
      </River>
    </el-aside>
    <el-main>
      <RiverRight id="RiverRight"
      :cFrerange="freRange"
      ></RiverRight>
    </el-main>
  </el-container>
</template>

<script>
import config from 'api/config'
import OverRiver from 'views/river/OverRiver'
import River from "views/river/River"
import RiverRight from "views/river/RiverRight"
import * as dataRequest from 'utils/dataRequest'
export default {
  name: "RiverMainPage",
  computed: {
    TimeRange() {
      return this.$store.state.timeRange
    }
  },
  components: {
    River,
    OverRiver,
    RiverRight
  },
  data () {
    return {
      freRange: [config.freRange[0],config.freRange[1]],  //OverRiver产出该数据
      riverData: []  //所有图共用该数据
    }
  },
  methods: {
    upFrerange(data) {  //OverRiver给出的事件 更新范围
      this.freRange = data
    }
  },
  created() {  //创建时 读取默认时间数据
    dataRequest.get_allData(new Date(config.timeRange[0]).getTime()/1000,new Date(config.timeRange[1]).getTime()/1000)
    .then(data=>{
      this.riverData = data;
    })    
  },
  watch: {
    TimeRange() { 
      dataRequest.get_allData(this.TimeRange[0].getTime()/1000,this.TimeRange[1].getTime()/1000)
      .then(data=>{
        this.riverData = data;
      })   
    }
  }
}
</script>

<style>
#River{
  padding:0px;
 /* border:thin solid black;*/
}
#OverRiver{
  padding:0px;
  /*border:thin solid red;*/
}
.el-container{
  padding:0 20px;
}
.el-main{
  margin:0px;
  padding:0px;
}
.el-aside{
  margin:0px;
  padding:0px;
}
#RiverRight{
  margin-left:10px;
  height: 93vh;
}
</style>