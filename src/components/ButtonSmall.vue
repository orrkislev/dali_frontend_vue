<script setup>
import { ref } from 'vue';


const emit = defineEmits(['click'])
const props = defineProps({
    border: {type:Boolean, default: false},
    primary: {type:Boolean, default: false},
    inactive: {type:Boolean, default: false},
    selected: {type:Boolean, default: false},
    narrow: {type:String, default:false},
})

function click(event) {
    if (!props.inactive) emit('click', event)
}
</script>


<template>
    <div v-on:click="click" class='btnSmall' v-bind:class="{ 
            'btnSmall-border': border, 
            'btnSmall-primary':primary,
            'btnFull-selected': selected,
            'btnFull-inactive': inactive,
            'btnFull-narrow' : narrow,
        }" >
        <slot></slot>
    </div>
</template>


<script>
export default {
name:'ButtonSmall'
};
</script>


<style>
.btnSmall{
    cursor: pointer;
    padding: 0.2em 0.5em;
    border-radius: 999px;
    background: white;
    transition: all 150ms ease-in-out;
    max-height: 2em;
}
.btnSmall-border{
    border: 1px solid #DDD;
}
.btnSmall:hover{
    background: #d5d5d5;
}
.btnFull-narrow {
    max-width: 10em;
}
</style>