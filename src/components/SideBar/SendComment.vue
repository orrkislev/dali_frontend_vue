<script setup>
import { ref } from 'vue';
import useAPI from '../../utils/useAPI';
import useGameManager from '../../utils/useGameManager';
import ButtonSmall from '../ButtonSmall.vue';
import ActionButton from 'src/components/ActionButton.vue';

const props = defineProps({
    showIcon: {type:Boolean, default: false},
    origin:{type:String, default: "sidebar"},
})

const displayDialog = ref(false);
const comment_sent = ref(false);
const comment = ref('');

const api = useAPI();
const gameManager = useGameManager()

async function send_comment(){
    const sendData = { 'text':comment.value,'email':'','quest_id':''}
    if (gameManager.question && gameManager.question.q?.id) sendData.question_id = gameManager.question.q.id
    const res = await api.post('review/comment/', sendData)
    comment_sent.value = true
    comment.value = ""
    setTimeout(()=>displayDialog.value = false ,500)
}
</script>


<template>
    <Dialog header="הערה למנהלי האתר" v-model:visible="displayDialog" :style="{'max-width': '80%'}" modal>
        <!-- form to send a comment to developers, only large textbox and send button -->
        <h3>תודה, נשמח לכל הערה והארה,
            הן כלליות והן הנוגעות לשאלה מסוימת.</h3>
        <div>אנא כתבו את הודעתכם בפירוט, ובסיום לחצו על כפתור 'שליחה'.</div>

        <form @submit.prevent="send_comment">
            <div class="form-group">
                <textarea class="form-control" id="comment" v-model="comment" rows="10" cols="60" style="width:100%"></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">שלח</button>
            </div>
        </form>

        <div v-if="comment_sent">
            <div>ההערה נשלחה בהצלחה.</div>
        </div>
        <div>אפשר לפנות אלינו גם בטלפון: 054-4453400 או במייל: <a href="mailTo:dali.k12.co.il@gmail.com" >dali.k12.co.il@gmail.com</a> </div>
    </Dialog>
    <span v-if="showIcon" @click="()=>displayDialog=true">&#9872; הערה</span>
    <ButtonSmall v-else-if="origin=='question'" :border="true" class="p-button-secondary" style='display:table-cell;' @click="()=>displayDialog=true"> הערה למנהלי האתר </ButtonSmall>
    <div v-else class="sideBarElement sideBarComment" @click="()=>displayDialog=true">
        <span class="text-white" >הערה למנהלי האתר </span>
    </div>
    
</template>


<script>
export default {
name:'SendComment'
};
</script>


<style>
div.sideBarComment{background-color: rgb(57, 102, 114);cursor: pointer;text-align: center; font-size:16px;}
</style>