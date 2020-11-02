/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-29 21:34:03
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-29 22:19:30
 */
export default {
    //更新最小时间与最大时间
    upExtremeTime(state,ExtremeTime) { 
        state.maxTime = ExtremeTime.maxTime
        state.minTime = ExtremeTime.minTime
    },
    //更新当前时间范围
    upTimeRange(state,timeRange) {
        state.timeRange = timeRange
    }
}