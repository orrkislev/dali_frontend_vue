<script setup>
import PageTitle from '../../components/PageTitle.vue';
const api = useAPI()

const headers = ref([])
const data = ref([])

api.post_json('tasks/tasks_table_data/',{purpose: "tasks_table"}).then(res=>{
    console.log(res)
    res.classes_list.forEach(cls=>{
        headers.value.push({id:cls.id.toString(), name: cls.name})
    })
    Object.values(res.classes_table).forEach(row=>{
        const dataRow = {"name":row.name, "id":row.id}
        row.list.forEach(l=>dataRow[l.cl_id.toString()] = l.isopen)
        data.value.push(dataRow)
    })
})

function updateClassTask(class_id,game_id){
    const newData = [...data.value]
        newData.forEach(row=>{
            if (row.id==game_id) row[class_id] = !row[class_id]
        })
        data.value = newData

    api.post_json("tasks/task_class_toggle/",{class_id,game_id,purpose: "tasks_table"}).then(res=>{
        const newData = [...data.value]
        newData.forEach(row=>{
            if (row.id==game_id) row[class_id] = res.status
        })
        data.value = newData
    })
}
</script>


<template>
    <div>
        <PageTitle title="משימות לכיתות" subtitle="המשימות שבחרת לכיתות" />
        <div style="width:65%;">
            <DataTable :value="data" stripedRows showGridlines class="p-datatable-sm" autoLayout>
                <Column field="name" header="" bodyClass="text-right p-2"></Column>
                <Column v-for="header,i in headers" :key="header.id" :field="header.id" :header="header.name" bodyClass="text-center p-0" headerClass="text-center">
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
    </div>
</template>


<script>
import useAPI from 'src/utils/useAPI';
import { ref } from 'vue';

export default {
name:'Tasks'
};
</script>


<style>
</style>