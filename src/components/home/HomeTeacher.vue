<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAPI from '../../utils/useAPI';
import useAuth from '../../utils/useAuth';
import Classes from '../../pages/manage/Classes.vue';

const api = useAPI()
const auth = useAuth()
const data = ref(null)
const totals = ref(null)
const router = useRouter()

api.post('teachers/update_classes_dashboard/', {}).then(res => {
    const newData = []
    if (res.classes_list) {
        data.value = res.classes_list
        totals.value  = res.totals
    }

   
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
        סיכום מצב הכיתות שלך: <br/><br/>
        <DataTable :value="data" stripedRows showGridlines class="p-datatable-sm cursor-pointer home-teacher" autoLayout rowHover @row-click="rowClick($event)">
            <ColumnGroup type="header">
                <Row>
                    <Column header="כיתה" :rowspan="1" headerClass="text-center headLine"/>
                    <Column header="מספר תלמידים" :rowspan="1" headerClass="text-center headLine"/>
                    <Column header="מעקב משימות" :colspan="5" headerClass="text-center headLine"/>
                    <Column header="מעקב בחנים" :colspan="3" headerClass="text-center headLine"/>
                </Row>
                <Row bodyClass="text-center">
                    <Column header=""  headerClass="text-center secondHead"/>
                    <Column header=""  headerClass="text-center secondHead"/>
                    <Column header="מספר משימות"  headerClass="text-center secondHead"/>
                    <Column header="מספר תרגולים (7 ימים)" headerClass="text-center secondHead"/>
                    <Column header="מספר פרסומים (7 ימים)" headerClass="text-center secondHead"/>
                    <Column header="מספר תרגולים (30 ימים)" headerClass="text-center secondHead"/>
                    <Column header="מספר פרסומים (30 ימים)" headerClass="text-center secondHead"/>
                    <Column header="מספר בחנים" headerClass="text-center secondHead"/>
                    <Column header="בצעו (7 ימים)"  headerClass="text-center secondHead"/>
                    <Column header="בצעו (30 ימים)" headerClass="text-center secondHead"/>
                </Row>
            </ColumnGroup>
            <Column field="class_name" header="כיתה" bodyClass="text-right p-2" style="font-weight:600;"> </Column>
            <Column field="students_count" header="מספר תלמידים" bodyClass="text-center p-2"> </Column>
            <Column field="cl_tasks" header="מספר משימות" bodyClass="text-center p-2"> </Column>
            <Column field="last_week_games_count" header="משחקים" bodyClass="text-center p-2"> </Column>
            <Column field="last_week_publish_count" header="פורסמו" bodyClass="text-center p-2"> </Column>
            <Column field="last_month_games_count" header=" - 30 יום משחקים" bodyClass="text-center p-2"> </Column>
            <Column field="last_month_publish_count" header=" - 30 יום פורסמו" bodyClass="text-center p-2"> </Column>
            <Column field="cl_exams" header="מספר בחנים" bodyClass="text-center p-2"> </Column>
            <Column field="last_week_exams_count" header="בחנים בשבוע האחרון" bodyClass="text-center p-2"> </Column>
            <Column field="last_month_exams_count" header="בחנים בחודש אחרון" bodyClass="text-center p-2"> </Column>
            <ColumnGroup type="footer">
            <Row>
                <Column footer="סך הכל:" footerClass="text-center"/>
                <Column :footer="totals.students_count" footerClass="text-center"/>
                <Column :footer="totals.cl_tasks" footerClass="text-center"/>
                <Column :footer="totals.last_week_games_count" footerClass="text-center"/>
                <Column :footer="totals.last_week_publish_count" footerClass="text-center"/>
                <Column :footer="totals.last_month_games_count" footerClass="text-center"/>
                <Column :footer="totals.last_month_publish_count" footerClass="text-center"/>
                <Column :footer="totals.cl_exams" footerClass="text-center"/>
                <Column :footer="totals.last_week_exams_count" footerClass="text-center"/>
                <Column :footer="totals.last_month_exams_count" footerClass="text-center"/>
            </Row>
        </ColumnGroup>
        </DataTable>
        <div class="instructionText"><br/>לחצו על שורה של כיתה על מנת לראות את הדוחות של אותה כיתה.</div>
    </div>
</template>

<script>
export default {
    name: 'HomeTeacher',
}
</script>

<style>
/*.p-datatable-thead > tr > th {font-weight: 650 !important;}*/
.headLine{background-color: #3a7fce !important; color:white !important;}
th.headLine > div {display:block !important;}
.secondHead{background-color: #f4fafe !important;}
.home-teacher{font-size:14px;}
</style>