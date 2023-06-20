<script setup>

const props = defineProps({
    score: {type:Number, default:0},
    max: {type:Number, default: 100},
    size: {type:Number, default: 80},
    strokeWidth: {type:Number, default: 14},
    mycolor: {type:String, default:"var(--surface-border, LightGray)"},
})

let calcScore = 0
let calcMax = 0
let scoreColor = "#e94f5b"

if (props.score !== NaN) {
    calcScore = props.score
    calcMax = Math.max(props.score,props.max)
} 

if (props.score > 60)  scoreColor = "var(--primary-color)" 
//console.log('score=' + props.score + ", calcScore=" + calcScore + ', calcMax=' +calcMax )

</script>

<template>
<div>
    <Knob :modelValue="calcScore" :min="0" :max="calcMax" disabled :size="size" :valueColor="scoreColor" :strokeWidth="strokeWidth" :rangeColor="mycolor"/>
</div>
</template>


<script>

export default {
name:'daliKnob'
};

</script>

<style>

</style>