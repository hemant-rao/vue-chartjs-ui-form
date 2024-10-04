<template>
  <div class="col-12 p-0">
    <!-- printJsonData {{ completeJsonData }} -->
    <h6>
      <strong>{{ dataTitle }}</strong>
    </h6>
    <div class="col-12 p-0 bg-light json-viewer-height">
      <div
        class="col-12 p-2"
        v-if="
          completeJsonData &&
          completeJsonData.labels &&
          completeJsonData.labels.length
        "
      >
        <JsonFormComponentData
          v-if="dataTitle === 'Chart Data'"
          :depth="1000"
          :data-object="completeJsonData"
          expanded
          @update-data="updateData"
        />
      </div>
      <div class="col-12 p-2" v-if="completeJsonData.indexAxis">
        <JsonFormComponent
          v-if="dataTitle !== 'Chart Data'"
          :depth="1000"
          :data-object="completeJsonData"
          expanded
          @update-data="updateData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import JsonFormComponentData from "./JsonFormComponentData.vue";
import JsonFormComponent from "./JsonFormComponent.vue";
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
  name: "JsonFormParent",
  components: {
    JsonFormComponentData,
    JsonFormComponent,
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
      // console.log("JsonFormParent", value);
      this.$emit("update-data", value); // Emit any changes made in the form
    },
  },
};
</script>

<style scoped>
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
/* .raw-json-parent .json-viewer-height {
  height: 550px;
} */
</style>
