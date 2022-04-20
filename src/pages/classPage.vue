<script setup>
import { useRoute, useRouter } from 'vue-router';
import useAuth from '../utils/useAuth';

const route = useRoute()
const router = useRouter()
const auth = useAuth()

if (!auth.isTeacherOrStaff) router.push("/");

</script>


<template>
<div>
    class {{ route.params.classid }}
</div>
</template>


<script>
export default {
name:'classPage'
};
</script>


<style>
</style>