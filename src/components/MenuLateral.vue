<template>
  <nav class="menu">
    <h2>Renting</h2>

    <ul>
      <li><router-link to="/">Inicio</router-link></li>

      <li><router-link to="/marcas">Marcas</router-link></li>
      <li><router-link to="/marcas/nueva">Nueva Marca</router-link></li>

      <li><router-link to="/modelos">Modelos</router-link></li>
      <li><router-link to="/modelos/nuevo">Nuevo Modelo</router-link></li>

      <li><router-link to="/vehiculos">Vehículos</router-link></li>
      <li><router-link to="/vehiculos/nuevo">Nuevo Vehículo</router-link></li>

      <li><router-link to="/alquiler">Alquiler</router-link></li>

      <li><router-link to="/clientes">Clientes</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.menu {
  width: 220px;
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  padding: 20px;
}

.menu h2 {
  margin-bottom: 20px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.router-link-active {
  font-weight: bold;
}
</style>
