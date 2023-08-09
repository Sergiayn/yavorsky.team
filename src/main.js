import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import mitt from 'mitt'
const emitter = mitt()

window.objectToChunks = function(obj, size) {
    let temp = {}
    let chunks = []
    let chunkSize = size ?? 2
    let amount = chunkSize
    for (var i = 0; i < Object.keys(obj).length; i++) {
        if (i === chunkSize) {
            chunks.push(temp)
            chunkSize += amount
            temp = {}
        }
        temp[ Object.keys(obj)[i] ] = obj[ Object.keys(obj)[i] ]
        if (i === Object.keys(obj).length - 1)
            chunks.push(temp)
    }
    return chunks
}

createApp(App).provide('emitter', emitter).use(store).use(router).use(i18n).mount('#app')
