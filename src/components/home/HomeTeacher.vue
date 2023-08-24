<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAPI from '../../utils/useAPI';
import useAuth from '../../utils/useAuth';
import Classes from '../../pages/manage/Classes.vue';

const api = useAPI()
const auth = useAuth()
const data = ref(null)
const router = useRouter()

api.post('teachers/update_classes_dashboard/', {}).then(res => {
    const newData = []
    if (res.classes_list) {
        res.classes_list.forEach(cls=>{
            const row = []
            row.className = cls.class_name
            row.classId = cls.class_id
            row.teachers_1 = cls.teachers2
            row.teachers_2 = cls.teachers3
            row.games = cls.cl_games
            row.students = cls.students_count
            row.plays = cls.last_week_games_count
            row.publish = cls.last_week_publish_count
            newData.push(row)
        })
    }
    data.value = newData
})

function rowClick(event) {
    router.push('/manage/classes/' + data.value[event.index].classId)
}

</script>

<template>
    <div v-if="auth.userData.status == 'no_class' || data?.length==0">
        <div class="text-center">
            <div class="text-2xl">  עדיין אין לך כיתות בשנת הלימודים הנוכחית.<br/></div>
            <div class="text-1xl"> מומלץ להגדיר כיתות / קבוצות לימוד לפני כניסה ראשונה של תלמידים למערכת<br/>
            </div>
            <Classes />
        </div>
    </div>
    <div v-else-if="auth.userData.status == 'no_students'">
        <div class="text-center">
            <div class="text-2xl">עדיין אין לך תלמידים רשומים.</div>
            <br/><br/>
            <div style="margin-top:-1em;"> מומלץ לתת לתלמידים משימה של כניסה ראשונית לאתר - על מנת לא להשקיע בכך זמן בשיעור.<br/>
                <br/>
                לכניסה דרך הזדהות אחידה - שילחו לתלמידים את הקישור לסרטון ההדרכה  
                <button class="p-button-sm p-button-outlined p-button-rounded" value='העתקת קישור' onclick="copy_text_2clipboard('https://www.youtube.com/embed/bDAEJO7VDMI')">העתקת קישור</button><br/><br/>
                <iframe width='400' height='300' src='https://www.youtube.com/embed/bDAEJO7VDMI' frameborder='0' allowfullscreen></iframe>
                <br/>
            </div>
        </div>
    </div>
    <div v-else-if="auth.userData.status == 'no_tasks'">
        <div class="text-center">
            <div class="text-4xl">  לכיתות שלך אין משימות.</div>
            <div style="margin-top:-1em;">  <br/><br/>
                תלמידים שייכנסו לאתר לא ייראו משימות ולא יוכלו לשחק. 
                <br>
                לחצו על  "משימות לכיתות" בתפריט הראשי על מנת לפתוח משימות לכיתות.<br/>
                צפו  
                <a href="javascript:show_video_item('5Acn5BaDMxQ')">בסרטון הדרכה קצר</a>
                כיצד לנהל משימות לכיתות.
                </div>
        </div>
    </div>
    <div class="home-teacher" v-else-if="data">
        <DataTable :value="data" stripedRows showGridlines class="p-datatable-sm cursor-pointer" autoLayout rowHover @row-click="rowClick($event)">
            <Column field="className" header="כיתה" bodyClass="text-right p-2" style="font-weight:bold;"> </Column>
            <Column field="teachers_1" header="מורה 2" bodyClass="text-right p-2"> </Column>
            <Column field="teachers_2" header="מורה 3" bodyClass="text-right p-2"> </Column>
            <Column field="games" header="משימות" bodyClass="text-right p-2"> </Column>
            <Column field="students" header="תלמידים" bodyClass="text-right p-2"> </Column>
            <Column field="plays" header="משחקים" bodyClass="text-right p-2"> </Column>
            <Column field="publish" header="פורסמו" bodyClass="text-right p-2"> </Column>
        </DataTable>
        <div><br/>לחצו על שורה של כיתה על מנת לראות את הדוחות של אותה כיתה.</div>
    </div>
</template>

<script>
export default {
    name: 'HomeTeacher',
}
</script>

<style>
</style>