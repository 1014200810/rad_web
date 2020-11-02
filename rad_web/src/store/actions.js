/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-29 21:38:26
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-29 22:11:11
 */
/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-29 21:38:26
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-29 21:49:20
 */
import {get_init} from 'utils/dataRequest' 
export default {
    actionUpExtremeTime(context) {
        return new Promise(resolve=>{
            get_init().then(response=>{
                let ExtremeTime = {'maxTime':new Date(response.data.Time.MaxTime*1000),
                                   'minTime':new Date(response.data.Time.MinTime*1000)}
                context.commit('upExtremeTime',ExtremeTime)
                resolve(ExtremeTime)
            })
        })
    }
}