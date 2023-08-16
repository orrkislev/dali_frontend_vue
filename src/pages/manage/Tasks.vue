<script setup>
import PageTitle from '../../components/PageTitle.vue';
import GameTree from '../../components/GameTree/GameTree.vue';
import alltree from 'src/pages/alltree.vue';
import useAPI from 'src/utils/useAPI';
import useBrowseManager from '../../utils/useBrowseManager';

const api = useAPI()
const browseManager = useBrowseManager()

api.post_json('tasks/tasks_table_data/',{purpose: "tasks_table"}).then(res=>{
    browseManager.openTasks.classes = res.classes_list.map(cls=>{
        return {id:cls.id.toString(), name: cls.name}
    })
    browseManager.openTasks.tasks = Object.values(res.classes_table).map(row=>{
        const dataRow = {"name":row.name, "id":row.id}
        row.list.forEach(l=>dataRow[l.cl_id.toString()] = l.isopen)
        return dataRow
    })
})

function getTableData(){
    const data = [...browseManager.openTasks.tasks]
    browseManager.openTasks.more.forEach(more=>{
        const dataRow = {...more}
        browseManager.openTasks.classes.forEach(cls=>{
            dataRow[cls.id] = false
        })
        data.push(more)
    })
    return data
}

function updateClassTask(class_id,game_id){
    browseManager.openTasks.tasks.forEach(row=>{
        if (row.id==game_id) row[class_id] = !row[class_id]
    })
    api.post_json("tasks/task_class_toggle/",{class_id,game_id,purpose: "tasks_table"}).then(res=>{
        if (browseManager.openTasks.more.map(t=>t.id).includes(game_id)){
            browseManager.openTasks.tasks.push(browseManager.openTasks.more.find(t=>t.id==game_id))
            browseManager.openTasks.more = browseManager.openTasks.more.filter(t=>t.id!=game_id)
        }
        browseManager.openTasks.tasks.forEach(row=>{
            if (row.id==game_id) row[class_id] = res.status
        })
    })
}
</script>


<template>
    <div>
        <PageTitle title="משימות לכיתות" subtitle="המשימות שבחרת לכיתות" />
        <div style="width:65%;">
            <DataTable :value="getTableData()" stripedRows showGridlines class="p-datatable-sm" autoLayout>
                <Column field="name" header="משימה" bodyClass="text-right p-2">
                    <template #body="slotProps">
                        <router-link :to="'/game/'+slotProps.data.id">
                            {{ slotProps.data.name }} 
                        </router-link>
                    </template>
                </Column>
                <Column v-for="header in browseManager.openTasks.classes" :key="header.id" :field="header.id" bodyClass="text-center p-0" headerClass="text-center">
                    <template #header="column">
                        <router-link :to="'/manage/classes/'+column.column.key">
                            {{ browseManager.openTasks.classes.find(cls => cls.id == column.column.key).name }} 
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
        <div class="teacher_section_title">הוספת משימה</div>
        <alltree/>
    </div>
</template>


<script>
export default {
name:'Tasks'
};
</script>


<style>
</style>