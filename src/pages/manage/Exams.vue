<script setup>
import alltree from 'src/pages/alltree.vue';
import { ref } from "vue";
const api = useAPI()

const browseManager = useBrowseManager()

const ready = ref(false)
api.post_json('tasks/tasks_table_data/',{purpose: "exams_table"}).then(res=>{
    ready.value = true
    browseManager.openExams.classes = res.classes_list.map(cls=>{
        return {id:cls.id.toString(), name: cls.name}
    })

    browseManager.openExams.exams = Object.values(res.classes_table).map(row=>{
        const dataRow = {"name":row.name, "id":row.id}
        row.list.forEach(l=>dataRow[l.cl_id.toString()] = l.isopen)
        return dataRow
    })
})

function getTableData(){
    const data = [...browseManager.openExams.exams]
    browseManager.openExams.more.forEach(more=>{
        const dataRow = {...more}
        browseManager.openExams.classes.forEach(cls=>{
            dataRow[cls.id] = false
        })
        data.push(more)
    })
    return data
}

function updateClassTask(class_id,game_id){
    browseManager.openExams.exams.forEach(row=>{
        if (row.id==game_id) row[class_id] = !row[class_id]
    })

    api.post_json("tasks/task_class_toggle/",{class_id,game_id,purpose: "exams_table"}).then(res=>{
        if (browseManager.openExams.more.map(t=>t.id).includes(game_id)){
            browseManager.openExams.exams.push(browseManager.openExams.more.find(t=>t.id==game_id))
            browseManager.openExams.more = browseManager.openExams.more.filter(t=>t.id!=game_id)
        }
        browseManager.openExams.exams.forEach(row=>{
            if (row.id==game_id) row[class_id] = res.status
        })
    })
}
</script>


<template>
    <div>
        <PageTitle title="בחנים לכיתות" subtitle="המשימות שבחרת לתת לכיתות כבוחן מקוון" />
        <div v-if="ready">
            <div v-if="browseManager.openExams.exams.length == 0" class="normalred">
                <br/>
                עדיין לא נבחרו משימות לפתיחה כבוחן מקוון.<br/>
                בחרו משימות מהמאגר ולאחר שהן מתווספות לטבלה לחצו על ה-X במשבצת המתאימה כדי לפתוח את המשימה לכיתה
            </div>
            
            <div style="width:65%;">
                <DataTable :value="getTableData()" stripedRows showGridlines class="p-datatable-sm" autoLayout>
                    <Column field="name" header="משימה" bodyClass="text-right p-2">
                        <template #body="slotProps">
                            <router-link :to="'/game/'+slotProps.data.id">
                                {{ slotProps.data.name }} 
                            </router-link>
                        </template>
                    </Column>
                    <Column v-for="header,i in browseManager.openExams.classes" :key="header.id" :field="header.id" bodyClass="text-center p-0" headerClass="text-center">
                        <template #header="column">
                            <router-link :to="'/manage/classes/'+column.column.key">
                                {{ browseManager.openExams.classes.find(cls => cls.id == column.column.key).name }} 
                            </router-link>
                        </template>
                        <template #body="slotProps">
                            <ToggleButton :modelValue="slotProps.data[header.id]" 
                                onIcon="pi pi-check" offIcon="pi pi-times" 
                                class="p-button-sm border-transparent" 
                                :style="{backgroundColor:slotProps.data[header.id] ? 'orange' : 'white'}"
                                @change = "(e)=>updateClassTask(header.id,slotProps.data.id)"
                                />
                        </template>
                    </Column>
                    
                </DataTable>
            </div>
            <Divider />
        </div>
        <div class="teacher_section_title">הוספת בוחן</div>
        <alltree/>
        <!--<game-tree /> in future - for science. -->
    </div>
</template>


<script>
import PageTitle from '../../components/PageTitle.vue';
import useAPI from 'src/utils/useAPI';
import useBrowseManager from '../../utils/useBrowseManager';
import GameTree from '../../components/GameTree/GameTree.vue';

export default {
name:'Exams'
};
</script>


<style>
</style>