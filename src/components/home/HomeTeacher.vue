<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAPI from '../../utils/useAPI';
import useAuth from '../../utils/useAuth';

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
    <div v-if="auth.userData.status == 'no_class'">
        <div class="text-center">
            <div class="text-4xl">לא נמצאה כיתה לך</div>
            <div style="margin-top:-1em;">נצטרך להגדיר כיתה לך</div>
        </div>
    </div>
    <div v-else-if="auth.userData.status == 'no_students'">
        <div class="text-center">
            <div class="text-4xl">לא נמצאו תלמידים לכיתה לך</div>
            <div style="margin-top:-1em;">נצטרך להגדיר תלמידים לכיתה לך</div>
        </div>
    </div>
    <div v-else-if="auth.userData.status == 'no_tasks'">
        <div class="text-center">
            <div class="text-4xl">לא נמצאו משימות לכיתה לך</div>
            <div style="margin-top:-1em;">נצטרך להגדיר משימות לכיתה לך</div>
        </div>
    </div>
    <div class="home-teacher" v-else-if="data">
        <DataTable :value="data" stripedRows showGridlines class="p-datatable-sm cursor-pointer" autoLayout rowHover @row-click="rowClick($event)">
            <Column field="className" header="כיתה" bodyClass="text-right p-2"> </Column>
            <Column field="teachers_1" header="מורה 2" bodyClass="text-right p-2"> </Column>
            <Column field="teachers_2" header="מורה 3" bodyClass="text-right p-2"> </Column>
            <Column field="games" header="משימות" bodyClass="text-right p-2"> </Column>
            <Column field="students" header="תלמידים" bodyClass="text-right p-2"> </Column>
            <Column field="plays" header="משחקים" bodyClass="text-right p-2"> </Column>
            <Column field="publish" header="פורסמו" bodyClass="text-right p-2"> </Column>
        </DataTable>
    </div>
</template>

<script>
export default {
    name: 'HomeTeacher',
}
</script>

<style>
</style>