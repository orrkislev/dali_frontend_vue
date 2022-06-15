<script setup>
import ButtonSmall from '../ButtonSmall.vue';

const props = defineProps({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
})
const emit = defineEmits(['reload'])

const api = useAPI()

const state = ref(null)

async function removeClass(){
    const res = await api.post_json("teachers/update_class/",{action: "delete",class_id: props.id })
    emit('reload')
}

function editClass(){
    api.post_json("teachers/update_class/", {
        action: "update",
        class_id: props.id,
        class_name: props.name,
        is_REST: "True"
    })
}

async function setOpen(){
	const res = await api.post_json("teachers/register_class_toggle/",{
		class_id: props.id,
		game_id: "all",
		purpose: "register"})
	props.isopen = res.status
	additional.value = {}
}

</script>


<template>
    <div>
            <div v-if="state == 'remove'" class="class_in_classlist">
                <div class="class_in_classlist_title">
                    <div>{{ name }}</div>
                    <h3>מחיקת כיתה</h3>
                    <div>
                        האם את/ה בטוח/ה? במידה ויש תלמידים משוייכים לכיתה, הם יוצאו
                        מהכיתה ויצטרכו לבחור כיתה מחדש בכניסה הבאה לאתר.
                    </div>
                </div>
                <div class="class_in_classlist_actions">
                    <button-small :border="true" @click="removeClass()">כן, מחק כיתה</button-small>
                    <button-small :border="true" @click="()=>state = null">ביטול</button-small>
                </div>
            </div>

            <div v-else-if="state == 'edit'" class="class_in_classlist">
                <div class="class_in_classlist_title">
                    <div>{{ name }}</div>
                    <h3>עריכת כיתה</h3>
                    <div>
                        <input v-model="name" type="text" />
                    </div>
                </div>
                <div class="class_in_classlist_actions">
                    <button-small :border="true" @click="editClass()">עדכן</button-small>
                    <button-small :border="true" @click="()=>state = null">ביטול</button-small>
                </div>
            </div>

            <div v-else class="class_in_classlist">
                <div class="class_in_classlist_title">
                    <router-link :to="'/manage/classes/' + id"> {{ name }} </router-link>
                </div>
                <div class="class_in_classlist_actions" >
                    <InputSwitch v-model="isOpen" @input="setOpen" />
                    <button-small :border="true" @click="()=>state = 'remove'">מחיקת כיתה</button-small>
                    <button-small :border="true" @click="()=>state = 'edit'">עריכה</button-small>
                </div>
            </div>
    </div>
</template>


<script>
import { ref } from 'vue-demi';
import useAPI from '../../utils/useAPI';
export default {
name:'classInClasses'
};
</script>


<style>
.class_in_classlist {
  margin: 0.5em 0;  
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
  border-radius: 0.5em;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 3px 4px;
  transition: all 150ms ease-in-out;
}
.class_in_classlist:hover {
  background: #ddd;
}
.class_in_classlist:active {
  background: orange;
}
.class_in_classlist_actions {
  display: flex;
  gap: 0.5em;
}
</style>