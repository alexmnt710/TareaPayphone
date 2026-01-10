<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4" :style="{ color: 'var(--p-primary-600)' }">
      <Icon icon="mdi:form-select" width="36" height="36" :style="{ color: 'var(--p-primary-500)', verticalAlign: 'middle' }" />
      Ejemplos de Formularios
    </h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Formulario Básico -->
      <Card>
        <template #title>
          <span :style="{ color: 'var(--p-primary-600)' }">Formulario Básico</span>
        </template>
        <template #content>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-semibold">Nombre</label>
              <InputText v-model="formData.name" placeholder="Ingrese su nombre" class="w-full" />
            </div>
            
            <div>
              <label class="block mb-2 font-semibold">Email</label>
              <InputText v-model="formData.email" type="email" placeholder="email@ejemplo.com" class="w-full" />
            </div>
            
            <div>
              <label class="block mb-2 font-semibold">Mensaje</label>
              <Textarea v-model="formData.message" rows="4" placeholder="Escriba su mensaje" class="w-full" />
            </div>
            
            <Button 
              label="Enviar" 
              icon="pi pi-send" 
              @click="submitForm"
              :style="{ backgroundColor: 'var(--p-primary-500)', borderColor: 'var(--p-primary-500)' }"
            />
          </div>
        </template>
      </Card>

      <!-- Formulario con Selects -->
      <Card>
        <template #title>
          <span :style="{ color: 'var(--p-primary-600)' }">Selects y Dropdowns</span>
        </template>
        <template #content>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-semibold">País</label>
              <Select v-model="formData.country" :options="countries" optionLabel="name" placeholder="Seleccione un país" class="w-full" />
            </div>
            
            <div>
              <label class="block mb-2 font-semibold">Ciudad</label>
              <Select v-model="formData.city" :options="cities" placeholder="Seleccione una ciudad" class="w-full" />
            </div>
            
            <div>
              <label class="block mb-2 font-semibold">Fecha</label>
              <DatePicker v-model="formData.date" showIcon placeholder="Seleccione una fecha" class="w-full" />
            </div>
            
            <div class="flex items-center gap-2">
              <Checkbox v-model="formData.terms" :binary="true" inputId="terms" />
              <label for="terms">Acepto los términos y condiciones</label>
            </div>
          </div>
        </template>
      </Card>

      <!-- Formulario con Switches y Ratings -->
      <Card>
        <template #title>
          <span :style="{ color: 'var(--p-primary-600)' }">Controles Avanzados</span>
        </template>
        <template #content>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-semibold">Notificaciones</label>
              <ToggleSwitch v-model="formData.notifications" />
            </div>
            
            <div>
              <label class="block mb-2 font-semibold">Calificación</label>
              <Rating v-model="formData.rating" :cancel="false" />
            </div>
            
            <div>
              <label class="block mb-2 font-semibold">Nivel de Experiencia</label>
              <Slider v-model="formData.experience" class="w-full" />
              <div class="text-sm text-center mt-2">Valor: {{ formData.experience }}</div>
            </div>
            
            <div>
              <label class="block mb-2 font-semibold">Categorías</label>
              <MultiSelect 
                v-model="formData.categories" 
                :options="categories" 
                placeholder="Seleccione categorías" 
                class="w-full" 
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- Formulario con Chips -->
      <Card>
        <template #title>
          <span :style="{ color: 'var(--p-primary-600)' }">Tags y Chips</span>
        </template>
        <template #content>
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-semibold">Etiquetas</label>
              <Chips v-model="formData.tags" placeholder="Agregar etiqueta" class="w-full" />
            </div>
            
            <div>
              <label class="block mb-2 font-semibold">Colores Favoritos</label>
              <div class="flex gap-2 flex-wrap">
                <Chip 
                  v-for="color in selectedColors" 
                  :key="color" 
                  :label="color" 
                  removable 
                  @remove="removeColor(color)"
                  :style="{ backgroundColor: 'var(--p-primary-100)', color: 'var(--p-primary-700)' }"
                />
              </div>
              <Button 
                label="Agregar Color" 
                size="small" 
                text 
                @click="addColor"
                class="mt-2"
              />
            </div>
            
            <div>
              <label class="block mb-2 font-semibold">Vista Previa de Datos</label>
              <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useAlerts } from '@/composables/Alerts/alertsPrime';

const alerts = useAlerts();

const formData = ref({
  name: '',
  email: '',
  message: '',
  country: null,
  city: '',
  date: null,
  terms: false,
  notifications: false,
  rating: 0,
  experience: 50,
  categories: [],
  tags: []
});

const countries = ref([
  { name: 'Ecuador', code: 'EC' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Perú', code: 'PE' },
  { name: 'México', code: 'MX' }
]);

const cities = ref(['Quito', 'Guayaquil', 'Cuenca', 'Manta', 'Portoviejo']);

const categories = ref(['Tecnología', 'Deportes', 'Música', 'Arte', 'Ciencia', 'Literatura']);

const selectedColors = ref(['Rojo', 'Azul', 'Verde']);

function submitForm() {
  alerts.showToast('success', 'Formulario Enviado', 'Los datos se han procesado correctamente');
  console.log('Datos del formulario:', formData.value);
}

function addColor() {
  const colors = ['Amarillo', 'Naranja', 'Morado', 'Rosa', 'Negro', 'Blanco'];
  const availableColors = colors.filter(c => !selectedColors.value.includes(c));
  if (availableColors.length > 0) {
    selectedColors.value.push(availableColors[0]);
  }
}

function removeColor(color: string) {
  selectedColors.value = selectedColors.value.filter(c => c !== color);
}
</script>
