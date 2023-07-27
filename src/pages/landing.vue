<script setup>
import { useRoute } from "vue-router";
import useAuth from '../utils/useAuth';
import Login from "../pages/login.vue";
import DaliWait from 'src/utils/DaliWait.vue'

import { ref } from "vue";


const auth = useAuth()
auth.getUserdata()
const route = useRoute()

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
            <div class="flex gap-3">
                <Button class="p-button-warning" @click="startlogin">כניסה</Button>
                <Button class="p-button-raised p-button-secondary p-button-text" >צור קשר</Button>
            </div>
        </div>
        <div class="col-6 pl-5 relative" >
            <img src="@/assets/images/v401_8065.png" alt="" class="w-full">
            <div id="background-element-1" />
        </div>

        <div class="col-12 text-center mt-5">
            <div class="w-6 mx-auto text-xl line-height-3 text-600">
                מערכת דע-לי מספקת דרך חווייתית ומהנה ללימוד ולתרגול מקצוע המדעים בחטיבת הביניים. שימוש בדע-לי מגביר את סקרנות התלמידים, והתרגול השוטף של הנושאים הנלמדים בכיתה מאפשר הבנה טובה יותר של החומר והטמעה שלו, ותורם להצלחת התלמידים במקצוע.
            </div>
        </div>

        <div class="col-2 " />
        <div class="col-8 grid mt-6 gap-row-3">
            <div class="col-6 flex justify-content-center">
                <div class="w-4 relative">
                    <img src="@/assets/images/v401_8066.png" alt="" class="w-full">
                    <div class="circle_background" />
                </div>
                <div class="flex flex-column justify-content-center mx-2">
                    <div class="text-3xl font-bold">150+</div>
                    <div class="text-600">נושאים שונים</div>
                </div>
            </div>
            <div class="col-6 flex justify-content-center">
                <div class="w-4 relative">
                    <img src="@/assets/images/v401_8066.png" alt="" class="w-full">
                    <div class="circle_background" />
                </div>
                <div class="flex flex-column justify-content-center mx-2">
                    <div class="text-3xl font-bold">150+</div>
                    <div class="text-600">נושאים שונים</div>
                </div>
            </div>
            <div class="col-6 flex justify-content-center">
                <div class="w-4 relative">
                    <img src="@/assets/images/v401_8066.png" alt="" class="w-full">
                    <div class="circle_background" />
                </div>
                <div class="flex flex-column justify-content-center mx-2">
                    <div class="text-3xl font-bold">150+</div>
                    <div class="text-600">נושאים שונים</div>
                </div>
            </div>
            <div class="col-6 flex justify-content-center">
                <div class="w-4 relative">
                    <img src="@/assets/images/v401_8066.png" alt="" class="w-full">
                    <div class="circle_background" />
                </div>
                <div class="flex flex-column justify-content-center mx-2">
                    <div class="text-3xl font-bold">150+</div>
                    <div class="text-600">נושאים שונים</div>
                </div>
            </div>
        </div>



        <div class="col-4 mt-8">
            <div id="background-element-2" />
            <div class="p-5 flex flex-column justify-content-center align-items-end text-left">
                <div class="text-3xl font-bold">משחקים לדוגמא</div>
                <div class="text-2xl py-2 text-800">משימות ומשחקים ללימוד מדעים בחטיבת ביניים</div>
            </div>
        </div>
        <div class="col-8 mt-8 flex gap-1 overflow-visible">
            <div class="col-3 bg-white border-round-1 overflow-hidden shadow p-0">
                <img src="@/assets/images/v502_1647.png" alt="" class="w-full">
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
                <img src="@/assets/images/v502_1647.png" alt="" class="w-full">
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
                <img src="@/assets/images/v502_1647.png" alt="" class="w-full">
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
                <img src="@/assets/images/v502_1647.png" alt="" class="w-full">
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

        <div class="col-12 mt-8">
            <div class="text-3xl font-bold mr-7 text-center">משימות בהמון נושאים </div>
            <div class="text-2xl py-2 text-800 mr-7 text-center">כל החומר במדעים לכיתות ז-ח-ט</div>
        </div>
        <div class="col-12 mt-8">
            <div class="font-bold mx-8 text-xl">מדעים לכיתה ח</div>
            <div class="flex gap-3 text-xl mt-3">
                <div class="bg-white border-round-1 px-5">חומרים</div>
                <div class="bg-white border-round-1 px-5">התא</div>
                <div class="bg-white border-round-1 px-5">אנרגיה חשמלית</div>
                <div class="bg-white border-round-1 px-5">מערכות טכנולוגיות</div>
                <div class="relative">
                    <div class="bg-yellow-400 border-round-1 px-5">כוחות ותנועה</div>
                    <div class="text-center fade-top absolute bottom-100 w-15rem">
                        <div>כוחות בחיי היומום</div>
                        <div>תנועה</div>
                        <div>כוחות ושינוי</div>
                    </div>
                    <div class="text-center fade-bottom absolute top-100 w-15rem">
                        <div>משקל ומסה</div>
                        <div>כח לעומת אנרגיה</div>
                        <div>לחץ</div>
                    </div>
                </div>
                <div class="bg-white border-round-1 px-5">מערכות אקולוגיות </div>
                <div class="bg-white border-round-1 px-5">גאוגרפיה</div>
            </div>
        </div>
        <div class="col-12 mt-8">
            <div class="font-bold mx-8 text-xl">מדעים לכיתה ט</div>
            <div class="flex gap-3 text-xl mt-3">
                <div class="bg-white border-round-1 px-5">גאוגרפיה</div>
                <div class="bg-white border-round-1 px-5">מערכות ותהליכים ביצורים חיים</div>
                <div class="relative">
                    <div class="bg-yellow-400 border-round-1 px-5">אנרגיה ומערכות טכנולוגיות</div>
                    <div class="text-center fade-top absolute bottom-100 w-15rem">
                        <div>אנרגיית תנועה</div>
                        <div>אנרגיית גובה</div>
                        <div>המרות אנרגיה</div>
                    </div>
                    <div class="text-center fade-bottom absolute top-100 w-15rem">
                        <div>הספק ונצילות</div>
                        <div>אנרגיית חום</div>
                        <div>חוק שימור האנרגיה</div>
                    </div>
                </div>
                <div class="bg-white border-round-1 px-5">משימות זיוחדות</div>
                <div class="bg-white border-round-1 px-5">חומרים</div>
            </div>
        </div>

        <div class="col-12 mt-8"></div>

        <div class="col-6 p-5 mt-8 flex flex-column justify-content-center align-items-end text-left relative">
            <div class="text-2xl font-bold w-7 text-center">קצת עלינו</div>
            <div class="text-md py-2 text-800 w-7 text-center">
                דע-לי היא מערכת המיועדת למורים ולתלמידים והמציעה כלי עזר ללימוד מדעים לחטיבות הביניים באמצעות משחקי שאלות ותשובות. השאלות מלוות בקישורים למולטימדיה (כגון תמונות, סרטונים והדמיות) המסייעים בהבנת החומר, והתשובות מלוות בהסברים מפורטים. המערכת מציעה מאגר גדול של משימות ושאלות המותאמות באופן מלא לתכנית הלימודים. המשימות מיועדות בעיקר לשמש כשיעורי בית או לצורך הכנה לבחינות.
            </div>
            <div id="background-element-3" />
        </div>
        <div class="col-6 pl-5 relative" >
            <img src="@/assets/images/v401_8065.png" alt="" class="w-full">
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
</style>