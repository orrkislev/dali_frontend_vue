<script setup>
import useAuth from "src/utils/useAuth";
import ActionButton from '../../ActionButton.vue';
import GameManageClasses from './GameManageClasses.vue';
import Divider from 'primevue/divider';
import TeacherActionSection from "../../TeacherActionSection.vue";

const auth = useAuth();

function startMobile(){
  // TODO
}
function setExam(){
  // TODO
}
function printExam(){
  // TODO
}
function additional(){
  // TODO
}



</script>


<template>
  <div v-if="auth.isTeacherOrStaff">
    <Divider />
    <game-manage-classes />
    <Divider />

    <TeacherActionSection 
        title="משחק מובייל בכיתה" 
        subtitle="פתיחת המשחק למובייל בכיתה"
        text="בחרו את הכיתה/ות שבה/ן תרצו להתחיל עכשיו משחק בכיתה, בו המורה מציגה את השאלות במחשב, והתלמידים עונים בטלפונים הניידים."
        action_label="משחק מובייל"
        :disabled="true"
        @click="startMobile" />

    <TeacherActionSection 
        title="בוחן מקוון" 
        subtitle="פתיחת משימה לכיתה כבוחן מקוון"
        text='          תלמידים יראו את המשימה תחת "המשימות שלי" עם סימון של בוחן. הם יוכלו
          לשחק רק פעם אחת, ללא גלגלי הצלה, והניקוד שקיבלו יופיע בדו"ח בחנים ללא
          צורך בפרסום. זכרו לסגור את הבוחן עם תום הזמן המוקצב לתלמידים.'
        action_label="בוחן"
        :disabled="true"
        @click="setExam" />
    
    <TeacherActionSection 
        title="בוחן מודפס" 
        subtitle="מערכת דע-לי מייצרת עבורכם, באופן אוטומטי, קובץ בחינה אותו ניתן להורידולהדפיס."
        text="תוכלו לתת לתלמידים לתרגל את הנושא במערכת ולאחר מכן - לתת להם בוחן קצר המכיל מספר קטן של שאלות מהמאגר."
        action_label="הפקת בוחן"
        :disabled="true"
        @click="printExam" />

    <TeacherActionSection 
        title="חומרי עזר"
        subtitle="לחצו על הכפתורים למעלה כדי לעבור בין סוגי החומרים השונים."
        text="דפדפו שמאלה כדי לראות עוד חומרים"
        action_label="חומרי עזר"
        :disabled="true"
        @click="additional" />
  </div>
</template>


<script>
export default {
  components: { ActionButton},
  name: "GameIntro-Teacher",
    GameManageClasses
};
</script>


<style>

</style>