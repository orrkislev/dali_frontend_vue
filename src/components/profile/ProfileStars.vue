<script setup>
import { ref } from 'vue';
import useAuth from 'src/utils/useAuth';
import useAPI from 'src/utils/useAPI';

const auth = useAuth()
const api = useAPI()
const stars_list = ref([])


api.post("students/profile_badges/", {}).then(res=> {
  stars_list.value = res.quser_badges_list
});

</script>

<template>
<div>
  <h2>פירוט כוכבים</h2>
  <DataTable :value="stars_list" class="profileStartsTable">
      <Column field="title" header="פעולה" class='text-right w-4'> </Column>
      <Column field="start_per_instance" header="כוכבים לכל פעולה" class='text-center'> </Column>
      <Column field="stars" header="מספר כוכבים מצטבר" class='text-center'> </Column>
      <ColumnGroup type="footer">
        <Row>
          <Column footer="סך הכל:" footerClass="text-center" colspan="2"/>
          <Column :footer="auth.userData.badge_points" footerClass="text-center"/>
        </Row>
      </ColumnGroup>
  </DataTable>
</div>

</template>

<script>
export default {
name:'profileStars'
};
</script>

<style>
.profileStartsTable{line-height: 0.5em;}
</style>

