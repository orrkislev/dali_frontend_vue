<script setup>
import { ref } from 'vue';
import useAPI from "src/utils/useAPI";
import { useRoute, useRouter } from "vue-router";
import useBrowseManager from "src/utils/useBrowseManager";
import DaliWait from 'src/utils/DaliWait.vue'
import { real_url } from "src/utils/useAPI";
import useGameManager from "src/utils/useGameManager";
import useEmitter from 'src/utils/useEmmiter';
import ActionButton from 'src/components/ActionButton.vue';
import InputText from 'primevue/inputtext';
import useAuth from "src/utils/useAuth";

const auth = useAuth();
const browseManager = useBrowseManager();
const route = useRoute()
const router = useRouter()
const gameManager = useGameManager();
const emitter = useEmitter()

const api = useAPI();
const action_labels = ['המשימות שלי','מאגר מלא']
const filters = ref({'name':"",'global':""})
const current_action = ref(null)
const viewDescription = ref(false)
const gameDescription = ref(null)
const current_tree = ref(null)

let clickAction = goToGamePage
let current_table = null
let obj2map = null
let explanation_text = ref("")
if (route.path == '/manage/tasks') {
  clickAction = addtoTable
  current_table = browseManager.openTasks.tasks
  obj2map = browseManager.openTasks
  explanation_text.value = "לחצו על שמות התרגילים שתרצו לפתוח לכיתה. התרגילים שבחרתם יתווספו לטבלה למעלה ותוכלו לסמן לאילו כיתות תרצו לפתוח אותם."
  }
else if (route.path == '/manage/exams'){
  clickAction = addtoTable
  current_table = browseManager.openExams.exams
  obj2map = browseManager.openExams
  explanation_text.value = "לחצו על שמות התרגילים שתרצו לפתוח כבוחן לכיתה. התרגילים שבחרתם יתווספו לטבלה למעלה ותוכלו לסמן לאילו כיתות תרצו לפתוח אותם."
} 

browseManager.alltree = []
api.post("tasks/full_task_tree/", {}).then(res=> {
  browseManager.allkeys = res['trees_all_keys']
  filters.value = {'global':""} 
  browseManager.alltree = res['full']
  browseManager.mytasks = res['mytasks']
  if (auth.isStudent) {
    current_action.value = 1
    current_tree.value = browseManager.mytasks
  }
  else
  current_tree.value = browseManager.alltree
});

function goToGamePage(node) {
  let route2push = ''
  if (node.type == 'exam')
    route2push = '/exam/' + node.data.id + '/' + node.data.exam_id
  else
    route2push = '/game/' + node.data.id
  router.push({path: route2push})
}

/*
  Support either tasks or exam tables
  The deciusion is made according to the route at the start of the component 
  The relevant browseManager objects are used
  Note: The same functions are also in SingleTask - when we wil use it, better switch to a common function
*/
function addtoTable(node){
  if (node.type == 'lesson')
    return
  if (current_table.map(t => t.id).includes(node.data.id))
      return
  const d = obj2map.more.map(t => t.id)
  const indexOf = d.indexOf(node.data.id)
  if (indexOf != -1) {
    obj2map.more.splice(indexOf, 1)
    node.selected = false
  } else {
      obj2map.more.push({id:node.data.id,name:node.data.name})
      node.selected = true
  } 
}

function switchFilterAction(){
  if (current_action.value  == 0){
    current_tree.value=browseManager.mytasks
  }
  else {
    current_tree.value=browseManager.alltree
  }
  current_action.value = 1 - current_action.value
  viewDescription.value = 0 // Do not show game description
}

function ShowDesrciption(id,type){
  if (viewDescription.value == id) return closeDescription()
  api.post('quest/game_details/',{'game_id':id,'type':type}).then(p => {
    gameDescription.value = p.text
    viewDescription.value = id
  })
}

function closeDescription(){
  viewDescription.value = 0
  gameDescription.value = ""
}

function buttonsWidth() {
  if (browseManager.isMobile) return '100%'
  return '70%'
}

function legendDivClass() {
  if (browseManager.isMobile) return 'legendDivMobile'
  return 'legendDiv'
}

</script>

