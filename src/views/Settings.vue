<template>
  <div class="app-container">
    <div class="controls">
      <h2>Kontrollen</h2>
      <div class="buttons-grid">
        <Button
          v-for="n in 10"
          :key="n"
          :label="`Button ${n}`"
          class="p-button-raised"
          @click="onButtonClick(n)"
        />
      </div>
    </div>

    <div class="charts">
      <div class="chart-card">
        <h3>Kuchendiagramm A</h3>
        <canvas ref="pieA" width="300" height="300"></canvas>
        <div class="chart-actions">
          <Button label="Randomize A" @click="randomizeA" />
          <Button label="Reset A" class="p-button-secondary" @click="resetA" />
        </div>
      </div>

      <div class="chart-card">
        <h3>Kuchendiagramm B</h3>
        <canvas ref="pieB" width="300" height="300"></canvas>
        <div class="chart-actions">
          <Button label="Randomize B" @click="randomizeB" />
          <Button label="Reset B" class="p-button-secondary" @click="resetB" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Button from 'primevue/button'
import Chart, { Chart as ChartType } from 'chart.js/auto'

// Refs to canvas elements
const pieA = ref<HTMLCanvasElement | null>(null)
const pieB = ref<HTMLCanvasElement | null>(null)

let chartA: ChartType | null = null
let chartB: ChartType | null = null

// Initial datasets
const initialA = [30, 50, 20]
const initialALabels = ['Rot', 'Blau', 'Grün']

const initialB = [10, 40, 25, 25]
const initialBLabels = ['Alpha', 'Beta', 'Gamma', 'Delta']

function createPie(target: HTMLCanvasElement, data: number[], labels: string[]) {
  return new Chart(target, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          // Do not set colors explicitly — Chart.js will use defaults. If you want custom colors, set backgroundColor here.
          // backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
      },
    },
  })
}

onMounted(() => {
  if (pieA.value) chartA = createPie(pieA.value, initialA.slice(), initialALabels)
  if (pieB.value) chartB = createPie(pieB.value, initialB.slice(), initialBLabels)
})

onBeforeUnmount(() => {
  chartA?.destroy()
  chartB?.destroy()
})

function randomizeA() {
  if (!chartA) return
  const len = initialA.length
  chartA.data.datasets![0].data = Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1)
  chartA.update()
}

function resetA() {
  if (!chartA) return
  chartA.data.datasets![0].data = initialA.slice()
  chartA.update()
}

function randomizeB() {
  if (!chartB) return
  const len = initialB.length
  chartB.data.datasets![0].data = Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1)
  chartB.update()
}

function resetB() {
  if (!chartB) return
  chartB.data.datasets![0].data = initialB.slice()
  chartB.update()
}

function onButtonClick(n: number) {
  // Beispielaktion: wechsle/aktualisiere Daten der Diagramme abhängig vom Button
  if (n % 2 === 0) {
    randomizeA()
  } else {
    randomizeB()
  }
}
</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  height: calc(100vh - 2rem);
  box-sizing: border-box;
}

.controls {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
}

.charts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chart-card {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
}

.chart-card canvas {
  width: 100% !important;
  height: 220px !important;
}

.chart-actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.p-button-secondary {
  --pi-button-background: #e0e0e0;
}

@media (max-width: 900px) {
  .app-container {
    grid-template-columns: 1fr;
    height: auto;
  }
  .chart-card {
    height: 320px;
  }
}
</style>