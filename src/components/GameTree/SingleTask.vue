<script setup>
import { real_url } from '../../utils/useAPI';

const knobSize = 80
</script>

<template>
    <router-link :to="'/game/' + task.id">
        <div class='task'>
            <div class='flex justify-content-between'>
                <div class='flex flex-1'>
                    <div class='task-img' v-bind:style="{backgroundImage: 'url('+real_url+task.icon+')'}"></div>
                    <div class='task-content'>
                        <div v-if="category" class='task-ribbon'>
                            <div class='task-ribbon-text'>
                                {{ category }}
                            </div>
                        </div>
                        <div class='task-content-name'>{{ task.name }}</div>
                        <div class='task-content-bottom'>
                            <div class='task-content-bottom-marker'>
                                <div class='task-content-bottom-marker-circle' v-bind:style="{backgroundColor: played ? 'orange' : 'lightgray' }"></div>
                                {{ played ? 'שיחקתי' : 'לא שיחקתי'}}
                            </div>
                            <div class='task-content-bottom-marker'>
                                <div class='task-content-bottom-marker-circle' v-bind:style="{backgroundColor: assigned ? 'orange' : 'lightgray' }"></div>
                                {{ assigned ? 'פרסמתי' : 'לא פרסמתי'}}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Knob :modelValue="score" :min="0" :max="target" disabled :size="knobSize" />
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
  name: "Single Task",
  props: {
    task: Object,
    played: Boolean,
    assigned: Boolean,
    exam: { type: Boolean, default: false },
    category: String,
    score: {type:Number , default:0},
    target:Number,
  },
};
</script>

<style>
    .task {
        cursor: pointer;
        background:white;
        border-radius: .5em;
        height: 6em;
        /* display: flex; */
        overflow:hidden;    
        box-shadow: rgba(0,0,0,0.2) 1px 3px 7px;
        position: relative;
        transition: all 150ms ease-in-out;
        padding-left: 2em;
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
        left: 0px;
        width: 50%;
        height: 100%;
        overflow: hidden;
    }
    .task-ribbon-text{
        transform: translateY(-10%) translateX(1px) rotate(-45deg);
        margin-top: 20px;
        width: 150%;
        text-align: center;
        background-color: orange;
    }
    .task-content-name{
        font-size: larger;
        font-weight: 600;
    }
</style>