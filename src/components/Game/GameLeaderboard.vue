<script setup>
import { useRoute } from 'vue-router';
import useAPI, { real_url } from 'src/utils/useAPI';
import { ref } from 'vue-demi';

const api = useAPI()
const route = useRoute()

const tabs = ref([])
const activeTab = ref(null)
const tableData = ref(null)

api.post_json(`statistics/leaderboard/start/${route.params.taskid}/0/`, {}).then(res => {
    if (res.school) tabs.value.push({ label: 'בית הספר',  action: 'school' }) // icon: 'pi pi-fw pi-home',
    if (res.classes) {
        res.classes.forEach(cls => {
            tabs.value.push({ label: 'כיתה ' + cls.name,  action: 'class', id: cls.id })
        })
        activeTab.value = 0
        tabChange({ index: 0 })
    }
})



async function tabChange(e) {
    if (tabs.value[e.index].action == 'school') {
        const res = await api.post_json(`statistics/leaderboard/school/${route.params.taskid}/0/`, {})
        tableData.value = res
    } else if (tabs.value[e.index].action == 'class') {
        const res = await api.post_json(`statistics/leaderboard/class_${tabs.value[e.index].id}/${route.params.taskid}/0/`, {})
        tableData.value = res
    }
    tableData.value.type = tabs.value[e.index].action
}

function getIconSrc(icon) {
    return real_url + icon.replace('app/private/', '')
}
</script>


<template>
    <Divider />
    <div class='mt-3' v-if="tabs.length > 0">
        <div class="div_aligh_1em"><!--</div>class='flex align-items-end'>-->
            <h3>טבלת שיאנים</h3>
            <TabMenu :model="tabs" :activeIndex="activeTab" @tab-change="tabChange" />
        </div>
        <DataTable :value="tableData.all" responsiveLayout="scroll" v-if='tableData?.all.length > 0'
            class="p-datatable-sm">
            <Column field="name" header="שם" class='text-right'> </Column>
            <Column field="school" header="כיתה" v-if="tableData.type == 'school'" class='text-right'></Column>
            <Column field="studentIcon" header="דמות" class='text-right'>
                <template #body="slotProps">
                    <img :src="getIconSrc(slotProps.data.studentIcon)" class='h-1rem' />
                </template>
            </Column>
            <Column field="score" header="ניקוד" class='text-right'></Column>
            <Column field="date" header="תאריך" class='text-right'>
                <template #body="slotProps">
                    {{ slotProps.data.date.month }}.{{ slotProps.data.date.day }}
                </template>
            </Column>
        </DataTable>
        <div v-else>
            לא פורסמו תוצאות
        </div>
    </div>
    <div v-else>
        <h3>לא פורסמו תוצאות לטבלת השיאים</h3>
    </div>
</template>


<script>
export default {
    name: 'GameLeaderboard'
};
</script>


<style>
div.div_aligh_1em{margin-right:1em;}
</style>