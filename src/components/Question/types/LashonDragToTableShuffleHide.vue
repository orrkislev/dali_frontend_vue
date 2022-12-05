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
gameManager.question.options.forEach(option => {
    lists.value.push({title:"כותרת",list:[{text:'', result:null}]})
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

function showAnswer(){
    // TODO
}

function check(){
  let result = 0;
  let answerlist = [];
  for (let i=0;i<lists.value.length;i++){
    const listOption = gameManager.question.options.find(option => option.text == lists.value[i].title)?.num ?? 1000
   // console.log(listOption)
    for (const item of lists.value[i].list){
        const answer = gameManager.question.answers.find(answer=>answer.text==item.text)
        if (!answer) continue;
        const answerListData = { id: answer.id, res: false, val: i}
        if (answer.correct == listOption){
            item.result = "success"
            answerListData.res = true
            result++
        } else {
            item.result = "fail"
        }
        answerlist.push(answerListData)
    }
  }
  result = result / gameManager.question.answers.length
  gameManager.submitQuestion({ result, answerlist });
}

</script>


<template>
    <div class="group" v-for="list, listIndex in lists">
        <InputText v-model="list.title" class="my-2" />
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
    name: 'LashonDragToTableShuffleHide'
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