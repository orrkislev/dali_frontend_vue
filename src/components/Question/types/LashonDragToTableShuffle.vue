<script setup>
import { ref } from "vue-demi";
import { Container, Draggable } from "vue3-smooth-dnd";
import useEmitter from "../../../utils/useEmmiter";
import useGameManager from "../../../utils/useGameManager";

const emitter = useEmitter()
emitter.subscribe('LIFELINE_5050',lifeline_5050)
emitter.subscribe('CHECK_QUESTION', check)
emitter.subscribe('SHOW_ANSWER', showAnswer)

const lists = ref([])
const gameManager = useGameManager()
lists.value[0] = {title:"מחסן",list:gameManager.question.answers.map(answer=>{
    return {text:answer.text, result:null}
})}
//if (!gameManager.question.q.display_template=='lashon_2table_shuffle_hide') // Do not fill the titles - leave them blanks. they will be filled by the student
     //       gameManager.titles = Array(gameManager.question.options.length).fill(0).map(x=>'')

gameManager.question.options.forEach(option => {
    let listValue = {title:option.text,code:option.num, list:[{text:'', result:null}]}
    if (gameManager.question.q.display_template=='lashon_2table_shuffle_hide') 
        var userTitle = '' // Let the user set the title
    else
        var userTitle = option.text
    lists.value.push({title:option.text,code:option.num, list:[{text:'', result:null}],userTitle:userTitle})
});

function onDrop(listIndex, dropResult) {
    const { removedIndex, addedIndex, payload } = dropResult
    if (removedIndex != null) lists.value[listIndex].list.splice(removedIndex, 1)
    if (addedIndex != null) lists.value[listIndex].list.splice(addedIndex, 0, payload)
}

function getChildPayload(listIndex, childIndex) {
    return lists.value[listIndex].list[childIndex]
}

const dropPlaceholderOptions = {
    className: 'drop-preview',
    animationDuration: '150',
    showOnTop: true
}

function lifeline_5050(){
    // TODO
}

async function showAnswer(){   
    // Move each item to its correct location
    for (let item of lists.value) {
        item.userTitle = item.title
    }
    let delayres = await delay(250);
    let list_length = lists.value[0].list.length // This is the length of the loop. We are going to remove items from lists[0] so we need to set the length beforehand
    let current_item=0  // We keep working on that item which is the first in lists[0]. But - if the item is not removed, we will skip to the next one in the list
    for (let i = 0; i<list_length;i++){
        let item = lists.value[0].list[current_item]
        const answer = gameManager.question.answers.find(answer=>answer.text==item.text)
        if (answer.correct > 0 && answer.correct < lists.value.length){ 
            // If the question is not built correctly, we may have words with unknown answer or with 0. 
            // The condition overxomes this case 
            lists.value[answer.correct].list.splice(1, 0, item) // Insert an item at position 1
            lists.value[0].list.splice(current_item,1)          // remove the item in position current_item
            let delayres = await delay(250);
        }
        else 
            current_item+= 1 // We did not remove the first item, so in next iteration, work on the next one
        //console.log('item= ' + item.text)
    }
}

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

function check(){
  let result = 0;
  let required_answers = 0;
  let answerlist = [];
  for (let i=0;i<lists.value.length;i++){
    for (const item of lists.value[i].list){
        const answer = gameManager.question.answers.find(answer=>answer.text==item.text)
        if (!answer) continue;
        const answerListData = { id: answer.id, res: false, val: i}
        if (answer.correct <= 0 || answer.correct >= lists.value.length){ // 0 or lower means that the item should not be draggeed at all. Same goes to an answer which does not exists. If it was, we add 1 to the total required_answers
            if (i !== 0) {
                item.result = "fail" // dragged - failure
                result--
            }
        }
        else{
            required_answers++
            if (lists.value[answer.correct].title == lists.value[i].userTitle){ // we make sure that the text are identical. if this is a "hide", then the title comes from the user. If not - it is a copy of title
                item.result = "success"
                answerListData.res = true
                result++
                } 
            else if (i !== 0) // Do not mark words that were not dragged
                item.result = "fail"
            }
        answerlist.push(answerListData)
    }
  }
  console.log('rsult=' + result + ", required_answers=" + required_answers)
  result = result / required_answers 
  gameManager.submitQuestion({ result, answerlist });
}

</script>


<template>
    <div class="group" v-for="list, listIndex in lists">
        <h3>
            <input v-if="(gameManager.question.q.display_template=='lashon_2table_shuffle_hide') && (listIndex > 0)" type='text' v-model="list.userTitle">
            <span v-else>{{ list.title }}</span>
        </h3>
        <Container 
            group-name="1" 
            drag-class="opacity-ghost" 
            drop-class="opacity-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions" 
            :get-child-payload="(i) => getChildPayload(listIndex, i)"
            @drop="onDrop(listIndex, $event)">
            <Draggable v-for="(item,itemIndex) in list.list" :key="itemIndex" :draggable="item.result!=null">
                <div v-if="item" class="draggable-item" :class="{ 
                    'btnFull-correct': item.result == 'success',
                    'btnFull-wrong': item.result == 'fail'}">
                    {{ item.text }} 
                </div>
            </Draggable>
        </Container>
    </div>
</template>


<script>
export default {
    name: 'lashon_drag_2table_shuffle' 
};
</script>


<style>
.group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 1em;
    border-radius: 1em;
    border: 4px solid #ccc;
}

.dragging {
    background-color: yellow;
}

.opacity-ghost {
    transition: all .18s ease;
    opacity: 0.8;
    transform: rotateZ(-2deg);
    background-color: cornflowerblue;
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
}

.opacity-ghost-drop {
    opacity: 1;
    transform: rotateZ(0deg);
    background-color: white;
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
}

.draggable-item {
    line-height: 50px;
    display: block;
    border: 1px solid rgba(0, 0, 0, .125);
    margin-bottom: 2px;
    margin-top: 2px;
    cursor: move;
    user-select: none;
    border-radius: 0.7em;
    padding: 0.2em 1em;
}
</style>