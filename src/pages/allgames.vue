<script setup>
import useAPI from "../utils/useAPI";
import useAuth from '../utils/useAuth';
const api = useAPI();
const auth = useAuth();

if (auth.username)
  api.post("tasks/subjects_list/", {}).then(async p => {
    p = await p.json()
    console.log(p)
  });
</script>


<template>
  <div>allgames</div>
</template>


<script>
export default {
  name: "allgames",
};
</script>


<style>
</style>
