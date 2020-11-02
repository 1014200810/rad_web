<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-04 22:21:39
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 20:47:50
-->
<template>
<el-container>
  <el-header height="62px" width="1900px">
      <div class="nav">
        <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#f6f6f6"
        text-color="#000"
        active-text-color="rgb(30,144,255)">
        <el-menu-item index='/RiverMainPage'>河流图</el-menu-item>
        <el-menu-item index='/SpectroPage'>频谱图</el-menu-item>
        <el-menu-item index='/MapPage'>地图</el-menu-item>
        <div id="timeSelect">
          <el-date-picker
          v-model="TimeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary" @click="update">时间更新</el-button>
        </div>
        </el-menu>
      </div>
  </el-header>
  <keep-alive><router-view></router-view></keep-alive>
  
</el-container>
</template>
<script>
let config = require('api/config')
export default {
  name:"App",
  data (){
    return {
      TimeRange: [new Date(config.timeRange[0]),new Date(config.timeRange[1])]
    };
  },
  mounted(){
    this.$store.dispatch('actionUpExtremeTime')
    console.log("current",this.$route)
  },
  methods: {
    update() {  //时间范围判断
        let minTime = this.$store.state.minTime
        let maxTime = this.$store.state.maxTime
        if(this.TimeRange[0]<minTime||this.TimeRange[0]>maxTime){
            Vue.set(this.TimeRange,0,minTime)
            this.$message('超出范围,已自动更改');
        }
        if(this.TimeRange[1]>maxTime||this.TimeRange[1]<minTime){
            Vue.set(this.TimeRange,1,maxTime)
            this.$message('超出范围,已自动更改');
        }
        this.$store.commit('upTimeRange',this.TimeRange)
    },
    handleSelect(key, keyPath) {
      this.$router.replace(key)
    }
  }
}
</script>
<style >
.nav{
  background-color:rgb(255,240,245);
}
#Right{
  margin:0px;
  padding:0px;
}
#timeSelect{
  /*display:flex;*/
  position: fixed;
  top:10px;
  right:80px;
}
</style>