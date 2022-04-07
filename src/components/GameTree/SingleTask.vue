<script setup>
import { real_url } from '../../utils/useAPI';

</script>

<template>
    <router-link :to="'/game/' + task.id">
        <div class='task'>
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
  },
};
</script>

<style>
    .task {
        cursor: pointer;
        background:white;
        border-radius: .5em;
        height: 6em;
        display: flex;
        overflow:hidden;
        box-shadow: rgba(0,0,0,0.2) 1px 3px 7px;
        position: relative;
    }
    .task-img{
        background-size: cover;
        flex:2
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
    }
    .task-content-bottom-marker{
        display: flex;
        gap: 4px;
        flex:1;
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
</style>