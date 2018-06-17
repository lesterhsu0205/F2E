<template>
  <div>
    <nav-bar></nav-bar>
    <b-container>
      <b-row class="text-center">
        <b-col cols="3">
          <side-filter></side-filter>
        </b-col>
        <b-col cols="9">
          <b-breadcrumb :items="items"/>
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

  import NavBar from './components/nav-bar'
  import SideFilter from './components/side-filter'

  export default {
    name: 'home',
    components: {NavBar, SideFilter},
    data() {
      return {
        items: [{
          text: 'Admin',
          href: '#'
        }, {
          text: 'Manage',
          href: '#'
        }, {
          text: 'Library',
          active: true
        }]
      }
    }
  }
</script>
