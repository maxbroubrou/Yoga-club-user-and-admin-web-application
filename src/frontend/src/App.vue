<template>
  <router-view/>
</template>
  
  <script>
  
  export default {
      name: 'App',
  }
  </script>

  <style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .table-button {
  align-items: center;
  background-clip: padding-box;
  background-color: #ff7043;
  border: 1px solid transparent;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  margin: 0;
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.table-button:hover,
.table-button:focus {
  background-color: #ff7043;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.table-button:hover {
  transform: translateY(-1px);
}

.table-button:active {
  background-color: #c85000;
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}
  </style>