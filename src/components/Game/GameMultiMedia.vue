<script setup>
import { ref, onBeforeUnmount } from 'vue';
import useGameManager from '../../utils/useGameManager';

const gameManager = useGameManager()
const mediaRef = ref()
const scriptTags = ref([])  

onBeforeUnmount(()=>{
    scriptTags.value.forEach(tag=>document.body.removeChild(tag))
})

const myInterval = setInterval(()=>{
    if (mediaRef.value.innerHTML.length>0){
        loadScripts()
        clearInterval(myInterval);
    }
}, 500)

function loadScripts(){
    gameManager.media.split("<script>").forEach(mediaPart=>{
        const mediaPart_split = mediaPart.split("<"+"/script>")
        if (mediaPart_split.length==2) {
            const scriptTag = document.createElement('script');
            scriptTag.setAttribute('charset', 'utf-8');
            scriptTag.text = mediaPart_split[0]
            document.body.appendChild(scriptTag);
            scriptTags.value.push(scriptTag)
        }
    })
}
</script>


<template>
    <div class='disableButtons' v-html="gameManager.media" ref="mediaRef"></div>
</template>


<script>

export default {
name:'GameMultiMedia'
};
</script>


<style>
</style>