<template>
  <div id="alltree_div">
    <TreeTable v-if="browseManager.alltree.length > 0" v-model:expandedKeys="browseManager.allkeys" :value="current_tree" :filters="filters" :filterMode="'lenient'">
      <template #header>
        <div class="text-right">
          <div :width="buttonsWidth()" style="float:right;">
            <div v-if="auth.isStudent" class="p-buttonset">
              <Button class="p-button-rounded px-6" :class="[current_action == 0  ? 'p-button-secondary' : '']" @click="switchFilterAction">המשימות שלי</Button>
              <Button class="p-button-rounded" :class="[current_action == 1  ? 'p-button-secondary' : '']" @click="switchFilterAction">מאגר מלא</Button>
            </div>
            <div v-else class="instructionText">{{explanation_text}}</div>
            <div class="p-input-icon-right searchDiv">
              <br/>
              <i class="pi pi-search eyeSearch"></i>
              <InputText class="searchInputText" v-model="filters['global']" placeholder="רישמו מילת חיפוש" autofocus="autofocus"/>
              <action-button :border="true" :center="true" @click="filters['global']=''">ניקוי חיפוש</action-button>
            </div>
          </div>
          <div :class="legendDivClass()">
            <div style="text-decoration:underline;">מקרא</div>
            <img :src="api.staticUrl('images/task_lesson.jpg')" style="height:20px;"/> שיעור<br/>
            <img :src="api.staticUrl('images/task_game.jpg')" style="height:20px;"/> תרגול<br/>
            <img :src="api.staticUrl('images/task_summary.jpg')" style="height:20px;"/> תרגול מסכם<br/>
            <div v-if="auth.isStudent"><img  :src="api.staticUrl('images/task_exam.jpg')" style="height:20px;"/> בוחן<br/></div>
        </div>
        </div>
      </template>
      <Column field="name" :header="auth.isStudent ? 'סוג' : ''" expander class="typeCol">   
        <template #body="slotProps">
            <img v-if="isGame(slotProps)" :src="api.staticUrl('images/task_' + slotProps.node.type + '.jpg')" class="gameImg" @click="ShowDesrciption(slotProps.node.data.id,slotProps.node.type)"/>
        </template>
      </Column>
      <Column field="name" :header="auth.isStudent ? 'שם' : ''" class="nameCol">   
        <template #body="slotProps">
          <span v-if="isGame(slotProps)" :class="['name_game', slotProps.node.type, slotProps.node.selected ? 'selected' :'', getItemClass(slotProps) ]" @click="clickAction(slotProps.node)">{{  slotProps.node.data.name }}</span>
          <span v-else :class="['name_'+slotProps.node.type, slotProps.node.type]">{{  slotProps.node.data.name }}</span>
          <span v-if="auth.isStaff"> ({{slotProps.node.data.id}}) </span>          
          <div v-if="viewDescription==slotProps.node.data.id" class="gameDescriptionArea">
            <div class="gameDescriptionDiv" v-html="gameDescription"></div>
            <div>
              <action-button :border="true" :center="true" @click="closeDescription" icon="align-right">סגירה</action-button>
            </div>
          </div>
        </template>
      </Column>
      <Column  v-if="auth.isStudent" header="הצלחה">
        <template #body="slotProps">
          <span v-if="slotProps.node.type !== 'lesson'" :class="[getStatClass(slotProps), slotProps.node.type]"> {{slotProps.node.data.score}} / {{slotProps.node.data.target}} </span>
        </template>
      </Column>
    </TreeTable>
    <DaliWait v-else :title="'רשימת הנושאים תעלה מייד'"></DaliWait>
  </div>
</template>

<script>
export default {
  name: "alltree",
  data() {
    return {
      }},
  methods: {
    isTask: function(obj){
      return (['game','summary'].indexOf(obj.node.type) > -1)
    },
    isGame: function(obj){
      return (obj.node.key.search('game') > -1)
    },
    getStatClass: function(obj){
      if (this.isGame(obj)) {       
        if (obj.node.data.score == "-") return 'not_started'
        if (obj.node.data.score > 60)  return 'success'
        return 'failure'
        }
      if (obj.node.data.score == 0) return 'failure'
      if (obj.node.data.score == obj.node.data.target) return 'success'
      return 'failure'
    },
    getItemClass: function(obj){
      const route = useRoute()
      if ((obj.node.type=='lesson') && (route.path.indexOf('/manage/') > -1)) 
        return 'lessn_noclick'
      return obj.node.type
    },
  },
};
</script>

<style>
div.p-treetable-wrapper{max-height: 1000px;overflow-y: auto;}
div.p-treetable-header{display:grid;}
.p-treetable-wrapper{text-align: right !important;}
.p-treetable .p-treetable-tbody > tr > td {border:none;padding: 0px;text-align:right;vertical-align: top;}/*padding:0.5rem 0 0.5rem 0;*/
.p-treetable .p-treetable-thead > tr > th {text-align:right;padding:0px}
.p-treetable-tbody > tr > td .p-treetable-toggler {height:1.5em !important;}
th.nameCol{padding-right:2.5em !important;} /* This is the width of the expand arrow */

.success{color:green;}
.failure{color:red;}
/*.not_started{color:blue;}*/
.p-treetable .p-treetable-tbody > tr > td:has(.success){direction:ltr;}
.p-treetable .p-treetable-tbody > tr > td:has(.failure){direction:ltr;}
.p-treetable .p-treetable-tbody > tr > td:has(.not_started){direction:ltr;}

div.stat_div{width:15px;}

.top, .level1{font-size:24px;font-weight: bold;}
.level2{font-size: 20px;font-weight:500}
/*.name_level2{margin-right: 1em;}*/
.game, .summary, .lesson, .exam{cursor: pointer;font-size:16px;}
.name_game{cursor: pointer;}
.lessn_noclick{cursor:unset;}
.selected{background-color: #92c7d5;}

.gameImg{height:20px;vertical-align: middle;cursor: pointer;}

.searchInputText{
  margin-left: 1em;
  border-radius:1em;
  caret-color: auto;
  max-width: 50%;
}

div.searchDiv{display:flex;float:right;clear:right;margin-top:3em;}
div.legendDiv{float:left;}
div.legendDivMobile{float:right;margin-top:0.2em;}
.eyeSearch{left:unset !important;}
div.gameDescriptionDiv{padding-bottom:1em;}
div.gameDescriptionArea{
  margin:2em;
  background-color:var(--surface-100);
  padding: 2em;
}
.nameCol{width:60%;}
.typeCol{display:flex;}
td.typeCol{width:25%;}
th.typeCol{padding-right:20px !important;}
</style>