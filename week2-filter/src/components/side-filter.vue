<template>
  <div>
    <b-card title="Location">
      <b-form-select v-model="selected" :options="options" class="mb-3"/>
    </b-card>

    <b-card title="Date">
      <b-form-input type="date"></b-form-input>
    </b-card>

    <b-card title="Categories">
      <b-form-group>
        <template slot="label">
          <b>Choose your flavours:</b><br>
          <b-form-checkbox v-model="allSelected"
                           :indeterminate="indeterminate"
                           aria-describedby="flavours"
                           aria-controls="flavours"
                           @change="toggleAll"
          >
            {{ allSelected ? 'Un-select All' : 'Select All' }}
          </b-form-checkbox>
        </template>
        <b-form-checkbox-group id="flavors"
                               stacked
                               v-model="selected"
                               name="flavs"
                               :options="flavours"
                               class="ml-4"
                               aria-label="Individual flavours"
        ></b-form-checkbox-group>
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "side-filter",
    data() {
      return {
        selected: null,
        options: [
          {value: null, text: 'Please select an option'},
          {value: 'a', text: 'This is First option'},
          {value: 'b', text: 'Selected Option'},
          {value: {'C': '3PO'}, text: 'This is an option with object value'},
          {value: 'd', text: 'This one is disabled', disabled: true}
        ],
        flavours: ['Orange', 'Grape', 'Apple', 'Lime', 'Very Berry'],
        selected: [],
        allSelected: false,
        indeterminate: false,

      }
    },
    methods: {
      toggleAll (checked) {
        this.selected = checked ? this.flavours.slice() : []
      }
    },
    watch: {
      selected (newVal, oldVal) {
        // Handle changes in individual flavour checkboxes
        if (newVal.length === 0) {
          this.indeterminate = false
          this.allSelected = false
        } else if (newVal.length === this.flavours.length) {
          this.indeterminate = false
          this.allSelected = true
        } else {
          this.indeterminate = true
          this.allSelected = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
