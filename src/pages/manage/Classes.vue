<script setup>
import { ref } from "vue-demi";
import { useRouter } from "vue-router";
import useAPI from "src/utils/useAPI";
import useAuth from "src/utils/useAuth";
import PageTitle from "src/components/PageTitle.vue";
import ButtonSmall from 'src/components/ButtonSmall.vue';
import ClassInClassesVue from "../../components/manage/classInClasses.vue";
import { useConfirm } from "primevue/useconfirm";

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

const newClassName = ref("")
const newClassGrade = ref()
const grades = [
	{name:'ז',id:7},
	{name:'ח',id:8},
	{name:'ט',id:9},
	{name:'י',id:10},
	{name:'יא',id:11},
	{name:'יב',id:12},
]

const confirm = useConfirm()
async function newClass(event){
	if (!newClassGrade.value || newClassName.value.length == 0) {
		confirm.require({
			target: event.currentTarget,
			group: "classesPage",
			message: "יש למלא את כל השדות",
			acceptLabel:"הבנתי",
			rejectLabel:' ',
		})
	} else {
		const res = await api.post_json("teachers/update_class/",{
			class_name : newClassName.value,
			class_grade : newClassGrade.value,
			is_REST: "True",
			action: "add"})
		newClassName.value = ""
		newClassGrade.value = null
		loadData()
	}
}

</script>


<template>
	<ConfirmPopup group="classesPage"></ConfirmPopup>
	<div>
		<page-title title="כל הכיתות" subtitle="כל הכיתות בבית הספר" img="Teaching" />
		<div v-if="data" class="flex-column gap1 classlist">
			<ClassInClassesVue v-for="cls in data" :key="cls.cl_id" :id="cls.cl_id" :is-open="cls.isopen" :name="cls.name" @reload="loadData"/>
		</div>
		<Divider />
		<div>הוספת כיתה או קבוצת לימוד</div>
		<div id='newClassContainer'>
			<div class="newclass_title">
				<input v-model="newClassName" type="text" />
				<div v-for="grade in grades" :key="grade.id">
					<input type="radio" :id="grade.name" :value="grade.id" v-model="newClassGrade"/>
					<label :for="grade.name">{{ grade.name }}</label>
				</div>						
			</div>
			<div class="newclass_action" >
				<button-small :border="true" @click='newClass'>הוסף</button-small>
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
#newClassContainer{
	display: flex;
  	justify-content: space-between;
}
.newclass_title{
	display: flex;
	gap:0.5em;
}
</style>