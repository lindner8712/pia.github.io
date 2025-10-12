<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useRouter } from 'vue-router';
import PanelMenu from 'primevue/panelmenu';

const drawerVisible = ref(false);
const isMobile = ref(false);
const router = useRouter();
// Header-Farbe programmatisch steuerbar
const headerColor = ref('#1976d2'); // Standard: blau

const navigate = (path) => {
  router.push(path);
  if (isMobile.value) drawerVisible.value = false;
};
// Drei Meldezeilen
const statusLines = ref([
  'System ready.',
  'No alerts.',
  'All services running.'
]);

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    command: () => router.push('/dashboard')
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    items: [
      { label: 'Alle Benutzer', command: () => router.push('/users/all') },
      { label: 'Neue Benutzer', command: () => router.push('/users/new') },
    ]
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    items: [
      { label: 'Allgemein', command: () => router.push('/settings/general') },
      { label: 'Sicherheit', command: () => router.push('/settings/security') },
    ]
  },
  {
    label: 'Parameter',icon: 'pi pi-sliders-h',command: () => router.push('/parameter')
  }
];

const tableData = ref([
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' },
  { id: 3, name: 'Charlie', role: 'Manager' },
]);

function toggleDrawer() {
  drawerVisible.value = !drawerVisible.value;
}

function handleResize() {
  isMobile.value = window.innerWidth < 768;
  drawerVisible.value = !isMobile.value; // Desktop: immer sichtbar, Mobile: versteckt
}

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

</script>

<template>
  <div class="layout-container">
    <!-- Drawer -->
    <div 
      class="drawer" 
      :class="{ 'drawer-mobile': isMobile, 'drawer-open': drawerVisible }"
    >
      <PanelMenu :model="menuItems" />
    </div>

    <!-- Overlay für Mobile -->
    <div 
      v-if="isMobile && drawerVisible" 
      class="drawer-overlay" 
      @click="toggleDrawer"
    ></div>

    <!-- Main Content -->
    <div class="layout-main">

      <!-- Header -->
      <div class="app-header" :style="{ backgroundColor: headerColor }">
        <div class="header-title">
          <h1>Vue Demo Seite</h1>
        </div>
        <div class="header-status">
          <div v-for="(line, index) in statusLines" :key="index" class="status-line">
            {{ line }}
          </div>
        </div>
      </div>

      <!-- Mobile Toggle -->
      <Button 
        v-if="isMobile" 
        label="Menu" 
        icon="pi pi-bars" 
        class="mb-3" 
        @click="toggleDrawer" 
      />
        <router-view />

    </div>
  
  </div>
  </template>

<style>

body, html, .layout-container, .layout-main, .drawer, .app-header, .p-button, .p-datatable {
  font-family: 'Inter', sans-serif;
}

/* Optional: einheitliche Textfarbe */
body {
  color: #212121; /* dunkles Grau für Material-typische Lesbarkeit */
}

/* Header */
.app-header {
  font-weight: 500; /* etwas stärker für Titel */
}

/* Drawer Menu */
.drawer .p-menu .p-menuitem-link {
  font-weight: 400;
}

/* Buttons */
.p-button {
  font-weight: 500;
  text-transform: none; /* keine Großbuchstaben, Material-Look */
}

/* Tabellen */
.p-datatable {
  font-weight: 400;
  font-size: 0.95rem;
}

/* Status Lines im Header */
.status-line {
  font-weight: 400;
  font-size: 0.85rem;
}

/* Optional: kleine Anpassung für Mobile */
@media (max-width: 767px) {
  .p-button {
    font-size: 0.9rem;
  }
  .status-line {
    font-size: 0.8rem;
  }
}




.layout-container {
  display: flex;
  height: 100vh;
  background-color: #f4f4f4;
  position: relative;
  flex-direction: row;
}

/* Drawer */
.drawer {
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #ddd;
  padding: 1rem;
  box-sizing: border-box;
  transition: transform 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1000;
}

/* Mobile Drawer */
.drawer-mobile {
  transform: translateX(-100%);
}

.drawer-open.drawer-mobile {
  transform: translateX(0);
}

/* Overlay für Mobile */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 900;
}

/* Main Content */
.layout-main {
  flex: 1;
  padding: 1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-left: 250px; /* Platz für Desktop Drawer */
  transition: margin-left 0.3s ease;
}

/* Desktop: kein Overlay */
@media(max-width: 767px) {
  .layout-main {
    margin-left: 0;
  }
}

/* Header */
.app-header {
  width: 100%;
  color: white;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.header-title h1 {
  margin: 0;
  font-size: 1.5rem;
}

.header-status {
  margin-top: 0.5rem;
}

.status-line {
  font-size: 0.9rem;
}

/* Controls & Table */
.mb-3 { margin-bottom: 1rem; }
.mr-2 { margin-right: 0.5rem; }
</style>
