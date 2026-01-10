// primevue-components.ts

// 1. Core
// PrimeVue config is initialized in `main.ts` to avoid double application

// 2. Botones
import Button from 'primevue/button';             // Botón básico :contentReference[oaicite:7]{index=7}
import SplitButton from 'primevue/splitbutton';   // Botón dividido :contentReference[oaicite:8]{index=8}
import ToggleButton from 'primevue/togglebutton'; // Botón de alternancia :contentReference[oaicite:9]{index=9}
import ButtonGroup from 'primevue/buttongroup';   // Grupo de botones :contentReference[oaicite:10]{index=10}

// 3. Menús
import Menu from 'primevue/menu';               // Menú :contentReference[oaicite:11]{index=11}
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';          // Insignia :contentReference[oaicite:11]{index=11}
import Ripple from 'primevue/ripple';          // Efecto ripple :contentReference[oaicite:11]{index=11}
import Menubar from 'primevue/menubar';           // Barra de menús :contentReference[oaicite:11]{index=11}
import ContextMenu from 'primevue/contextmenu';   // Menú contextual :contentReference[oaicite:12]{index=12}
// … continúa con MegaMenu, PanelMenu, TabMenu, TieredMenu, Sidebar, etc. :contentReference[oaicite:13]{index=13}

// 4. Inputs
import InputText from 'primevue/inputtext';       // Campo de texto :contentReference[oaicite:14]{index=14}
import InputNumber from 'primevue/inputnumber';   // Campo numérico :contentReference[oaicite:15]{index=15}
import Password from 'primevue/password';       // Campo de contraseña :contentReference[oaicite:16]{index=16}
import FloatLabel from 'primevue/floatlabel'; // Etiqueta flotante :contentReference[oaicite:16]{index=16}
import IconField from 'primevue/iconfield'; // Campo de icono :contentReference[oaicite:16]{index=16}
import InputIcon from 'primevue/inputicon'; // Icono en campo de texto :contentReference[oaicite:16]{index=16}
// … otros inputs como Password, Calendar, ColorPicker :contentReference[oaicite:16]{index=16}

// 5. Selectores
import Dropdown from 'primevue/dropdown';         // Selector desplegable :contentReference[oaicite:17]{index=17}
import MultiSelect from 'primevue/multiselect';   // Selector múltiple :contentReference[oaicite:18]{index=18}
import Divider from 'primevue/divider';           // Divisor :contentReference[oaicite:18]{index=18}
import Textarea from 'primevue/textarea';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import InputSwitch from 'primevue/inputswitch';
import Rating from 'primevue/rating';
import Slider from 'primevue/slider';
import Chips from 'primevue/chips';
// … otros selectores :contentReference[oaicite:19]{index=19}

// 6. Componentes de datos
import DataTable from 'primevue/datatable';       // Tabla de datos :contentReference[oaicite:20]{index=20}
import Column from 'primevue/column';             // Columna para DataTable :contentReference[oaicite:21]{index=21}
import Toolbar from 'primevue/toolbar';           // Barra de herramientas :contentReference[oaicite:22]{index=22}
// … otros como Paginator, TreeTable :contentReference[oaicite:22]{index=22}

// 7. Feedback
import Toast from 'primevue/toast';               // Notificaciones toasty :contentReference[oaicite:23]{index=23}
import ToastService from 'primevue/toastservice'; // Servicio de notificaciones :contentReference[oaicite:23]{index=23}
import ProgressSpinner from 'primevue/progressspinner'; // Indicador de carga :contentReference[oaicite:24]{index=24}
import Splitter from 'primevue/splitter';         // Divisor :contentReference[oaicite:24]{index=24}
// … Feedback adicional :contentReference[oaicite:25]{index=25}

// 8. Overlay y misceláneos
import Dialog from 'primevue/dialog';             // Diálogos modales :contentReference[oaicite:26]{index=26}
import ConfirmDialog from 'primevue/confirmdialog'; // Diálogo de confirmación :contentReference[oaicite:26]{index=26}
import ConfirmPopup from 'primevue/confirmpopup'; // Ventana emergente de confirmación :contentReference[oaicite:26]{index=26}
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';           // Tooltips :contentReference[oaicite:27]{index=27}
import Chip  from 'primevue/chip';
// … Inplace, OverlayPanel, Card, Divider, Timeline, Fieldset :contentReference[oaicite:28]{index=28}

import type { App } from 'vue';

export default {
  install(app: App) {
    // PrimeVue is initialized in main.ts (do NOT call app.use(PrimeVue) here)

    // Register global components and directives
    app
      // Botones
      .component('Button', Button)
      .component('Avatar', Avatar)
      .component('Badge', Badge)
      .directive('ripple', Ripple)
      .component('SplitButton', SplitButton)
      .component('ToggleButton', ToggleButton)
      .component('ButtonGroup', ButtonGroup)

      // Menús
      .component('Menu', Menu)
      .component('Menubar', Menubar)
      .component('ContextMenu', ContextMenu)

      // Inputs
      .component('InputText', InputText)
      .component('InputNumber', InputNumber)
      .component('Password', Password)
      .component('FloatLabel', FloatLabel)
      .component('IconField', IconField)
      .component('InputIcon', InputIcon)
      .component('Textarea', Textarea)

      // Selectores
      .component('Dropdown', Dropdown)
      .component('Select', Dropdown) // Alias used in views
      .component('MultiSelect', MultiSelect)
      .component('Divider', Divider)

      // Componentes de datos
      .component('DataTable', DataTable)
      .component('Column', Column)
      .component('Toolbar', Toolbar)

      // Feedback
      .component('Toast', Toast)
      .component('ProgressSpinner', ProgressSpinner)
      .component('Splitter', Splitter)

      // UI auxiliares
      .component('Card', Card)
      .component('DatePicker', Calendar) // Alias for Calendar
      .component('Checkbox', Checkbox)
      .component('ToggleSwitch', InputSwitch) // Alias for InputSwitch
      .component('Rating', Rating)
      .component('Slider', Slider)
      .component('Chips', Chips)
      .component('Chip', Chip)

      // Otros
      .component('Dialog', Dialog);

    // Register services and directives separately
    app.use(ToastService);
    app.component('ConfirmDialog', ConfirmDialog);
    app.component('ConfirmPopup', ConfirmPopup);
    app.use(ConfirmationService);
    app.directive('tooltip', Tooltip);
  }
};
