<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-30 17:44:28
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 21:16:12
-->
<template>
<div id="mapSelect">
    <ul>
        <li v-for="item in idSelect" :key="item.id" 
        :style="{color:drawColor(item)}"
        :class="item.class"
        @click="selectId(item)"
        >{{item.id}}</li>
    </ul>
</div>
</template>

<script>
import {color} from 'api/map/Map'
let config = require('api/config')
export default {
    name: "MapSelect",
    data() {
        return {
            idSelect: []
        }
    },
    created() {
        for(let i = config.idMin; i<=config.idMax;++i){
            if(i<=config.idMin+config.idInitSelectLength-1)
                this.idSelect.push({'id':i,'isActive':true})
            else
                this.idSelect.push({'id':i,'isActive':false})
        }
        console.log("3209",color(3208))
        console.log("3210",color(3210))
        console.log("3211",color(3211))
    },
    methods: {
        selectId(item) {
            item.isActive = !item.isActive
            this.$emit('trackChange',item)
        },
        drawColor(item) {
            if(item.isActive) 
                return color(item.id)
            else
                return 'gray'
        }
    }
}
</script>

<style>
#mapSelect{
    width:10.5vw;
    height:90vh;

}

</style>