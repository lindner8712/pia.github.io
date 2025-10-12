<template>
  <div class="p-4">
    <h2>Rezepturverwaltung</h2>
    <DataTable :value="recipe" class="p-datatable-gridlines editable-table">
      <Column field="name" header="Parameter" />
      <Column field="type" header="Typ" />
      <Column header="Wert">
        <template #body="slotProps">
          <component
            :is="getEditorComponent(slotProps.data.type)"
            v-model="slotProps.data.value"
            
            :mode="slotProps.data.type === 'LREAL' ? 'decimal' : undefined"
            :step="slotProps.data.type === 'LREAL' ? 0.1 : undefined"
            :showButtons="slotProps.data.type === 'LREAL'"
            :minFractionDigits="2"
          />
        </template>
      </Column>
      <Column field="unit" header="Einheit" />
    </DataTable>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import ToggleSwitch  from 'primevue/toggleswitch'

// Beispielhafte Rezeptur (würde sonst als JSON empfangen)
const recipe = ref([
  { name: 'Speed', type: 'LREAL', value: 1200.5, unit: 'mm/s' },
  { name: 'Active', type: 'BOOL', value: true },
  { name: 'RecipeName', type: 'STRING', value: 'Standard A' },
])

function getEditorComponent(type: string) {
  switch (type) {
    case 'BOOL': return ToggleSwitch
//    case 'ENUM' : return Select
    case 'LREAL': return InputNumber
    case 'STRING': return InputText
    default: return InputText
  }
}

</script>

<style scoped>
.editable-table :deep(td) {
  vertical-align: middle;
}
</style>
