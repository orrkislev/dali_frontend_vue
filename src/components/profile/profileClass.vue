<script setup>
import { ref } from 'vue';
import ButtonSmall from '../ButtonSmall.vue';
import useAPI from 'src/utils/useAPI';

const api = useAPI()
const emit = defineEmits(['change'])

const props = defineProps({
    name: {type:String, default: ''},
    val: {type:String, default: ''},
    edit: {type:Boolean, default: false},
    button: {type:Boolean, default: false},
    inedit: {type:Boolean, default: false},
})

const schoolClasses = ref(null);
const newId = ref(null);
async function getClassesList(){
  const res =await api.post('students/update_class/',{ 'stage':'start','reason':'user_initiated'})
  schoolClasses.value  = res.schoolClasses
}

</script>
<template>
    <div class="flex p-2">
      <div class="titleValueDiv">
        <div class="w-4 mybold">{{ name }}:</div>
        <span style="margin-left:1em;">{{ val }}</span>
      </div>
      <div class="buttonsDiv">
        <ButtonSmall v-if="button && !inedit" @click="inedit=true;getClassesList()" :primary="true" :border="true" :selected="true">שינוי</ButtonSmall>
        <ButtonSmall v-if="inedit" @click="edit=false;inedit=false;newVal=val;schoolClasses=null" :primary="true" :border="true" :selected="true">ביטול</ButtonSmall>
      </div>  
      
    </div>
    <div v-if="schoolClasses && inedit" class="changeClassDiv">
        <br/>
        <span class="instructionText"> בחרו כיתה מרשימת הכיתות של בית הספר:</span><br/><br/>
        <div v-for="sc in schoolClasses">
          <input  type='radio' name="newId" :value="sc.id" :checked="sc.name==val" @click="newId=sc.id"/>{{ sc.name }}<br/>
        </div>
        <br/>
        אם הכיתה עדיין לא ברשימה - אנא פנו למורה.<br/>
        <ButtonSmall v-if="newId" @click="emit('change', newId);inedit=false;newId=null" :primary="true" :border="true" >שמירה</ButtonSmall>
      </div>
</template>

<script>
export default {
name:'ProfileClass'
};
</script>

<style>
.changeClassDiv{border:1px solid #3a7fce;border-radius: 10px;padding:2em;display:table;}
</style>


