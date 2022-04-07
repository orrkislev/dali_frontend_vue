<script setup>
import useAuth from '../utils/useAuth';

const auth = useAuth()
auth.auto_login()

</script>


<template>
<form method="post" action="/students/pre_login/">
    {% csrf_token %}
    <input type="hidden" name="onlyData" value="true" />
    <input type="hidden" name="next" value="/" />
    <div style='display:flex;flex-direction: column; gap:1em; align-items: center; margin-bottom: 1em;'>
        <div>
            <div class='inputLable'>שם משתמש</div>
            <input type='text' id='id_username' maxlength='30' name='username' aria-label='שם משתמש' />
        </div>
        <div>
            <div class='inputLable'>סיסמא</div>
            <input type='password' id='id_password' maxlength='30' name='password' aria-label='סיסמה' />
        </div>
        <input id='submit' type="submit" value='כניסה' />
    </div>
</form>
</template>


<script>
export default {
  name: "login",
};
</script>


<style>
</style>
