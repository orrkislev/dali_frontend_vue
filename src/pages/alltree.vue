<script setup>
import { ref } from 'vue';
import useAPI from "src/utils/useAPI";
import useBrowseManager from "src/utils/useBrowseManager";
import DaliWait from 'src/utils/DaliWait.vue'
import { real_url } from "src/utils/useAPI";


const browseManager = useBrowseManager();
const api = useAPI();
const data = ref(null);
const allkeys = ref(null);

api.post("tasks/full_task_tree/", {}).then(res=> {
  console.log('ddd')
  let keys = {}
  for (let d in res) {
    keys[res[d]['key']]=true
    for (let sd in res[d]['children'])
      keys[res[d]['children'][sd]['key']]=true
  }
  data.value = res
  allkeys.value = keys
});

</script>

<template>
  <div id="alltree_div" style="width:48%;">
    <TreeTable v-if="data" v-model:expandedKeys="allkeys" :value="data">
      <Column  header="מצב" expander>
        <template #body="slotProps">
          <img :src="getStatImg(slotProps)" role="button" aria-describedby="a2" tabindex="0">
        </template>
      </Column>
      <Column field="name" header="Name" >
        <template #body="slotProps">
          <span :class="getNameClass(slotProps)">{{  slotProps.node.data.name }}</span>
        </template>
      </Column>
      <Column  header="הצלחה" >
        <template #body="slotProps">
          <span :class="getStatClass(slotProps)"> {{slotProps.node.data.score}} / {{slotProps.node.data.target}} </span>
        </template>
      </Column>
    </TreeTable>
    <DaliWait v-else :title="'רשימת הנושאים תעלה מייד'"></DaliWait>
  </div>
</template>

<script>
export default {
  name: "alltree",
  methods: {
    getStatClass: function(obj){
      console.log('a')
      if (obj.node.key.search('game') > -1) {       
        if (obj.node.data.score == undefined) return 'not_started'
        if (obj.node.data.score > 60)  return 'success'
        return 'failure'
        }
      if (obj.node.data.score == 0) return 'failure'
      if (obj.node.data.score == obj.node.data.target) return 'success'
      return 'failure'
    },
    getStatImg: function(obj){
     let stat = this.getStatClass(obj)
     return real_url + "static/images/stat_" + stat + ".png"
    },
    getNameClass: function(obj){
      if (obj.node.key.search('level1') > -1) return "level1"
      if (obj.node.key.search('level2') > -1) return "level2"
      if (obj.node.data.authorization_type =='summary' ) return 'summary'
      return "game"
    },
  },
};
</script>

<style>
.success{color:green;}
.failure{color:red;}
/*.not_started{color:blue;}*/
div.stat_div{width:15px;}
.level1{font-size:24px;font-weight: bold;}
.level2{font-size: 24px;}
.summary{text-decoration: underline;color:black;}
</style>