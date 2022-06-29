<script setup>
import { useRouter } from 'vue-router';
import ButtonSmall from './ButtonSmall.vue';

const router = useRouter()
</script>


<template>
    <div class="footer">
        <ButtonSmall @click="()=>router.push('/legal')">תנאי שימוש</ButtonSmall>
    </div>
</template>


<script>
export default {
name:'Footer'
};
</script>


<style>
.footer {
  bottom: 0;
  background-color: #f5f5f5;
  border-radius: 0.5em .5em 0 0;
  padding: .5em 1em;
}
</style>