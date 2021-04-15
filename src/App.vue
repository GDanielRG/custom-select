<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div class="w-64">
      <ui-select
        :options="options"
        :invalid="invalid"
        error="Something went wrong"
        v-model="myValue"
        placeholder="Select an option"
        label="Some label"
        cornerHint="optional"
        help="Some text to help"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      myValue: "",
    };
  },
  computed: {
    options() {
      return [
        { value: 1, text: "First option" },
        { value: 2, text: "Second option" },
        { value: 3, text: "Third option" },
        { value: 4, text: "Fourth option" },
      ];
    },
    invalid() {
      return this.myValue == this.options[2];
    },
  },
};
</script>
