import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '@/views/Inicio.vue'
import Marcas from '@/views/Marcas.vue'
import NuevaMarca from '@/views/NuevaMarca.vue'
import Modelos from '@/views/Modelos.vue'
import NuevoModelo from '@/views/NuevoModelo.vue'
import Vehiculos from '@/views/Vehiculos.vue'
import NuevoVehiculo from '@/views/NuevoVehiculo.vue'
import Alquiler from '@/views/Alquiler.vue'
import Clientes from '@/views/Clientes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio,
    },
    {
      path: '/marcas',
      name: 'Marcas',
      component: Marcas,
    },
    {
      path: '/marcas/nueva',
      name: 'NuevaMarca',
      component: NuevaMarca,
    },
    {
      path: '/modelos',
      name: 'Modelos',
      component: Modelos,
    },
    {
      path: '/modelos/nuevo',
      name: 'NuevoModelo',
      component: NuevoModelo,
    },
    {
      path: '/vehiculos',
      name: 'Vehiculos',
      component: Vehiculos,
    },
    {
      path: '/vehiculos/nuevo',
      name: 'NuevoVehiculo',
      component: NuevoVehiculo,
    },
    {
      path: '/alquiler',
      name: 'Alquiler',
      component: Alquiler,
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: Clientes,
    },
  ],
})

export default router
