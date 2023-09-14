<script setup>
import { ref } from 'vue';
import useAPI from '../../utils/useAPI';
import AjaxViewer from '../AjaxViewer.vue';
import { real_url } from "../../utils/useAPI";

const api = useAPI()
const htmlToShow = ref(null)

const URL_PER_BUTTON={
    'school report': 'statistics/schools_stat/',
    'choose school': 'statistics/schools_stat/?purpose=list',
    'school map' : 'static/pages/schools.htm',
    'question report': 'statistics/questionstat/',
    'question success': 'statistics/staff_quest_success/purpose=success',
    'email teachers': 'review/select_autoemail/',
    'signed teachers' : 'statistics/schools_stat/?purpose=CRM',
    'purchased no teachers' :  'statistics/schools_stat/?purpose=CRM_no_teachers',  
}
async function click(btn){
    console.log(btn) 
    let url = real_url + URL_PER_BUTTON[btn]
    window.open(url,'_target')
}
</script>

<template>
        <Divider />
    <div class="grid w-6 mx-auto"  style="column-gap: 0.5em; row-gap: 0.5em;">
        <Button @click="()=>click('school report')" class="col-3 gap-2">דו"ח בתי ספר</Button>
        <Button @click="()=>click('choose school')" class="col-3">בחירת בית ספר</Button>
        <Button @click="()=>click('school map')" class="col-3">מפת בתי ספר</Button>
        <Button @click="()=>click('question report')" class="col-3">מצב שאלות</Button>
        <Button @click="()=>click('question success')" class="col-3">הצלחה בשאלות</Button>
        <Button @click="()=>click('email teachers')" class="col-3">מייל למורים</Button>
        <Button @click="()=>click('signed teachers')" class="col-3">מורים נרשמו</Button>
        <Button @click="()=>click('purchased no teachers')" class="col-3">רכשו ולא נרשמו</Button>
        <!--<AjaxViewer v-if="htmlToShow" :htmlWithScripts="htmlToShow" />-->
    </div>
</template>

<script>
export default {
    name: 'HomeStaff',
}
</script>

<style>
</style>