<script setup>
import { ref } from "vue-demi";
import { useRouter } from "vue-router";
import useAPI from "src/utils/useAPI";
import useAuth from "src/utils/useAuth";
import PageTitle from "src/components/PageTitle.vue";
import ButtonSmall from 'src/components/ButtonSmall.vue';

const auth = useAuth();
const router = useRouter();
const api = useAPI();
if (!auth.isTeacherOrStaff) router.push("/");

const data = ref(null);
loadData()

function loadData(){
	api.post_json("teachers/school_classes/", { purpose: "register" })
		.then((res) => {
			if (res.success) data.value = res.classes_table.all.list;
		});
}

const additional = ref({})
function startRemoveClass(classIndex){
  additional.value = {classIndex, content:"remove"}
}
function cancel(){
	additional.value = {}
}
async function actualRemoveClass(class_id){
	const res = await api.post_json("teachers/update_class/",{action: "delete",class_id })
	console.log(res)
	additional.value = {}
	loadData()
}

const newClassName = ref("")
const newClassGrade = ref(7)
const grades = [
	{name:'ז',id:7},
	{name:'ח',id:8},
	{name:'ט',id:9},
]

async function newClass(){
	const res = await api.post_json("teachers/update_class/",{
		class_name : newClassName.value,
		class_grade : newClassGrade.value,
		is_REST: "True",
		action: "add"})
	console.log(res)
	additional.value = {}
	loadData()
}

async function setOpen(clsIndex){
	const res = await api.post_json("teachers/register_class_toggle/",{
		class_id: data.value[clsIndex].cl_id,
		game_id: "all",
		purpose: "register"})
	data.value[clsIndex].isopen = res.status
	additional.value = {}
}

</script>


<template>
	<div>
		<page-title title="כל הכיתות" subtitle="כל הכיתות בבית הספר" img="Teaching" />
		<div v-if="data" class="flex-column gap1 classlist">
      	<div class="class_in_classlist" v-for="(cls, clsIndex) in data" :key="cls.cl_id" >
			<div class="class_in_classlist_title">
				<router-link :to="'/manage/classes/' + cls.cl_id"> {{ cls.name }} </router-link>
				<div v-if="additional.classIndex == clsIndex">
					<div class="class_in_classlist_title">
						<h3>מחיקת כיתה</h3>
						<div>
							האם את/ה בטוח/ה? במידה ויש תלמידים משוייכים לכיתה, הם יוצאו
							מהכיתה ויצטרכו לבחור כיתה מחדש בכניסה הבאה לאתר.
						</div>
					</div>
					<div class="class_in_classlist_actions">
						<button-small :border="true" @click="actualRemoveClass(clsIndex)">כן, מחק כיתה</button-small>
						<button-small :border="true" @click="cancel()">ביטול</button-small>
					</div>
				</div>
			</div>
			<div v-if="additional.classIndex != clsIndex" class="class_in_classlist_actions" >
				<InputSwitch v-model="cls.isopen" @input="(e) => setOpen(clsIndex)" />
				<button-small :border="true" @click="startRemoveClass(clsIndex)">מחיקת כיתה</button-small>
				<button-small :border="true">עריכה</button-small>
			</div>
		</div>
		<div>הוספת כיתה או קבוצת לימוד</div>
			<div id='newClassContainer'>
				<div class="class_in_classlist_title">
					<input v-model="newClassName" type="text" />
					<div v-for="grade in grades" :key="grade.id">
						<input type="radio" :id="grade.name" :value="grade.id" v-model="newClassGrade"/>
						<label :for="grade.name">{{ grade.name }}</label>
					</div>						
				</div>
				<div class="class_in_classlist_actions" >
					<button-small :border="true" @click='newClass'>הוסף</button-small>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
export default {
  components: { PageTitle, ButtonSmall },
  name: "Classes",
};
</script>


<style>
.classlist {
}
.class_in_classlist {
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
#newClassContainer{
	display: flex;
  	justify-content: space-between;
}
</style>