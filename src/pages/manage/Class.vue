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

// if (!auth.isTeacherOrStaff) router.push("/");

const data = ref({})
api.post_json('teachers/class_data/', { class_id: route.params.classid }).then(res => {
    data.value.name = res.name
})

api.post_json('tasks/tasks_table_data/', { class_id: route.params.classid ,'purpose':'tasks_list'}).then(res => {
    data.value.class_tasks = res.classes_table
})


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
        <TeacherActionSection title="דוח משימות" subtitle="דוח של משימות"
            text="לכל תלמיד/ה מוצגת התוצאה הטובה ביותר שפרסם/פרסמה בכל משימה." action_label="פתיחה"
            @click="show_report('class','דוח משימות')" />
        <TeacherActionSection title="דוח בחנים" subtitle="דוח של בחנים" text="בטבלה מוצגים כל הבחנים שניתנו לכיתה."
            action_label="פתיחה" @click="show_report('exams','דוח בחנים')" />
        <TeacherActionSection title="דוח מצב" subtitle="דוח של המצב" text="מה המצב וכל זה" action_label="פתיחה"
            @click="show_report('full_diagnostics','דוח מצב')" />
        <TeacherActionSection title="פירוט משימות" subtitle="פירוט של המשימות" text="איזה משימות יש וכל זה" />
            <div class="taskListDiv">
                <SingleTask v-for="task in data?.class_tasks" @click="show_question_report(task.id)" class="SingleTasklist"
                    :key="task.id" :task="task" :category="null" :purpose="'REPORT'">
                    {{ task.name }}
                </SingleTask>
            </div>    
        <TeacherActionSection title="רשימת תלמידים" subtitle="רשימה של התלמידים" text="איזה תלמידים יש וכל זה"
            action_label="פתיחה" @click="show_report('students','תלמידים')" />
    </div>
</template>


<script>
export default {
    name: 'Class',
    data: () => ({
        displayDialog: ref(false),
        popUpHeader: '',
        popUpData: {},
        games_array: {},
        oldReport: false,
        wait: false,
    }),
    methods:
    {
        async show_report(report_type,report_title)
        {
            this.$data.popUpHeader = report_title
            this.$data.wait = true
            this.$data.displayDialog = true
            let params = { class_id: this.route.params.classid, report_type: report_type}
            const res = await this.api.post('statistics/teacher_report/', params)
            this.$data.popUpData = res
            this.$data.oldReport = true
            this.$data.wait = false
        },
        async show_question_report(game_id)
        {
            this.$data.popUpHeader = 'דוח שאלות'
            this.$data.wait = true
            this.$data.displayDialog = true
            let params = { class: this.route.params.classid, game:game_id}
            const res = await this.api.post('statistics/question_report/', params)
            this.$data.oldReport = false
            this.$data.game_name = res.games_array[0].name
            this.$data.questions_list = res.games_array[0].list
            this.$data.wait = false
        },
        closeDialog() {
            console.log('closing')
            this.$data.popUpData = {}
        },
    }
};

</script>


<style>
.taskListDiv {display:grid; grid-template-columns:30% 30% 30%;}
.SingleTasklist {margin:10px;}
td:has(.quest_success) {background-color:#ccff91;}
td:has(.quest_failure) {background-color:#ff6161;}
</style>