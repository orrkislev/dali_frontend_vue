<script setup>
import { ref } from 'vue';
import ButtonSmall from '../ButtonSmall.vue';


const props = defineProps({
    name: {type:String, default: ''},
    val: {type:String, default: ''},
    edit: {type:Boolean, default: false},
    button: {type:Boolean, default: false},
    inedit: {type:Boolean, default: false},
})

const newVal = ref(props.val)
const emit = defineEmits(['change', 'click'])

</script>


<template>
    <div class="flex p-2">
        <div class="titleValueDiv">
            <div class="w-4 mybold">{{ name }}:</div>
            <div v-if="edit">
                <input type="text" v-model="newVal" />
            </div>
            <span v-else style="margin-left:1em;">{{ val }}</span>
        </div>
        <div class="buttonsDiv">
            <ButtonSmall v-if="button && !inedit" @click="edit=true;inedit=true" :primary="true" :border="true" :selected="true">שינוי</ButtonSmall>      
            <ButtonSmall v-if="newVal != val" @click="emit('change', newVal);edit=false" :primary="true" :border="true" >שמירה</ButtonSmall>
            <ButtonSmall v-if="inedit" @click="edit=false;inedit=false;newVal=val" :primary="true" :border="true" :selected="true">ביטול</ButtonSmall>
        </div>            
    </div>
</template>

<script>
export default {
name:'ProfileSection'
};
</script>

<style>
.titleValueDiv{width:40%;display:flex;}
.buttonsDiv{display:flex;}
.mybold {font-weight:500;}

</style>