<script setup>

const props = defineProps({
    score: {type:Number, default:0},
    max: {type:Number, default: 100},
    size: {type:Number, default: 80},
    strokeWidth: {type:Number, default: 14},
    mycolor: {type:String, default:"var(--surface-border, LightGray)"},
})

console.log('ggg')
let calcMax = Math.max(props.score,props.max)

if (props.score = NaN) {
    calcScore = 0
    calcMax = 0
}
let scoreColor = "#e94f5b" 
if (props.score > 60) scoreColor = "var(--primary-color)" 

</script>

<template>
<div>
    <Knob :modelValue="score" :min="0" :max="calcMax" disabled :size="size" :valueColor="scoreColor" :strokeWidth="strokeWidth" :rangeColor="mycolor"/>
</div>
</template>


<script>

export default {
name:'daliKnob'
};

</script>

<style>

</style>