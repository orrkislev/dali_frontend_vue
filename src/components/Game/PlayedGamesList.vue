<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useAPI from '../../utils/useAPI';

const props = defineProps({
    publishedFirst: { type: Boolean, default: false },
});

const api = useAPI()
const route = useRoute()
const data = ref(null)

watch(props, (newVal, oldVal) => {
    if (newVal.publishedFirst) data.value[0].publish = true
})

onMounted(() => {
    api.post(`statistics/usergamedetails/${route.params.taskid}/`, {}).then((res) => {
        if (res.mygames && res.mygames.length > 0) {
            res.mygames.sort((a, b) => new Date(b.date) - new Date(a.date))
            res.mygames.forEach(game => {
                game.date = new Date(game.date).toLocaleDateString()
            })
            data.value = res.mygames
        }
    })
})

function publish(id) {
    if (!data.value.find(game => game.id == id).publish)
        api.post('statistics/publish/', { id }).then((res) => {
            data.value.find(game => game.id == id).publish = true
        })
}
</script>


<template>
    <Divider v-if="data" />
    <Fieldset legend="המשחקים הקודמים שלי" :toggleable="true" v-if="data">
        <div class="flex justify-content-center">
            <DataTable :value="data" class="w-6">
                <Column field="date" header="תאריך" bodyClass="text-right p-2"> </Column>
                <Column field="score" header="ניקוד" bodyClass="text-right p-2"> </Column>
                <Column field="publish" header="פורסם" bodyClass="text-right p-2">
                    <template #body="slotProps">
                        <ToggleButton v-if="!slotProps.data.publish" :modelValue="slotProps.data.publish" onIcon="pi pi-check" offIcon="pi pi-times"
                            class="p-button-sm border-transparent"
                            :style="{ backgroundColor: slotProps.data.publish ? 'orange' : 'lightblue' }"
                            @change="(e) => publish(slotProps.data.id)" />
                        <i v-else class="pi pi-check" />
                    </template>

                </Column>
            </DataTable>
        </div>
    </Fieldset>
</template>


<script>
export default {
    name: 'PlayedGamesList'
};
</script>


<style>
</style>