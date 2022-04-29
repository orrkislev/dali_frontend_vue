import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';

import TabMenu from 'primevue/tabmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from "primevue/button";
import Divider from "primevue/divider";
import SplitButton from 'primevue/splitbutton';
import InputSwitch from "primevue/inputswitch";
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup';


export default function initPrimevue(app){
    app.use(PrimeVue);
    app.use(ConfirmationService);

    app.component('Column', Column);
    app.component('DataTable', DataTable);
    app.component('TabMenu', TabMenu);
    app.component('Button', Button);
    app.component('Divider', Divider);
    app.component('SplitButton', SplitButton);
    app.component('InputSwitch', InputSwitch);
    app.component('ConfirmDialog', ConfirmDialog);
    app.component('ConfirmPopup', ConfirmPopup);
}
