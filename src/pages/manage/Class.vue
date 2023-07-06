<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useAPI from 'src/utils/useAPI';
import useAuth from 'src/utils/useAuth';
import PageTitle from 'src/components/PageTitle.vue';
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
    console.log(res)
    data.value = res
})

//const popUpData = ref("")
//const popUpHeader = ref("")
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


function closeDialog() {
    popUpData.value = ""
}

</script>


<template>
    <div>
        <PageTitle :title="data?.name" />

        <Dialog :header=popUpHeader v-model:visible="displayDialog" :style="{ width: '70vw' }" modal @hide="closeDialog">
            <DaliWait v-if="wait" :title="'הדוח יעלה מייד'"></DaliWait>
            <div v-else>
                <ProgressSpinner v-if="popUpData.length==0" style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>'
                <AjaxViewer :htmlWithScripts="popUpData" />
            </div>
        </Dialog>

        <TeacherActionSection title="דוח משימות" subtitle="דוח של משימות"
            text="לכל תלמיד/ה מוצגת התוצאה הטובה ביותר שפרסם/פרסמה בכל משימה." action_label="פתח"
            @click="show_report('class','דוח משימות')" />
        <TeacherActionSection title="דוח בחנים" subtitle="דוח של בחנים" text="בטבלה מוצגים כל הבחנים שניתנו לכיתה."
            action_label="פתח" @click="show_report('exams','דוח בחנים')" />
        <TeacherActionSection title="דוח מצב" subtitle="דוח של המצב" text="מה המצב וכל זה" action_label="פתח"
            @click="show_report('full_diagnostics','דוח מצב')" />
        <TeacherActionSection title="פירוט משימות" subtitle="פירוט של המשימות" text="איזה משימות יש וכל זה"
            action_label="פתח" @click="show_report('tasks','משימות')" />
        <TeacherActionSection title="רשימת תלמידים" subtitle="רשימה של התלמידים" text="איזה תלמידים יש וכל זה"
            action_label="פתח" @click="show_report('students','תלמידים')" />

    </div>
</template>


<script>
export default {
    name: 'Class',
    data: () => ({
        displayDialog: ref(false),
        popUpHeader: '',
        popUpData: {},
        wait: false,
    }),
    methods:
    {
        async show_report(report_type,report_title)
        {
            this.$data.popUpHeader = report_title
            this.$data.displayDialog = true
            this.$data.wait = true
            const res = await this.api.post('statistics/teacher_report/', { class_id: this.route.params.classid, report_type: report_type, dialog_title_text: "" })
            this.$data.popUpData = res
            this.$data.wait = false
            
        },
    }
};

</script>


<style>
</style>