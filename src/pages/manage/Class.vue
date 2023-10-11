<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useAPI from 'src/utils/useAPI';
import useAuth from 'src/utils/useAuth';
import PageTitle from 'src/components/PageTitle.vue';
import SingleTask from "src/components/GameTree/SingleTask.vue";
import questReport from 'src/components/Reports/questReport.vue';
import TeacherActionSection from 'src/components/TeacherActionSection.vue';
import AjaxViewer from '../../components/AjaxViewer.vue';
import DaliWait from 'src/utils/DaliWait.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const api = useAPI()

if (!auth.isTeacherOrStaff) router.push("/");
const displayDialog = ref(false)
let popUpHeader = ref('')
let popUpData = ref('')
const game_name = ref("")
const oldReport = ref(false)
const wait = ref(false)
let questions_list = ref([])


const data = ref({})
api.post_json('teachers/class_data/', { class_id: route.params.classid }).then(res => {
    data.value.name = res.name
})

api.post('statistics/teacher_report/', { report_type:'tasks', class_id: route.params.classid ,'purpose':'tasks_list'}).then(res => {
    data.value.games_list = res.games_list
})

async function show_report(report_type,report_title,game_id){
    popUpHeader.value = report_title
    wait.value = true
    displayDialog.value = true
    let params = { class_id: route.params.classid, report_type: report_type}
    if (game_id !== undefined)
        params['game_id']=game_id
    const res = await api.post('statistics/teacher_report/', params)
    popUpData.value = res
    oldReport.value = true
    wait.value = false
}

async function show_question_report(task)
{
    if (!task.use_subj_4quest_list && !task.allow_teacher_review) {
        return show_report('diagnostics','דוח אבחון',task.id)
    }
    console.log('444')
    wait.value = true
    game_name.value = task.name
    popUpHeader.value = 'דוח שאלות'
    displayDialog.value = true
    let params = { class: route.params.classid, game:task.id}
    const res = await api.post('statistics/question_report/', params)
    questions_list.value = res.games_array[0].list
    oldReport.value = false
    wait.value = false
}
function closeDialog() {
    popUpData.value = {}
}

async function report_tasks_init() {
    
    // load google chart script, wait for it to load
    let googleChartsScript = document.createElement('script')
    googleChartsScript.setAttribute('src', 'https://www.gstatic.com/charts/loader.js')
    document.head.appendChild(googleChartsScript)
    await new Promise(resolve => {
        googleChartsScript.onload = () => {
            google.charts.load('current', { 'name': 'visualization', packages: ['corechart', 'table'] });
            resolve()
        }
    })

    // load jquery ui script, wait for it to load
    let jqueryUIScript = document.createElement('script')
    jqueryUIScript.setAttribute('src', 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js')
    document.head.appendChild(jqueryUIScript)
    await new Promise(resolve => {
        jqueryUIScript.onload = resolve
    })
}

onMounted (() => { report_tasks_init(); })

</script>

<template>
    <div>
        <PageTitle :title="data?.name" />

        <Dialog :header=popUpHeader v-model:visible="displayDialog" :style="{ width: '70vw' }" modal @hide="closeDialog">
            <DaliWait v-if="wait" :title="'הדוח יעלה מייד'"></DaliWait>
            <div v-else-if="oldReport">
                <ProgressSpinner v-if="popUpData.length==0" style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>'
                <AjaxViewer :htmlWithScripts="popUpData" />
            </div>
            <questReport v-else :game_name="game_name" :questions_list="questions_list" :class-id="classid" :game_id="game_id" />
        </Dialog>
        <TeacherActionSection title="דוח משימות" 
            text='הדו\"ח מציג עבור כל תלמיד/ה אילו מהמשימות הפתוחות לכיתה ביצע/ה, ומהו הניקוד הטוב ביותר שפרסם/ה בכל משימה'
            action_label="פתיחה"
            @click="show_report('class','דוח משימות')" />
        <TeacherActionSection title="דוח בחנים" 
        text='הדו"ח מציג עבור כל תלמיד/ה אילו מהבחנים הפתוחים לכיתה ביצע/ה, ומהו הניקוד שקיבל/ה בבוחן.'
            action_label="פתיחה" @click="show_report('exams','דוח בחנים')" />
        <TeacherActionSection title="דוח מצב" subtitle="דוח המצב" 
            text='הדו"ח מציג בצורה ויזואלית על פי מפת צבעים (ירוק, צהוב, אדום) את מצב הכיתה אל מול המשימות הפתוחות בהתאם לאחוזי ההצלחה של כל תלמיד בכל משימה'
            action_label="פתיחה"
            @click="show_report('full_diagnostics','דוח מצב')" />
        <TeacherActionSection title="פירוט משימות" subtitle="" 
            text='לאחר בחירה של משימה ניתן לראות את אחוזי ההצלחה של הכיתה בכל אחת מהשאלות בתרגול. שאלות המסומנות באדום הן שאלות בהן רוב הכיתה התקשתה וכדאי לחזור על החומר (ניתן לפתוח את השאלה ולהציגה מתוך הדו"ח).'/>
            <div class="taskListDiv">
                <!--<SingleTask v-for="task in tasks_list" @click="show_question_report(task.game)" class="SingleTasklist"-->
                <SingleTask v-for="task in data?.games_list" @click="show_question_report(task.game)" class="SingleTasklist"
                    :key="task.game.id" :task="task.game" :category="null" :purpose="'REPORT'"/>
            </div>    
        <TeacherActionSection title="רשימת תלמידים"
            text='רשימת התלמידים המשוייכים לכיתה במערכת.'
            action_label="פתיחה" @click="show_report('students','תלמידים')" />
    </div>
</template>


<script>
export default {
    name: 'Class',
};

</script>


<style>
.taskListDiv {display:grid; grid-template-columns:30% 30% 30%;}
.SingleTasklist {margin:10px;}
td:has(.quest_success) {background-color:#ccff91;}
td:has(.quest_failure) {background-color:#ff6161;}
</style>