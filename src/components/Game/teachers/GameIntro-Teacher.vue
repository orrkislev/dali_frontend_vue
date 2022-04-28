<script setup>
import useAuth from "../../../utils/useAuth";
import ActionButton from '../../ActionButton.vue';
import GameManageClasses from './GameManageClasses.vue';
import Divider from 'primevue/divider';

const auth = useAuth();

</script>


<template>
  <div v-if="['stuff', 'teacher'].includes(auth.role)">
    <game-manage-classes />
    <Divider />
    <div class="teacher_section">
      <div class="teacher_section_title">משחק מובייל בכיתה</div>
      <div class="teacher_section_subtitle">פתיחת המשחק למובייל בכיתה</div>
      <div class="teacher_section_content">
        <div class="teacher_section_content_text">
          בחרו את הכיתה/ות שבה/ן תרצו להתחיל עכשיו משחק בכיתה, בו המורה מציגה את השאלות במחשב, והתלמידים עונים בטלפונים הניידים.
        </div>
        <div class="teacher_section_content_action">
          <action-button :center='true' :border="true">משחק מובייל </action-button>
        </div>
      </div>
    </div>

    <div class="teacher_section">
      <div class="teacher_section_title">בוחן מקוון</div>
      <div class="teacher_section_subtitle">פתיחת משימה לכיתה כבוחן מקוון</div>
      <div class="teacher_section_content">
        <div class="teacher_section_content_text">
          תלמידים יראו את המשימה תחת "המשימות שלי" עם סימון של בוחן. הם יוכלו
          לשחק רק פעם אחת, ללא גלגלי הצלה, והניקוד שקיבלו יופיע בדו"ח בחנים ללא
          צורך בפרסום. זכרו לסגור את הבוחן עם תום הזמן המוקצב לתלמידים.
        </div>
        <div class="teacher_section_content_action">
          <action-button :center='true' :border="true">בוחן</action-button>
        </div>
      </div>
    </div>

    <div class="teacher_section">
      <div class="teacher_section_title">בוחן מודפס</div>
      <div class="teacher_section_subtitle">
        מערכת דע-לי מייצרת עבורכם, באופן אוטומטי, קובץ בחינה אותו ניתן להוריד
        ולהדפיס.
      </div>

      <div class="teacher_section_content">
        <div class="teacher_section_content_text">
          תוכלו לתת לתלמידים לתרגל את הנושא במערכת ולאחר מכן - לתת להם בוחן קצר
          המכיל מספר קטן של שאלות מהמאגר.
        </div>
        <div class="teacher_section_content_action">
          <action-button :center='true' :border="true">הפקת בוחן</action-button>
        </div>
      </div>
    </div>

    <div class="teacher_section">
      <div class="teacher_section_title">חומרי עזר</div>
      <div class="teacher_section_subtitle">
        לחצו על הכפתורים למעלה כדי לעבור בין סוגי החומרים השונים.
      </div>
      <div class="teacher_section_content">
        <div class="teacher_section_content_text">
          דפדפו שמאלה כדי לראות עוד חומרים
        </div>
        <div class="teacher_section_content_action">
          <action-button :center='true' :border="true">GO</action-button>
        </div>
      </div>
    </div>
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
.teacher_section {
  padding: 1.5em 3em;
}
.teacher_section_title {
  font-size: large;
}
.teacher_section_subtitle {
  color: gray;
}
.teacher_section_content {
  display: flex;
  justify-content: space-between;
}
.teacher_section_content_text {
  flex: 4;
}
.teacher_section_content_action {
  padding: 0 1em;
  flex: 1;
}
</style>