import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';

import TabMenu from 'primevue/tabmenu';
import DataTable from 'primevue/datatable';
import TreeTable from 'primevue/treetable';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';  
import Column from 'primevue/column';
import Button from "primevue/button";
import Divider from "primevue/divider";
import SplitButton from 'primevue/splitbutton';
import InputSwitch from "primevue/inputswitch";
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup';
import Knob from 'primevue/knob';
import Dialog from 'primevue/dialog';
import ToggleButton from 'primevue/togglebutton';
import ProgressBar from 'primevue/progressbar';
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Chart from 'primevue/chart';
import ProgressSpinner from 'primevue/progressspinner';

import BadgeDirective from 'primevue/badgedirective';

export default function initPrimevue(app){
    app.use(PrimeVue);
    app.use(ConfirmationService);

    app.component('Column', Column);
    app.component('DataTable', DataTable);
    app.component('TreeTable', TreeTable);
    app.component('ColumnGroup', ColumnGroup);
    app.component('Row', Row);
    app.component('TabMenu', TabMenu);
    app.component('Button', Button);
    app.component('Divider', Divider);
    app.component('SplitButton', SplitButton);
    app.component('InputSwitch', InputSwitch);
    app.component('ConfirmDialog', ConfirmDialog);
    app.component('ConfirmPopup', ConfirmPopup);
    app.component('Knob', Knob);
    app.component('Dialog', Dialog);
    app.component('ToggleButton', ToggleButton);
    app.component('ProgressBar', ProgressBar);
    app.component('Fieldset', Fieldset);
    app.component('InputText', InputText);
    app.component('Password', Password);
    app.component('Chart', Chart);
    app.component('ProgressSpinner', ProgressSpinner);

    app.directive('badge', BadgeDirective);
}
