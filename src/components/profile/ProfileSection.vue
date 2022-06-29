<script setup>
import { ref } from 'vue';
import ButtonSmall from '../ButtonSmall.vue';


const props = defineProps({
    name: {type:String, default: ''},
    val: {type:String, default: ''},
    edit: {type:Boolean, default: false},
    button: {type:Boolean, default: false},
})

const newVal = ref(props.val)
const emit = defineEmits(['change', 'click'])

</script>


<template>
    <div class="flex p-2">
        <div class="w-3">{{ name }}</div>
        <div v-if="edit">
            <input type="text" v-model="newVal" />
            <ButtonSmall v-if="newVal != val" @click="emit('click', newVal.value)" :primary="true">שמור</ButtonSmall>
        </div>
        <div v-else>{{ val }}</div>
    </div>
</template>


<script>
export default {
name:'ProfileSection'
};
</script>


<style>
</style>