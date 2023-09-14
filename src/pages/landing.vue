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
    <div id="landing" class="grid grid-nogutter row-gap-5 overflow-x-hidden">
        <div class="col-12 h-8rem"></div>

        <div class="col-6 p-5 flex flex-column justify-content-center align-items-end text-left">
            <div class="text-6xl font-bold w-7">חווית הוראה ולמידה חדשנית</div>
            <div class="text-2xl py-2 text-800 w-7">משימות ומשחקים ללימוד מדעים בחטיבת ביניים</div>
            <div class="text-2xl py-2 text-800 w-7">וללימוד לשון לקראת הבגרות</div>            
        </div>
        <div class="col-6 pl-5 relative" >
            <img :src="api.newSiteImages('landing_bg_top.png')" alt="" class="w-full">
            <div id="background-element-1" />
            <div class="centerdiv flex gap-3" style="margin-top:1em;">
                <Button class="p-button-warning" @click="startlogin">כניסה עם שם משתמש וסיסמה</Button>
            </div>
        </div>

        <div class="col-12 text-center mt-5">
            <div class="w-6 mx-auto text-xl line-height-3 text-600">
                מערכת דע-לי מספקת דרך חווייתית ומהנה ללימוד ולתרגול מקצוע המדעים בחטיבת הביניים. שימוש בדע-לי מגביר את סקרנות התלמידים, והתרגול השוטף של הנושאים הנלמדים בכיתה מאפשר הבנה טובה יותר של החומר והטמעה שלו, ותורם להצלחת התלמידים במקצוע.
            </div>
        </div>
        <template v-if="mode=='general'">
            <div class="col-4 mt-8">
                <div id="background-element-2" />
                <div class="p-5 flex flex-column justify-content-center align-items-end text-left">
                    <div class="text-3xl font-bold">למידע נוסף</div>
                    <div class="text-2xl py-2 text-800">בחרו את תחום הדעת</div>
                </div>
            </div>
            <div class="col-8 mt-8 flex gap-1 overflow-visible">
                <div class="col-3 bg-white border-round-1 overflow-hidden shadow p-0" style="cursor: pointer;" @click="gotoscience()">
                    <img :src="api.newSiteImages('science_site_logo.png')" alt="" class="w-full">
                    <div class="areaSelect">
                        מדעים
                    </div>
                    <idm site_prefix="" :key="1"/>
                </div>
                <div class="col-3 bg-white border-round-1 overflow-hidden shadow p-0" style="cursor: pointer;" @click="switchmode('lashon')">
                    <img :src="api.newSiteImages('lashon_site_logo.png')" alt="" class="w-full">
                    <div class="areaSelect">
                        לשון
                    </div>
                    <idm site_prefix="lashon/" :key="2"/>
                </div>
            </div>
            <div class="col-12 mt-8"></div>
        </template>
        <template v-else>

            <div class="col-2 " />
            <div class="col-8 grid mt-6 gap-row-3">
                <div class="col-6 flex justify-content-center">
                    <div class="w-4 relative">
                        <img :src="api.newSiteImages('counts_1.png')" alt="" class="w-full">
                        <div class="circle_background" />
                    </div>
                    <div class="flex flex-column justify-content-center mx-2">
                        <div class="text-3xl font-bold">150+</div>
                        <div class="text-600">נושאים שונים</div>
                    </div>
                </div>
                <div class="col-6 flex justify-content-center">
                    <div class="w-4 relative">
                        <img :src="api.newSiteImages('counts_2.png')" alt="" class="w-full">
                        <div class="circle_background" />
                    </div>
                    <div class="flex flex-column justify-content-center mx-2">
                        <div class="text-3xl font-bold">1500</div>
                        <div class="text-600">שאלות</div>
                    </div>
                </div>
                <div class="col-6 flex justify-content-center">
                    <div class="w-4 relative">
                        <img :src="api.newSiteImages('counts_3.png')" alt="" class="w-full">
                        <div class="circle_background" />
                    </div>
                    <div class="flex flex-column justify-content-center mx-2">
                        <div class="text-3xl font-bold">200</div>
                        <div class="text-600">במחיר שיעור פרטי בודד</div>
                    </div>
                </div>
                <div class="col-6 flex justify-content-center">
                    <div class="w-4 relative">
                        <img :src="api.newSiteImages('counts_4.png')" alt="" class="w-full">
                        <div class="circle_background" />
                    </div>
                    <div class="flex flex-column justify-content-center mx-2">
                        <div class="text-3xl font-bold">500</div>
                        <div class="text-600">בתי ספר</div>
                    </div>
                </div>
            </div>
            <div class="col-4 mt-8">
                <div id="background-element-2" />
                <div class="p-5 flex flex-column justify-content-center align-items-end text-left">
                    <div class="text-3xl font-bold">תרגולים לדוגמא</div>
                    <div class="text-2xl py-2 text-800">שיעורים ותרגולים ללימוש לשון לקראת בגרות</div>
                </div>
            </div>
            <div class="col-8 mt-8 flex gap-1 overflow-visible">
                <div class="col-3 bg-white border-round-1 overflow-hidden shadow p-0" @click="gotoGame(214)">
                    <img :src="api.newSiteImages('lashon_site_logo.png')" alt="" class="w-full">
                    <div class="p-3">
                        <div class="text-600">סימני הניקוד</div>
                        <div class="font-bold">תרגול ברמה בסיסית</div>
                        <div class="mt-2 text-sm">
                            • מה זה זמן<br/>
                            • מה זה גוף<br/>
                            • תרגול בסיסי<br/>
                        </div>
                    </div>
                </div>
                <div class="col-3 bg-white border-round-1 overflow-hidden shadow p-0">
                    <img :src="api.newSiteImages('lashon_site_logo.png')" alt="" class="w-full">
                    <div class="p-3">
                        <div class="text-600">מדעים ח</div>
                        <div class="font-bold">משפחות כימיות</div>
                        <div class="mt-2 text-sm">
                            במשחק 7 שאלות

                            • סידור היסודות בטבלה בטורים - מתכות, הלוגנים, גזים אצילים
                            • פחמן - צורות שונות של סידור האטומים יוצר גרפיט, יהלום, פולרן - תכונותיהם
                            • סימול יסודות בשפת הכימאים
                        </div>
                    </div>
                </div>
                <div class="col-3 bg-white border-round-1 overflow-hidden shadow p-0">
                    <img :src="api.newSiteImages('lashon_site_logo.png')" alt="" class="w-full">
                    <div class="p-3">
                        <div class="text-600">מדעים ח</div>
                        <div class="font-bold">משפחות כימיות</div>
                        <div class="mt-2 text-sm">
                            במשחק 7 שאלות

                            • סידור היסודות בטבלה בטורים - מתכות, הלוגנים, גזים אצילים
                            • פחמן - צורות שונות של סידור האטומים יוצר גרפיט, יהלום, פולרן - תכונותיהם
                            • סימול יסודות בשפת הכימאים
                        </div>
                    </div>
                </div>
                </div>
        </template>

        <div class="col-6 p-5 mt-8 flex flex-column justify-content-center align-items-end text-left relative">
            <div class="text-2xl font-bold w-7 text-center">קצת עלינו</div>
            <div class="text-md py-2 text-800 w-7 text-center">
                דע-לי היא מערכת המיועדת למורים ולתלמידים והמציעה כלי עזר ללימוד מדעים לחטיבות הביניים באמצעות משחקי שאלות ותשובות. השאלות מלוות בקישורים למולטימדיה (כגון תמונות, סרטונים והדמיות) המסייעים בהבנת החומר, והתשובות מלוות בהסברים מפורטים. המערכת מציעה מאגר גדול של משימות ושאלות המותאמות באופן מלא לתכנית הלימודים. המשימות מיועדות בעיקר לשמש כשיעורי בית או לצורך הכנה לבחינות.
            </div>
            <div id="background-element-3" />
            <div style="margin-top: 2em;">
                <action-button v-if="mode=='lashon'"  :center="true" :main="true" @click="switchmode('general')"> חזרה </action-button>
            </div>
        </div>
        <div class="col-6 pl-5 relative" >
            <img :src="api.newSiteImages('landing_bg_bottom.png')" alt="" class="w-full">
        </div>

        <div class="col-12 h-8rem"></div>
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
    font-family: 'Open Sans', sans-serif;
}
#background-element-1{
    width:150vw;
    height: 50em;
    border-radius: 5em;
    background-color: white;
    opacity: 0.75;
    position: absolute;
    right: -80%;
    bottom: -17em;
    transform: rotate(-7deg);
    z-index: -1000;
}
#background-element-2{
    width:150vw;
    height:19em;
    border-radius: 5em;
    background-color: white;
    opacity: 0.75;
    position: absolute;
    left: 7%;
    transform: rotate(5deg);
    z-index: -1000;
}
#background-element-3{
    width:150%;
    height:100%;
    border-radius: 1em;
    background-color: white;
    position: absolute;
    top:0;
    left:0;
    z-index: -1000;
}


.circle_background{
    width: 6em;
    height: 6em;
    border-radius: 50%;
    /* background-color: #f5f5f5; */
    border: 3px solid #f5f5f5;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.gap-row-1{ grid-row-gap: 1em; }
.gap-row-2{ grid-row-gap: 2em; }
.gap-row-3{ grid-row-gap: 3em; }
.gap-3{ grid-gap: 3em; gap:3em;}
.gap-2{ grid-gap: 2em; gap:2em;}
.gap-1{ grid-gap: 1em; gap:1em;}
.m-10{ margin: 10em;}
.shadow{ box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
.border-round-1{ border-radius: 1em; }
.fade-top{ mask-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)); }
.fade-bottom{ mask-image: linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1)); }

.areaSelect{font-size:42px;text-align: center;}
.science{background-color:blue;}
.lashon{background-color:green;}
</style>