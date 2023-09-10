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
              <Column header="שאלה"/>
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
                    }" v-html="slotProps.data.quest"></span>
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
    <Dialog v-if="displayQuestDialog" v-model:visible="displayQuestDialog" @hide="closeSingleQuestReport" :title="'דוח לשאלה בודדת'" style="max-width:50%;">
      <h2 v-html="quest_data.quest[0].text"></h2>
      <DataTable v-if="quest_data.q_array.length > 0" :value="quest_data.q_array">
        <Column field="a_text" header="משפט" class='text-right'>
          <template #body="slotProps">
            <span :class="{quest_success : slotProps.data.option_correct == 1}">{{ slotProps.data.a_text }}</span>
          </template>
        </Column> 
        <Column field="count" header="סה/כ"/>
        <Column field="percent" header="% הצלחה"/>
        <Column v-for="col in quest_data.columns_list" :field=col.val :header=col.name> 
          <template #body="slotProps">
            <span :class="{quest_success : col.val ==slotProps.data.correct || col.val == slotProps.data.correct_text}">{{ slotProps.data[col.val] }}</span>
          </template>  
        </Column>
        <ColumnGroup type="footer">
            <Row>
                <Column footer="סך הכל:" footerClass="text-center"/>
                <Column :footer="quest_data.total"/>
                <Column :footer="quest_data.perc_success"/>
                <column :colspan="quest_data.columns_list.length"/>
            </Row>
        </ColumnGroup>
      </DataTable>
      <span v-else-if="quest_data.total == 0">
        תלמידים בכיתה עדיין לא ענו על השאלה<br/>
        ולכן אין עדיין מידע עבורה
      </span>
      <span v-else>
        בשלב זה, אין פרוט לשאלה מסוג זה<br/><br/>
      </span>
      
      <br/>
      <div class="centerdiv" style="display:flex;margin-top:30px;">
        <action-button  :main="true" :border="true" :center="true" @click="open_question(quest_id)">צפיה בשאלה המלאה</action-button>
        <action-button  :border="true" :center="true" @click="displayQuestDialog=false">סגירה</action-button>
      </div>
    </Dialog >
</div>
</template>

<script>
export default {
    name: 'questReport',
}
</script>

