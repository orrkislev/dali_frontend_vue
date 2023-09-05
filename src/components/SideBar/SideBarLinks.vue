<script setup>

import useAPI from "src/utils/useAPI";
import useAuth from 'src/utils/useAuth';
const api = useAPI();
const auth = useAuth()

function add2Favories() {
  if (window.sidebar && window.sidebar.addPanel) 
      { // Mozilla Firefox Bookmark
          window.sidebar.addPanel(document.title,window.location.href,'');
      } 
      else if(window.external && ('AddFavorite' in window.external)) 
      { // IE Favorite
          window.external.AddFavorite(location.href,document.title); 
      } 
      else if(window.opera && window.print) 
      { // Opera Hotlist
          this.title=document.title;
          return true;
      } 
      else 
      { // webkit - safari/chrome
          alert('לחצו ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D כדי להוסיף למועדפים.');
      }
}

</script>
<template>
  <div v-if="auth.isTeacherOrStaff"  class="sideBarElement sideBarElement-dark footer_images_div">
    <a class='home_top_links_a'  title='הוספה למועדפים' alt='הוספה למועדפים'>
      <img class='footer_img' :src="api.staticUrl('images/links/addthis.png')" role='button' tabindex='0' @click="add2Favories"/>
    </a>
    <a class='home_top_links_a' href='mailto:dali.k12.co.il@gmail.com' target='_blank' title='שליחת מייל' alt='שליחת מייל'>
      <img class='footer_img' :src="api.staticUrl('images/links/email.png')">
    </a>
    <a  href='https://chat.whatsapp.com/KpuUXrbol1CHngHkso4S9Q' target='_blank'  title='רישום לקבוצת הוואטסאפ למורים' alt='רישום לקבוצת וואטסאפ למורים'>
      <img class='footer_img' :src="api.staticUrl('images/links/whatsapp.png')"/>
    </a>
    <a href='https://www.facebook.com/dali.co.il' target='_blank' title="פייסבוק" alt="פייסבוק">
      <img class='footer_img' :src="api.staticUrl('images/links/facebook.png')">
    </a>
  </div>

</template>

<script>
export default {
  name: "SideBarLinks",
};
</script>

<style>
.footer_images_div{
  display:flex;
  justify-content: space-evenly;
  cursor: pointer;
}
</style>