<script setup>
import Carousel from 'primevue/carousel';
import { base_url } from "../utils/useAPI";
import Dialog from 'primevue/dialog';
import { ref } from "vue";
import useAPI from '../utils/useAPI';
import useEmitter from "../utils/useEmmiter";

const api = useAPI()
const emitter = useEmitter()

emitter.subscribe('SHOW_HELP', get_help_pages)

const base_img_url = base_url + "static/"
let data = ref(null)

function startHelp(params)
{
  data.value = params
  data.value['visible'] = ref(true);
}

function get_help_pages(params)
{
  api.post("review/help/", params).then((res) => {
        if (res.pages.length > 0) {
    
          data.value = {'pages': res.pages};
          data.value['visible'] = ref(true);
        }
        else {
          data.value = {'pages':[{'title':'לא קיימת הדרכה כזו'}],'visible':ref(true)}
      }
    })
}
</script>

<template>
    <Dialog v-if="data" v-model:visible="data.visible" modal :header="data.type" :style="{ width: '50vw' }">
      <div id="help_div" class="centerdiv" style="direction:ltr">
        <Carousel :value="data.pages" :numVisible="1">
          <template #item="ipage">
            <div class="intro_div">
              <span>{{ ipage.data.title }}</span>
              <img v-if="ipage.data.image" :src="base_img_url + ipage.data.image" class="help_page_image"/>
              <br/><br/>
              <span>{{ ipage.data.text }}</span>
            </div>
          </template>
        </Carousel>
      </div>
    </Dialog>
</template>

<script>
export default {
    name: 'Help'
};
</script>

<style>
span.p-dialog-title {width:100%;text-align:center;}
img.help_page_image {max-width:90%;max-height: 90%;}
/*li.p-carousel-indicator > *  {background-color: #396672 !important;} */
</style>
