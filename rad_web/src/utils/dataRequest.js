/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-19 12:09:57
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 20:07:50
 */
import instance from './request'
import axios from 'axios'
export function get_init(){
    return instance.get("/get_init")
}
export function get_idSelect(startFre,endFre) {
    return instance.get(`/get_idSelect?startFre=${startFre}&endFre=${endFre}`)
}
export function get_signalOcean(id) {
    return instance.get(`/get_signalOcean?id=${id}`)
}
async function get_Spectrum(time){
    let Spectrum = {};
    await instance.get(`/get_Spectrum?time=${time}`).then(function(response){
        Spectrum=response.data
    })
    return Spectrum
}
function get_allData(startTime,endTime){
    return new Promise(resolve=>{
        let allData = new Array;
        instance.get(`/get_allData?startTime=${startTime}&endTime=${endTime}`).then(response=>{
            allData=response.data
            allData.forEach(e=>{
                e.time = new Date(e.time*1000)
            })
            resolve(allData)
        })
    })
}
export function get_ocean_init() {
    return axios.all([instance.get(`/get_world`),instance.get(`/get_ocean`)])
}

export{
    get_Spectrum,
    get_allData,
}