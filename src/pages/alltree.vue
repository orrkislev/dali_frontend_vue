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
if (route.path == '/manage/tasks') {
  clickAction = addtoTable
  current_table = browseManager.openTasks.tasks
  obj2map = browseManager.openTasks
  }
else if (route.path == '/manage/exams'){
  clickAction = addtoTable
  current_table = browseManager.openExams.exams
  obj2map = browseManager.openExams
} 

console.log('rerewr')
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
  router.push({path: '/game/' + node.data.id})
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

</script>

<template>
  <div id="alltree_div">
    <TreeTable v-if="browseManager.alltree.length > 0" v-model:expandedKeys="browseManager.allkeys" :value="current_tree" :filters="filters" :filterMode="'lenient'">
      <template #header>
        <div class="text-right">
          <div style="width:70%;float:right;">
            <div v-if="auth.isStudent" class="listSelectDiv">
              <ActionButton :center='false' :border="true" :inactive="current_action=='1'" @click="switchFilterAction">המשימות שלי</ActionButton>
              <ActionButton :center='false' :border="true" :inactive="current_action=='0'" @click="switchFilterAction">מאגר מלא</ActionButton>
            </div>
            <div class="p-input-icon-right searchDiv">
              <br/>
              <i class="pi pi-search eyeSearch"></i>
              <InputText class="searchInputText" v-model="filters['global']" placeholder="רישמו מילת חיפוש" autofocus="autofocus"/>
              <action-button :border="true" :center="true" @click="filters['global']=''">ניקוי חיפוש</action-button>
            </div>
          </div>
          <div class="legendDiv">
            <div style="text-decoration:underline;">מקרא</div>
            <img :src="getImgbyName('lesson')" style="height:20px;"/> שיעור<br/>
            <img :src="getImgbyName('game')" style="height:20px;"/> תרגול<br/>
            <img :src="getImgbyName('summary')" style="height:20px;"/> תרגול מסכם<br/>
            <div v-if="auth.isStudent"><img  :src="getImgbyName('exam')" style="height:20px;"/> בוחן<br/></div>
        </div>
        </div>
      </template>
      <Column field="name" :header="auth.isStudent ? 'שם' : ''" expander class="nameCol">   
        <template #body="slotProps">
            <img v-if="isGame(slotProps)" :src="getImgName(slotProps)" style="height:20px;" @click="ShowDesrciption(slotProps.node.data.id,slotProps.node.type)"/>
            <span v-if="isGame(slotProps)" :class="['name_game', slotProps.node.type, slotProps.node.selected ? 'selected' :'', getItemClass(slotProps) ]" @click="clickAction(slotProps.node)">{{  slotProps.node.data.name }}</span>
            <span v-else :class="'name_'+slotProps.node.type">{{  slotProps.node.data.name }} </span>
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
    getImgName:function(obj){
     return real_url + "static/images/task_" + obj.node.type + ".jpg"
    },
    getImgbyName:function(name){
      return real_url + "static/images/task_" + name + ".jpg"
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
.name_level2{margin-right: 20px;}
.game, .summary, .lesson, .exam{cursor: pointer;}
.name_game{cursor: pointer;margin-right: 40px;}
.lessn_noclick{cursor:unset;}
.selected{background-color: #92c7d5;}
.searchInputText{margin-left: 1em;border-radius:1em;}
div.searchDiv{display:flex;float:right;clear:right;margin-top:3em;}
div.listSelectDiv{display:flex;width:80%;margin: 0 auto;}
div.legendDiv{float:left;}
.eyeSearch{left:unset !important;}
div.gameDescriptionDiv{padding-bottom:1em;}
div.gameDescriptionArea{
  margin:2em;
  background-color:var(--surface-100);
  padding: 2em;
}
</style>