<script setup>
import Dialog from 'primevue/dialog';
import { ref } from "vue";
import useAPI from '../utils/useAPI';
import useBrowseManager from 'src/utils/useBrowseManager';
import useAuth from 'src/utils/useAuth';

const api = useAPI()
const browseManager = useBrowseManager();
const auth = useAuth()

let showDialog = ref(true)
let showTermsDialog = ref(false)
let termsText = ref(null)
const emailaddr = ref("");
const phonenum = ref("");
const approve = ref(false);
let errors = ref("<br/><br/><br/>");

function send_data_updates(role) {
  errors.value = ""
  if (!approve.value) errors.value +="יש לאשר את תנאי השימוש<br/>"
  if (role == 'teacher'){
    if (emailaddr.value.search('@') < 0 ) errors.value +="נא להכניס כתובת מייל חוקית<br/>"
    if (phonenum.value.length < 6) errors.value +="נא להכניס מספר טלפון תקין<br/>"
  }
  console.log('erros = ' + errors.value)
  if (errors.value == "") {
    let params = {'email':emailaddr.value,'phone':phonenum.value}
    api.post("students/profile/terms_sign/",params)
    showDialog.value = ref(false)
  }

}

function show_terms(){
  console.log('show_terms')
  api.post("review/static/home/home_terms/", {}).then((res) => {
    termsText.value= res
    showTermsDialog.value = ref(true)
})
}

</script>

<template>
  <Dialog v-if="auth.isTeacherOrStaff" modal v-model:visible="showDialog" :closable="false" class='termsDialog'>
    <div>
    כדי להתחיל להשתמש באתר <br/>
     יש למלא את הפרטים  <br/>
     ולאשר את תנאי השימוש:<br/><br/>
    </div>
    <form @submit.prevent="send_data_updates">
      <div class="flex flex-column">
          <div>כתובת מייל</div>
          <InputText id="email" type="text" v-model="emailaddr" />
          <div>מספר טלפון</div>
          <InputText id="phone" type="text" v-model="phonenum" />
          <br/>
          <div>
          <InputSwitch v-model="approve" />
          מאשר.ת שקראתי את תנאי השימוש<br/>
             ואני מסכימ.ה לתנאים. <br/>
            <br/>
            <span @click="show_terms()" style='cursor:pointer;'>לחצו להצגת התנאים</span>
          </div>
          <Button label="עדכון" @click="send_data_updates('teacher')"/>
          <br/>
      </div>
    </form>
    <div class='errorsDiv' v-html="errors"></div>
  </Dialog>
  <Dialog v-else modal v-model:visible="showDialog" :closable="false" class='termsDialog'>
    <div>
    כדי להתחיל להשתמש באתר <br/>
     לאשר את תנאי השימוש:<br/><br/>
    </div>
    <form @submit.prevent="send_data_updates">
      <div class="flex flex-column">
          <div>
          <InputSwitch v-model="approve" />
          מאשר.ת שקראתי את תנאי השימוש<br/>
             ואני מסכימ.ה לתנאים. <br/>
            <br/>
            <span @click="show_terms()" style='cursor:pointer;'>לחצו להצגת התנאים</span>
          </div>
          <Button label="עדכון" @click="send_data_updates('student')"/>
          <br/>
      </div>
    </form>
    <div class='errorsDiv' v-html="errors"></div>
    <Dialog modal v-model:visible="showTermsDialog">
      <div v-html="termsText"> </div>
      <Button label="סגירה" @click="showTermsDialog = false"/>
    </Dialog>
 
</Dialog>
</template>

<script>
export default {
    name: 'dataUpdate'
};
</script>

<style>
.termsDialog{display:block;}
.errorsDiv{color:red;}
</style>