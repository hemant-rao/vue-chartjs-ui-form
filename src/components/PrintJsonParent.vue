<template>
  <div class="col-12 p-0">
    <h4>
      <strong>{{ dataTitle }}</strong>
    </h4>
    <div class="col-12 p-0 bg-light json-viewer-height">
      <!-- <h2>Limits output to 1000 nested nodes</h2> -->
      <!-- <JsonTree :depth="1000" expanded :data-object="completeJsonData" />
          <pre>{{ typeof completeJsonData }}: {{ completeJsonData }}</pre> -->
      <!-- <h2>Print all nodes as expanded</h2> -->
      <div class="col-12 p-2">
        <JsonTree :depth="1000" :data-object="completeJsonData" expanded />
      </div>
    </div>
    <div class="col-12 raw-json-bg raw-json-parent p-2">
      <p><strong>Raw JSON</strong></p>
      <div class="col-12 p-0 json-viewer-height">
        <pre>{{ typeof completeJsonData }}: {{ completeJsonData }}</pre>
      </div>
    </div>
    <!-- <h2>Uses a JSON string value</h2>
          <JsonTree :data-string="exampleDataString" />
          <pre>{{ typeof exampleDataString }}: {{ exampleDataString }}</pre> -->
  </div>
</template>

<script>
import JsonTree from "./JsonTree.vue";
export default {
  props: {
    printJsonData: {
      type: Object,
      default() {},
    },
    dataTitle: {
      type: String,
      default() {
        return "";
      },
    },
  },
  name: "printJsonParent",
  components: {
    JsonTree,
  },
  data() {
    return {
      hidden: false,
      completeJsonData: this.printJsonData ? this.printJsonData : {},
    };
  },
  watch: {
    printJsonData: {
      handler(newVal) {
        this.completeJsonData = { ...newVal }; // Update local data when prop changes
      },
      deep: true, // Deep watch to catch changes within nested objects
      immediate: true, // Immediate update on initial load
    },
  },
  methods: {
    updateData(value) {
      // console.log("Dfadfasdfsdafsdaf", value);
      this.$emit("update-data", value); // Emit any changes made in the form
    },
  },
};
</script>

<style>
.raw-json-bg {
  background-color: #eaf4ff;
}
.json-viewer-height {
  height: 550px;
  max-height: 550px;
  overflow: auto;
}
.raw-json-parent {
  text-align: left;
}
</style>
