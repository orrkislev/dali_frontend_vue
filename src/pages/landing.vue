<script setup>
import { useRoute, useRouter } from "vue-router";
import useAuth from '../utils/useAuth';
import Login from "../pages/login.vue";
import DaliWait from 'src/utils/DaliWait.vue'
import idm from 'src/pages/idm.vue';
import ActionButton from 'src/components/ActionButton.vue';
import { ref } from "vue";
import { base_url } from "src/utils/useAPI";
import useAPI from "src/utils/useAPI";


const auth = useAuth()
auth.getUserdata()
const route = useRoute()
const router = useRouter()
const api = useAPI();

const mode = ref("general")
mode.value  = 'general'

function switchmode(new_mode) {
    mode.value = new_mode
}

function gotoscience(){
    window.open(base_url,"_self")
}

function gotoGame(id){
    router.push({path: '/game/' + id})
}
</script>


<template>
    <template v-if="route.path.includes('/gameonly')">
        <div>
            <DaliWait :title="'אנא המתינו'"></DaliWait>
        </div>
    </template>
    <template v-else>
    <img :src="api.newSiteImages('landing-page.png')" style="width:1800px;"/>
    <div id="landing">
        <div class="topTitleDiv">חוויית הוראה ולמידה חדשנית</div>
        <div class="topTextDiv">באמצעות תרגילי שאלות ותשובות באווירה משחקית, בליווי הסברים, חומרי עזר ומשובים מפורטים.</div>
        <div class="orangeTextDiv">
            מערכת דע-לי מספקת דרך חווייתית ומהנה ללימוד ולתרגול בתחומי המדעים לחטיבות הביניים, ולשון לבגרות. תרגול שוטף מבטיח הבנה טובה יותר של החומר ושיפור ההישגים במקצוע.
            המערכת מקלה על המורים ומספקת להם מידע מפורט על ביצועי הכיתה וביצועי כל תלמיד.
        </div>
        <div class="cyanTitleDiv">קצת עלינו</div>
        <div class="cyanTextDiv">
            חברת דע-לי פועלת כעסק חברתי במטרה לשפר את חוויית הלימודים ולהנגיש למורים ולתלמידים חומרים איכותיים ללימוד ולתרגול באווירה משחקית במטרה לעורר עניין וסקרנות ולתרום להבנה ולהפנמה של החומר הנלמד ולשיפור הישגיהם של התלמידים. החברה הוקמה ומופעלת על ידי ותיקי היי-טק שתחום החינוך קרוב לליבם.
            <br/>
            חברת דע-לי פועלת בהצלחה במספר רב של בתי ספר מזה כ-6 שנים. למעלה מ-1000 מורים מיותר מ-250 בתי ספר כבר רשומים במערכת, ותלמידים מתרגלים יותר מ-500 משימות מידי יום.
        </div>
        <idm site_prefix="mada/" :title="'מדעים'" :mystyle="'right:22%;'" :key="1"/>
        <idm site_prefix="lashon/" :title="'לשון'" :mystyle="'right:35.8%'" :key="2"/>
        <div class="loginButtonDiv">
            <Button class="p-button loginButton" @click="startlogin">כניסה עם שם משתמש וסיסמה</Button>
        </div>
    </div>
    <Dialog v-model:visible="$data.loginvisible">
      <Login />
    </Dialog>
    </template> 
</template>


<script>
export default {
    name: 'Landing',
    data: () => ({
        loginvisible: ref(false)
    }),
    methods: {
        startlogin: function(){
            const auth = useAuth()
            auth.getUserdata()
            auth.startLogin()
            this.$data.loginvisible = ref(true)
    }
}

};
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
#landing{
    font-family: 'Assistant';
    width:1800px;
    position: absolute;
    top:0px;
    display: flex;
}

div.topTitleDiv{
    position: absolute;
    top: 160px;
    right: 21%;
    font-size: 50px;
    width: 25%;
    font-weight: 900;
}

div.topTextDiv{
    position: absolute;
    top: 315px;
    right: 21%;
    font-size: 22px;
    width: 30%;
}
div.orangeTextDiv{
    position: absolute;
    top: 760px;
    right: 21%;
    width: 40%;
    font-size: 18px;
    font-weight: 500;
    line-height: 95%;
}

div.cyanTitleDiv{
    position: absolute;
    top: 1000px;
    right: 21%;
    font-size: 15px;
    font-weight: bold;
}
div.cyanTextDiv{
    position: absolute;
    top: 1030px;
    right: 21%;
    width: 26%;
    font-size: 15px;
}

div.loginButtonDiv{
    position: absolute;
    top: 860px;
    right: 70%;
}

.loginButton{
    background-color: rgb(56,86,94);
}

.loginButton:hover{
    background-color:#ABD2DD !important;
}

</style>