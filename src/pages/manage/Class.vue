<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useAPI from 'src/utils/useAPI';
import useAuth from 'src/utils/useAuth';
import PageTitle from 'src/components/PageTitle.vue';
import TeacherActionSection from 'src/components/TeacherActionSection.vue';
import AjaxViewer from '../../components/AjaxViewer.vue';

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const api = useAPI()

// if (!auth.isTeacherOrStaff) router.push("/");

const data = ref({})
api.post_json('teachers/class_data/', { class_id: route.params.classid }).then(res => {
    console.log(res)
    data.value = res
})

const displayDialog = ref(false)
const popUpData = ref("")
const popUpHeader = ref("")
async function report_tasks() {
    
    displayDialog.value = true
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

    // load the report
    const res = await api.post('statistics/teacher_report/', { class_id: route.params.classid, report_type: 'class', dialog_title_text: "" })
    popUpData.value = res
    popUpHeader.value = 'דוח משימות'
}
async function report_exams() {
    displayDialog.value = true
    const res = await api.post('statistics/teacher_report/', { class_id: route.params.classid, report_type: 'exams', dialog_title_text: "" })
    popUpData.value = res
    popUpHeader.value = 'דוח בחנים'
}
async function report_state() {
    displayDialog.value = true
    const res = await api.post('statistics/teacher_report/', { class_id: route.params.classid, report_type: 'full_diagnostics', dialog_title_text: "" })
    popUpData.value = res
    popUpHeader.value = 'דוח מצב'
}
async function tasks() {
    displayDialog.value = true
    const res = await api.post('statistics/teacher_report/', { class_id: route.params.classid, report_type: 'tasks', dialog_title_text: "" })
    popUpData.value = res
    popUpHeader.value = 'משימות'
}
async function students() {
    displayDialog.value = true
    const res = await api.post('statistics/teacher_report/', { class_id: route.params.classid, report_type: 'students', dialog_title_text: "" })
    popUpData.value = res
    popUpHeader.value = 'תלמידים'
}

function closeDialog() {
    popUpData.value = ""
}

</script>


<template>
    <div>
        <PageTitle :title="data?.name" />

        <Dialog :header=popUpHeader v-model:visible="displayDialog" :style="{ width: '70vw' }" modal @hide="closeDialog">
            <ProgressSpinner v-if="popUpData.length==0" style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>'
            <AjaxViewer :htmlWithScripts="popUpData" />
        </Dialog>

        <TeacherActionSection title="דוח משימות" subtitle="דוח של משימות"
            text="לכל תלמיד/ה מוצגת התוצאה הטובה ביותר שפרסם/פרסמה בכל משימה." action_label="פתח"
            @click="report_tasks" />
        <TeacherActionSection title="דוח בחנים" subtitle="דוח של בחנים" text="בטבלה מוצגים כל הבחנים שניתנו לכיתה."
            action_label="פתח" @click="report_exams" />
        <TeacherActionSection title="דוח מצב" subtitle="דוח של המצב" text="מה המצב וכל זה" action_label="פתח"
            @click="report_state" />
        <TeacherActionSection title="פירוט משימות" subtitle="פירוט של המשימות" text="איזה משימות יש וכל זה"
            action_label="פתח" @click="tasks" />
        <TeacherActionSection title="רשימת תלמידים" subtitle="רשימה של התלמידים" text="איזה תלמידים יש וכל זה"
            action_label="פתח" @click="students" />

    </div>
</template>


<script>
export default {
    name: 'Class'
};
</script>


<style>
</style>