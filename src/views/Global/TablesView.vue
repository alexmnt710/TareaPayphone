<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4" :style="{ color: 'var(--p-primary-600)' }">
      <Icon icon="mdi:table" width="36" height="36" :style="{ color: 'var(--p-primary-500)', verticalAlign: 'middle' }" />
      Ejemplos de Tablas
    </h1>
    
    <div class="space-y-4">
      <!-- Tabla Básica -->
      <Card>
        <template #title>
          <span :style="{ color: 'var(--p-primary-600)' }">Tabla con Datos de Ejemplo</span>
        </template>
        <template #content>
          <DataTable :value="products" stripedRows tableStyle="min-width: 50rem">
            <Column field="id" header="ID" sortable :style="{ color: 'var(--p-primary-600)' }"></Column>
            <Column field="name" header="Nombre" sortable></Column>
            <Column field="category" header="Categoría" sortable></Column>
            <Column field="price" header="Precio" sortable>
              <template #body="slotProps">
                <span :style="{ color: 'var(--p-success-600)', fontWeight: 'bold' }">
                  ${{ slotProps.data.price }}
                </span>
              </template>
            </Column>
            <Column field="stock" header="Stock">
              <template #body="slotProps">
                <Tag 
                  :value="slotProps.data.stock > 10 ? 'En Stock' : 'Bajo'" 
                  :severity="slotProps.data.stock > 10 ? 'success' : 'warn'" 
                />
              </template>
            </Column>
            <Column header="Acciones">
              <template #body>
                <div class="flex gap-2">
                  <Button icon="pi pi-pencil" size="small" text @click="editProduct" />
                  <Button icon="pi pi-trash" size="small" text severity="danger" @click="deleteProduct" />
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>

      <!-- Tabla con Filtros -->
      <Card>
        <template #title>
          <span :style="{ color: 'var(--p-primary-600)' }">Tabla con Filtros y Paginación</span>
        </template>
        <template #content>
          <DataTable 
            :value="users" 
            v-model:filters="filters"
            :globalFilterFields="['name', 'email', 'role']"
            paginator 
            :rows="5" 
            :rowsPerPageOptions="[5, 10, 20]"
            tableStyle="min-width: 50rem"
          >
            <template #header>
              <div class="flex justify-between">
                <IconField>
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </IconField>
                <Button 
                  label="Agregar Usuario" 
                  icon="pi pi-plus" 
                  :style="{ backgroundColor: 'var(--p-primary-500)', borderColor: 'var(--p-primary-500)' }"
                  @click="addUser"
                />
              </div>
            </template>
            
            <Column field="name" header="Nombre" sortable></Column>
            <Column field="email" header="Email" sortable></Column>
            <Column field="role" header="Rol">
              <template #body="slotProps">
                <Chip 
                  :label="slotProps.data.role" 
                  :style="{ 
                    backgroundColor: getRoleColor(slotProps.data.role), 
                    color: '#fff' 
                  }" 
                />
              </template>
            </Column>
            <Column field="status" header="Estado">
              <template #body="slotProps">
                <Tag 
                  :value="slotProps.data.status" 
                  :severity="slotProps.data.status === 'Activo' ? 'success' : 'danger'" 
                />
              </template>
            </Column>
            <Column header="Acciones">
              <template #body="slotProps">
                <Button icon="pi pi-eye" size="small" text @click="viewUser(slotProps.data)" />
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>

      <!-- Tabla con Selección -->
      <Card>
        <template #title>
          <div class="flex justify-between items-center">
            <span :style="{ color: 'var(--p-primary-600)' }">Tabla con Selección Múltiple</span>
            <Badge :value="selectedItems.length" :style="{ backgroundColor: 'var(--p-primary-500)' }" />
          </div>
        </template>
        <template #content>
          <DataTable 
            :value="items" 
            v-model:selection="selectedItems" 
            dataKey="id"
            tableStyle="min-width: 50rem"
          >
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="code" header="Código" sortable></Column>
            <Column field="name" header="Nombre" sortable></Column>
            <Column field="quantity" header="Cantidad" sortable></Column>
            <Column field="status" header="Estado">
              <template #body="slotProps">
                <ProgressBar 
                  :value="slotProps.data.progress" 
                  :showValue="false"
                  :style="{ height: '8px' }"
                />
              </template>
            </Column>
          </DataTable>
          
          <div v-if="selectedItems.length > 0" class="mt-4">
            <Button 
              label="Procesar Seleccionados" 
              icon="pi pi-check" 
              :badge="String(selectedItems.length)"
              :style="{ backgroundColor: 'var(--p-success-500)', borderColor: 'var(--p-success-500)' }"
              @click="processSelected"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useAlerts } from '@/composables/Alerts/alertsPrime';

const alerts = useAlerts();

const products = ref([
  { id: 1, name: 'Laptop', category: 'Electrónica', price: 999, stock: 15 },
  { id: 2, name: 'Mouse', category: 'Accesorios', price: 25, stock: 50 },
  { id: 3, name: 'Teclado', category: 'Accesorios', price: 75, stock: 8 },
  { id: 4, name: 'Monitor', category: 'Electrónica', price: 299, stock: 20 },
  { id: 5, name: 'Webcam', category: 'Accesorios', price: 89, stock: 5 }
]);

const users = ref([
  { id: 1, name: 'Juan Pérez', email: 'juan@ejemplo.com', role: 'Admin', status: 'Activo' },
  { id: 2, name: 'María García', email: 'maria@ejemplo.com', role: 'Usuario', status: 'Activo' },
  { id: 3, name: 'Carlos López', email: 'carlos@ejemplo.com', role: 'Editor', status: 'Inactivo' },
  { id: 4, name: 'Ana Martínez', email: 'ana@ejemplo.com', role: 'Usuario', status: 'Activo' },
  { id: 5, name: 'Pedro Sánchez', email: 'pedro@ejemplo.com', role: 'Editor', status: 'Activo' }
]);

const items = ref([
  { id: 1, code: 'ITEM-001', name: 'Producto A', quantity: 10, progress: 75 },
  { id: 2, code: 'ITEM-002', name: 'Producto B', quantity: 25, progress: 45 },
  { id: 3, code: 'ITEM-003', name: 'Producto C', quantity: 5, progress: 90 },
  { id: 4, code: 'ITEM-004', name: 'Producto D', quantity: 30, progress: 60 },
  { id: 5, code: 'ITEM-005', name: 'Producto E', quantity: 15, progress: 30 }
]);

const selectedItems = ref([]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

function getRoleColor(role: string) {
  const colors: Record<string, string> = {
    'Admin': 'var(--p-primary-500)',
    'Editor': 'var(--p-secondary-500)',
    'Usuario': 'var(--p-success-500)'
  };
  return colors[role] || 'var(--p-surface-500)';
}

function editProduct() {
  alerts.showToast('info', 'Editar', 'Función de edición');
}

function deleteProduct() {
  alerts.showConfirm('¿Está seguro de eliminar este producto?', {
    danger: true,
    acceptLabel: 'Eliminar',
    rejectLabel: 'Cancelar'
  });
}

function viewUser(user: any) {
  alerts.showToast('info', 'Usuario', `Viendo detalles de ${user.name}`);
}

function addUser() {
  alerts.showToast('success', 'Agregar', 'Función para agregar usuario');
}

function processSelected() {
  alerts.showToast('success', 'Procesado', `Se procesaron ${selectedItems.value.length} elementos`);
  selectedItems.value = [];
}
</script>
