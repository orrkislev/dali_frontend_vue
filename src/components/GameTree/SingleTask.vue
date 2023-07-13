<script setup>
import { computed } from '@vue/reactivity';
import { real_url } from 'src/utils/useAPI';
import { useRouter } from 'vue-router';
import useAuth from '../../utils/useAuth';
import useBrowseManager from '../../utils/useBrowseManager';
import { propsToAttrMap } from '@vue/shared';
import daliKnob  from '../../utils/daliKnob.vue';


const auth = useAuth()
const props = defineProps({
    task: Object,
    played: Boolean,
    assigned: Boolean,
    exam: { type: Boolean, default: false },
    category: String,
    score: {type:Number , default:0},
    target:Number,
    action:String,
    purpose: String,
  })

const router = useRouter()
const browseManager = useBrowseManager();

let clickAction = goToGamePage
if (props.action == 'ADD_TASK') clickAction = addTask
else if (props.action == 'ADD_EXAM') clickAction = addExam
else if (props.purpose == 'REPORT') clickAction = showReport

function goToGamePage() {
  router.push({
    path: '/game/' + props.task.id,
  })
}

function addTask() {
    if (browseManager.openTasks.tasks.map(t => t.id).includes(props.task.id))
        return
    const d = browseManager.openTasks.more.map(t => t.id)
    const indexOf = d.indexOf(props.task.id)
    if (indexOf != -1) browseManager.openTasks.more.splice(indexOf, 1)
    else browseManager.openTasks.more.push({id:props.task.id,name:props.task.name})
  
}

function addExam(){
    if (browseManager.openExams.exams.map(t => t.id).includes(props.task.id))
        return
    const d = browseManager.openExams.more.map(t => t.id)
    const indexOf = d.indexOf(props.task.id)
    if (indexOf != -1) browseManager.openExams.more.splice(indexOf, 1)
    else browseManager.openExams.more.push({id:props.task.id,name:props.task.name})
}

function showReport()
{

}

const actionToggleIsChecked = computed(() => {
    if (props.action == 'ADD_TASK') 
        return browseManager.openTasks.tasks.map(t => t.id).includes(props.task.id) || browseManager.openTasks.more.map(t => t.id).includes(props.task.id)
    else if (props.action == 'ADD_EXAM') 
        return browseManager.openExams.exams.map(t => t.id).includes(props.task.id) || browseManager.openExams.more.map(t => t.id).includes(props.task.id)
})

</script>

<template>
    <!-- <router-link :to="'/game/' + task.id"> -->
        <div class='task' @click="clickAction"
            :class="{ summary_task: task.authorization_type =='summary' }">
            <div class='flex justify-content-between'>
                <div v-if="action" class='action'>
                <ToggleButton v-if="!purpose=='REPORT'" v-model="actionToggleIsChecked"
                            onIcon="pi pi-check" offIcon="pi pi-times" 
                            class="p-button-sm border-transparent" 
                            :style="{backgroundColor:actionToggleIsChecked ? 'orange' : 'white'}"
                            />
            </div>
                <div class='flex flex-1'>
                    <div v-if="task.domain != 'לשון'" class='task-img' v-bind:style="{backgroundImage: 'url('+real_url+task.icon+')'}"></div>
                    <div v-else-if="task.authorization_type =='summary'" class='task-ribbon'>
                            <div class='task-ribbon-text'>
                                משימת סיכום
                            </div>
                    </div>
                    <div v-if="task.category" class='task-ribbon'>
                            <div class='task-ribbon-text'>
                                {{ task.category }}
                            </div>
                    </div>
                    <div class='task-content'>
                        
                        <div class='task-content-name'>{{ task.name }}</div>
                        <div v-if="purpose!=='REPORT'" class='task-content-bottom'>
                            <div class='task-content-bottom-marker'>
                                <div class='task-content-bottom-marker-circle' v-bind:style="{backgroundColor: played ? 'orange' : 'lightgray' }"></div>
                                {{ played ? 'שיחקתי' : 'לא שיחקתי'}}
                            </div>
                            <div v-if="purpose!=='REPORT'" class='task-content-bottom-marker'>
                                <div class='task-content-bottom-marker-circle' v-bind:style="{backgroundColor: assigned ? 'orange' : 'lightgray' }"></div>
                                {{ assigned ? 'פרסמתי' : 'לא פרסמתי'}}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <daliKnob v-if="!action && auth.username && !auth.isTeacherOrStaff" :score="score" :max="target" :size="80" :strokeWidth="14" :key="task.id"/>
            </div>
        </div>
    <!-- </router-link> -->
</template>

<script>
export default {
  name: "Single Task",
};
</script>

<style>
    .task {
        cursor: pointer;
        background:white;
        border-radius: .5em;
        overflow:hidden;    
        box-shadow: rgba(0,0,0,0.2) 1px 3px 7px;
        position: relative;
        transition: all 150ms ease-in-out;
        padding-left: 2em;
    }
    .summary_task {
        background-color: var(--gray-300);
    }
    
    .task:hover{
        box-shadow: rgba(0,0,0,0.3) 1px 6px 4px;
    }
    .task-img{
        background-size: cover;
        flex:2;
    }
    .task-content{
        flex:5;
        padding: .8em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 1em;
    }
    .task-content-bottom{
        font-size: smaller;
        display: flex;
        gap: 2em;
    }
    .task-content-bottom-marker{
        display: flex;
        gap: 4px;
    }
    .task-content-bottom-marker-circle{
        width: 1em;
        height: 1em;
        border-radius: 999px;
    }
    .task-ribbon{
        position: absolute;
        top: 0px;
        right: 100px;
        width: 50%;
        height: 100%;
        overflow: hidden;
    }
    .task-ribbon-text{
        transform: translateY(45%) translateX(1px) rotate(-45deg);
        margin-top: 20px;
        width: 150%;
        text-align: center;
        background-color: var(--gray-400);
    }
    .task-content-name{
        font-size: larger;
        font-weight: 600;
    }
    .action{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 2em;
    }
</style>