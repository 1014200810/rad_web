<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-26 20:11:31
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-29 22:32:58
-->
<template>
    <el-container>
        <el-main>
            <Spectrogram></Spectrogram>
        </el-main>
    </el-container>
</template>

<script>
import Spectrogram from 'views/spectro/Spectrogram'
export default {
    name: "SpectroPage",
    components: {
        Spectrogram
    },
}
</script>

<style>

</style>