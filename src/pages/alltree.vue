<script setup>
import { ref } from 'vue';
import useAPI from "src/utils/useAPI";
import { useRouter } from 'vue-router';
import useBrowseManager from "src/utils/useBrowseManager";
import DaliWait from 'src/utils/DaliWait.vue'
import { real_url } from "src/utils/useAPI";
import useGameManager from "src/utils/useGameManager";
import useEmitter from 'src/utils/useEmmiter';
import ActionButton from 'src/components/ActionButton.vue';
import InputText from 'primevue/inputtext';
//import { FilterMatchMode } from 'primevue/api';


const browseManager = useBrowseManager();
const router = useRouter()
const gameManager = useGameManager();
const emitter = useEmitter()

const api = useAPI();
const action_labels = ['המשימות שלי','מאגר מלא']
const filters = ref({'name':"",'global':""})
const current_action = ref(null)
const viewDescription = ref(false)
const gameDescription = ref(null)

api.post("tasks/full_task_tree/", {}).then(res=> {
  console.log('ddd')
  let keys = {}
  for (let d in res) {
    keys[res[d]['key']]=true
    for (let sd in res[d]['children'])
      keys[res[d]['children'][sd]['key']]=true
  }
  current_action.value = 1
  browseManager.allkeys = keys
  browseManager.my_tasks = "אנרג,תא"
  filters.value = {'name':browseManager.my_tasks,'global':""} 
  browseManager.alltree = res
  
});

function goToGamePage(id) {
  router.push({path: '/game/' + id})
}

function switchFilterAction(){
  if (current_action.value  == 0){
    filters.value['name']=browseManager.my_tasks
  }
  else {
    filters.value['name']=""
  }
  current_action.value = 1 - current_action.value
}

function ShowDesrciption(id){
  gameDescription.value = "this is a description for game " + id
  viewDescription.value = id
}

function closeDescription(){
  viewDescription.value = 0
  gameDescription.value = ""
}

</script>

<template>
  <div id="alltree_div">
    <TreeTable v-if="browseManager.alltree.length > 0" v-model:expandedKeys="browseManager.allkeys" :value="browseManager.alltree" :filters="filters" :filterMode="'lenient'">
      <template #header>
        <div class="text-right">
          <div class="p-input-icon-right searchDiv">
            <i class="pi pi-search eyeSearch"></i>
            <InputText class="searchInputText" v-model="filters['global']" placeholder="רישמו מילת חיפוש" autofocus="autofocus"/>
            <ActionButton :center='false' :border="true" @click="switchFilterAction">{{ action_labels[current_action] }}</ActionButton>
          </div>
        </div>
      </template>
      <!--
      <Column  header="מצב" expander>
        <template #body="slotProps">
          <img :src="getStatImg(slotProps)" role="button" aria-describedby="a2" tabindex="0">
        </template>
      </Column>
      -->
      <Column field="name" header="שם" expander>
        <template #body="slotProps">
            <img v-if="isGame(slotProps)" :src="getImgName(slotProps)" style="height:20px;" @click="ShowDesrciption(slotProps.node.data.id)"/>
            <span v-if="isGame(slotProps)" :class="getNameClass(slotProps)" @click="goToGamePage(slotProps.node.data.id)">{{  slotProps.node.data.name }}</span>
            <span v-else :class="getNameClass(slotProps)">{{  slotProps.node.data.name }}</span>
            <div v-if="viewDescription==slotProps.node.data.id">
              {{  gameDescription }}
              <action-button :border="true"  @click="closeDescription" icon="align-right">סגירה</action-button>
            </div>
        </template>
      </Column>
      <Column  header="הצלחה" >
        <template #body="slotProps">
          <span :class="getStatClass(slotProps)"> {{slotProps.node.data.target}} / {{slotProps.node.data.score}} </span>
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
    isGame: function(obj){
      return (obj.node.key.search('game') > -1)
    },
    getStatClass: function(obj){
      if (this.isGame(obj)) {       
        if (obj.node.data.score == undefined) return 'not_started'
        if (obj.node.data.score > 60)  return 'success'
        return 'failure'
        }
      if (obj.node.data.score == 0) return 'failure'
      if (obj.node.data.score == obj.node.data.target) return 'success'
      return 'failure'
    },
    getImgName:function(obj){
     let stat = this.getNameClass(obj)
     return real_url + "static/images/task_" + stat + ".jpg"
    },
    /*
    getStatImg: function(obj){
     let stat = this.getStatClass(obj)
     return real_url + "static/images/stat_" + stat + ".png"
    },
    */
    getNameClass: function(obj){
      if (obj.node.key.search('level1') > -1) return "level1"
      if (obj.node.key.search('level2') > -1) return "level2"     
      if (obj.node.data.authorization_type =='summary' ) return 'summary'
      if (obj.node.data.gameType == 'lesson') return 'lesson'
      return "game"
    },
    isSummary: function(obj){
      if (obj.node.data.authorization_type =='summary' ) return true
      return false
    },
  },
};
</script>

<style>
/*#alltree_div{width:48%}*/
.p-treetable-wrapper{text-align: right !important;}
.p-treetable .p-treetable-tbody > tr > td {border:none;padding: 0px;text-align:right;}/*padding:0.5rem 0 0.5rem 0;*/
.p-treetable .p-treetable-thead > tr > th {text-align:right;}
.success{color:green;}
.failure{color:red;}
/*.not_started{color:blue;}*/
div.stat_div{width:15px;}
.level1{font-size:24px;font-weight: bold;}
.level2{font-size: 24px;margin-right: 20px;}
.game, .summary, .lesson{cursor: pointer;margin-right: 40px;}
/*.summary{
  /*text-decoration: underline;
  color:black;
  background-color: lightgrey;
  }*/
.searchInputText{margin-right:2em; margin-left: 5em;}
div.searchDiv{display:flex;}
.eyeSearch{left:unset !important;}
</style>