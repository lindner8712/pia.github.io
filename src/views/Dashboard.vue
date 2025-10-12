<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-semibold">Assembly EMV Package</h2>
        <p class="text-sm text-gray-500">Freitag, 19. April 2024 · 12:28:15</p>
      </div>
      <div class="text-right">
        <p class="text-gray-600">Auftragsnummer: <strong>12345687</strong></p>
        <p class="text-gray-600">Produkt: <strong>PHEV 8P4G</strong></p>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-3 gap-6">
      <Card>
        <template #title>Aktuelle Schicht</template>
        <Chart type="doughnut" :data="fpyChartData" :options="chartOptions" />
      </Card>

      <Card>
        <template #title>Letzte Schicht</template>
        <Chart type="doughnut" :data="fpyChartData" :options="chartOptions" />
      </Card>

      <Card>
        <template #title>Aktueller Tag</template>
        <Chart type="doughnut" :data="fpyChartData" :options="chartOptions" />
      </Card>
    </div>

    <!-- Tabelle -->
    <Card>
      <template #title>Top 5 NIO nach</template>
      <DataTable :value="[]" class="p-datatable-sm">
        <Column field="station" header="Station" />
        <Column field="prozess" header="Prozess" />
        <Column field="merkmal" header="Merkmal" />
        <Column field="anzahl" header="Anzahl" />
      </DataTable>
      <template #footer>Keine Daten</template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const fpyChartData = ref({
  labels: ['Gut', 'Nacharbeit', 'NIO'],
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: ['#22c55e', '#f97316', '#ef4444'],
      hoverBackgroundColor: ['#16a34a', '#ea580c', '#dc2626']
    }
  ]
})

const chartOptions = ref({
  plugins: {
    legend: {
      position: 'bottom'
    }
  },
  cutout: '70%'
})
</script>