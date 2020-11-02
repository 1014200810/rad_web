<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-23 17:52:00
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 20:39:26
-->
<template>
  <div>
    <el-collapse>
      <el-collapse-item title="范围内" name="green">
        <ul class="ui-common">
          <li class="li-common" v-for="item in idGreen" :key=item.id>{{item.id}}</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="带宽在范围内" name="yellow">
        <ul class="ui-common">
          <li class="li-common" v-for="item in idYellow" :key=item.id>{{item.id}}</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="不在范围内" name="gray">
        <ul class="ui-common">
          <li class="li-common" v-for="item in idGray" :key=item.id>{{item.id}}</li>
        </ul>
      </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
import {get_idSelect} from 'utils/dataRequest'
export default {
    name: "RiverRight",
    props: {
      cFrerange: {
        type: Array
      },
    },
    data() {
      return {
        idGreen: [],
        idGray: [],
        idYellow: [],
      }
    },
    created() {
      get_idSelect(this.cFrerange[0],this.cFrerange[1]).then(res=>{
        this.idGreen = res.data.green
        this.idGray = res.data.gray
        this.idYellow = res.data.yellow
      })
    },
    watch: {
      cFrerange() {
        get_idSelect(this.cFrerange[0],this.cFrerange[1]).then(res=>{
          this.idGreen = res.data.green
          this.idGray = res.data.gray
          this.idYellow = res.data.yellow
        })
      }
    },
    methods: {
    }
}
</script>

<style>
.li-common{
  list-style-type: none
}
.ui-common{
  padding:0px
}
</style>