<script setup>
import { ref } from 'vue';
import useAPI from 'src/utils/useAPI';
import { dali_internal_url } from "src/utils/useAPI";

import ActionButton from '../ActionButton.vue';

const api = useAPI()

const props = defineProps({
  questions_list: {},
  game_name: '',
  game_id: 0,
  class_id: 0,
  })

const quest_data = ref({})
const  quest_id = ref(0)
const displayQuestDialog = ref(false)

async function singleQuestSelected(event) {
  console.log('selected question ' + event.data.quest + ",id=" + event.data.quest_id);
  quest_id.value = event.data.quest_id;
  const res = await api.post('statistics/questiondetails/',{'id':event.data.quest_id});
  quest_data.value = res
  displayQuestDialog.value = true
}
function closeSingleQuestReport(){
  quest_id.value = 0
  displayQuestDialog.value = ref(false)
}

function open_question(id) {
  let url = dali_internal_url + "#/qadmin/" + id;
  window.open(url,'_target')
}

</script>

<template>
  <div>
  <h2>{{ game_name }}</h2>
    <DataTable :value="questions_list" class="p-datatable-sm" stripedRows showGridlines selectionMode="single" @rowSelect="singleQuestSelected">
        <ColumnGroup type="header">
            <Row>
              <Column header="נתוני שאלה" :colspan="2" class="centerdiv"/>
              <Column header="כיתה" :colspan="4" class="centerdiv"/>
              <Column header="כלל המשתמשים" :colspan="1" class='text-right' />
            </Row>
            <Row>
              <Column header="שאלה" field="quest"/>
              <Column header="רמת קושי"/>
              <Column header="מספר פעמים"/>
              <Column header="תשוובת נכונות"/>
              <Column header="תשובות שגויות"/>
              <Column header="% הצלחה" sortable />
              <Column header="% הצלחה" sortable />
            </Row>
        </ColumnGroup>
        <Column  class='text-right'>
            <template #body="slotProps">
                <span :class="{
                    quest_success : slotProps.data.total_class > 0 && slotProps.data.perc_class > 60,
                    quest_failure : slotProps.data.total_class > 0 && slotProps.data.perc_class < 40,
                    }">{{ slotProps.data.quest }}</span>
            </template>
        </Column> 
        <Column field="level" />
        <Column field="total_class"/>
        <Column field="correct_class"/>
        <Column field="incorrect_class"/>
        <Column>
            <template #body="slotProps">
                <span :class="{
                    quest_success : slotProps.data.total_class > 0 && slotProps.data.perc_class - 5  > slotProps.data.perc_all,
                    quest_failure : slotProps.data.total_class > 0 && slotProps.data.perc_class + 5  < slotProps.data.perc_all,
                    }">{{ slotProps.data.perc_class }}</span>
            </template>
        </Column>
        <Column>
            <template #body="slotProps">
                <span :class="{
                    quest_success : slotProps.data.total_class > 0 && slotProps.data.perc_class - 5  > slotProps.data.perc_all,
                    quest_failure : slotProps.data.total_class > 0 && slotProps.data.perc_class + 5  < slotProps.data.perc_all,
                    }">{{ slotProps.data.perc_all }}</span>
            </template>
        </Column>
    </DataTable>
    <Dialog v-if="displayQuestDialog" v-model:visible="displayQuestDialog" @hide="closeSingleQuestReport" :title="'דוח לשאלה בודדת'">
      <h2>{{ quest_data.quest[0].text }}</h2>
      <DataTable :value="quest_data.q_array">
        <Column v-for="col of quest_data.q_array" :key="col.field" :field="col.field" :header="col"></Column>
      </DataTable>
        <span v-if="quest_data.q_array.length > 0">  
      {{  quest_data.q_array }}</span>
      <span v-else>
        תלמידים בכיתה עדיין לא ענו על השאלה<br/>
        ולכן אין עדיין מידע עבורה
      </span>
      <br/>
      <div class="centerdiv" style="display:flex;margin-top:30px;">
        <action-button  :main="true" :border="true" :center="true" @click="open_question(quest_id)">צפיה בשאלה המלאה</action-button>
      </div>
    </Dialog >
</div>
</template>

<script>
export default {
    name: 'questReport',
}
</script>