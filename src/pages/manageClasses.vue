<script setup>
import { ref } from "vue-demi";
import { useRouter } from "vue-router";
import useAPI from "../utils/useAPI";
import useAuth from "../utils/useAuth";
import PageTitle from "../components/PageTitle.vue";
import ButtonSmall from '../components/ButtonSmall.vue';

const auth = useAuth();
const router = useRouter();
const api = useAPI();

if (!auth.isTeacherOrStaff) router.push("/");

const data = ref(null);
api
  .post_json("teachers/school_classes/", { purpose: "register" })
  .then((res) => {
    if (res.success) data.value = res.classes_table.all.list;
  });
</script>


<template>
  <div>
    <page-title
      title="כל הכיתות"
      subtitle="כל הכיתות בבית הספר"
      img="Teaching"
    />
    <div v-if="data" class="flex-column gap1 classlist">
        <router-link :to="'/classes/'+cls.cl_id" v-for="cls in data" :key="cls.cl_id">
            <div class="class_in_classlist" >
                <div class="class_in_classlist_title">{{ cls.name }}</div>
                <div class="class_in_classlist_actions">
                    <button-small :border="true">מחיקת כיתה</button-small>
                    <button-small :border="true">עריכה</button-small>
                </div>
            </div>
        </router-link>
    </div>
  </div>
</template>


<script>
export default {
  components: { PageTitle, ButtonSmall },
  name: "manageClasses",
};
</script>


<style>
.classlist {
}
.class_in_classlist {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5em;
  border-radius: 0.5em;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 3px 4px;
  transition: all 150ms ease-in-out;
}
.class_in_classlist:hover {
  background: #DDD;
}
.class_in_classlist:active {
  background: orange;
}
.class_in_classlist_actions{
    display: flex;
    gap:0.5em;
}
</style>