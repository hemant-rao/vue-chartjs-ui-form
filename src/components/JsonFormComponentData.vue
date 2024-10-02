<template>
  <div
    :class="`data__type data__type--${dataType} data__type--${openClassModifier}`"
  >
    <span
      @click="toggleNode"
      class="mt-1"
      :class="
        !isPrimitive
          ? `data__list-handle data__list-handle--${openClassModifier}`
          : 'data__no-list'
      "
    >
      <span class="data__key">{{ objectKey }}</span>
      <span :class="dataValueClass">{{ dataValue }}</span>
      <span v-if="isPrimitive" class="ms-1" @click.stop="">
        <template v-if="objectKey === 'indexAxis'">
          <select
            :value="dataObject"
            @input="debouncedUpdate($event.target.value)"
            class="form-select"
          >
            <option v-for="option in ['x', 'y']" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </template>
        <template v-else-if="objectKey === 'easing'">
          <select
            :value="dataObject"
            @input="debouncedUpdate($event.target.value)"
            class="form-select"
          >
            <option
              v-for="option in ['linear', 'easeInOutQuad']"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </template>
        <template v-else-if="objectKey === 'position'">
          <select
            :value="dataObject"
            @input="debouncedUpdate($event.target.value)"
            class="form-select"
          >
            <option
              v-for="option in ['top', 'right', 'bottom', 'left']"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </template>
        <template v-else-if="inputTextFieldList.includes(objectKey)">
          <input
            type="text"
            :value="dataObject"
            @input="debouncedUpdate($event.target.value)"
            class="form-control"
          />
        </template>
        <template v-else-if="inputNumberFieldList.includes(objectKey)">
          <input
            type="number"
            :value="dataObject"
            @input="debouncedUpdate($event.target.value)"
            class="form-control"
          />
        </template>
        <template v-else-if="checkboxList.includes(objectKey)">
          <input
            type="checkbox"
            :checked="dataObject"
            @change="debouncedUpdate($event.target.checked)"
            class="form-check-input"
          />
        </template>
        <template v-else-if="inputColorList.includes(objectKey)">
          <input
            type="color"
            :value="dataObject"
            @change="debouncedUpdate($event.target.value)"
            class="form-control form-control-color"
          />
        </template>
        <template v-else>
          <input
            type="text"
            :value="dataObject"
            @input="debouncedUpdate($event.target.value)"
            class="form-control"
          />
        </template>
      </span>
    </span>
    <div
      v-if="isObject || isArray"
      :class="`data__list-items data__list-items--${openClassModifier}`"
    >
      <div v-if="!showDepth">...</div>
      <template v-else>
        <JsonFormComponentData
          v-for="(node, key) in data"
          :key="key"
          :object-key="key"
          :data-object="node"
          :expanded="expanded"
          :depth="depth"
          v-bind:currentDepth="currentDepth"
          @update-data="updateChildData(key, $event)"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "JsonFormComponentData",
  props: {
    dataObject: {
      type: [Object, Array, String, Number, Boolean],
      default: null,
    },
    dataString: {
      type: String,
      default: undefined,
    },
    objectKey: {
      type: [String, Number],
      default: "DATA",
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    depth: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      open: this.expanded,
      currentDepth: 100,
      dropdDownList: ["indexAxis", "easing", "position"],
      inputTextFieldList: ["text", "label"],
      inputNumberFieldList: ["duration", "from", "to", "aspectRatio", "data"],
      checkboxList: [
        "responsive",
        "animation",
        "loop",
        "maintainAspectRatio",
        "display",
        "usePointStyle",
        "enabled",
        "intersect",
        "stacked",
        "display",
        "offset",
        "beginAtZero",
        "fill",
      ],
      inputColorList: ["color", "backgroundColor", "borderColor"],
      debounceTimeout: null, // Timeout for debounce
    };
  },
  created() {
    if (!this.$attrs.currentDepth && this.$attrs.currentDepth !== 0) {
      this.currentDepth = 0;
    } else {
      this.currentDepth = this.$attrs.currentDepth + 1;
    }
  },
  computed: {
    data() {
      if (typeof this.dataObject === "boolean") return this.dataObject;
      if (this.dataObject) {
        return this.dataObject;
      }
      if (this.dataString) {
        try {
          return JSON.parse(this.dataString);
        } catch (error) {
          return `ERROR: ${error.message}`;
        }
      }
      return null;
    },
    dataValue() {
      if (this.isArray) return `Array[${this.data.length}]`;
      if (this.isObject) {
        const objLength = Object.keys(this.data).length;
        return objLength ? "Object" : "Object (empty)";
      }
      return this.primitiveValue;
    },
    primitiveValue() {
      if (this.isNull) return "null";
      return this.data;
    },
    dataType() {
      if (this.isNull) return "null";
      if (this.isObject) return "object";
      if (this.isArray) return "array";
      return typeof this.data;
    },
    isPrimitive() {
      return (
        typeof this.data === "string" ||
        typeof this.data === "number" ||
        typeof this.data === "boolean" ||
        this.isNull
      );
    },
    isObject() {
      return (
        !this.isNull &&
        !this.isUndefined &&
        !Array.isArray(this.data) &&
        typeof this.data === "object"
      );
    },
    isArray() {
      return Array.isArray(this.data);
    },
    isNull() {
      return this.data === null;
    },
    isUndefined() {
      return this.data === undefined;
    },
    dataValueClass() {
      const dataValueClass = ["data__value"];

      if (this.isPrimitive) {
        dataValueClass.push([
          "data__value--primitive",
          `data__value--${this.dataType}`,
        ]);
      }

      if (this.isArray) {
        dataValueClass.push(["data__value--array"]);
      }

      if (this.isObject) {
        dataValueClass.push(["data__value--object"]);
      }

      return dataValueClass;
    },
    openClassModifier() {
      return this.open ? "opened" : "closed";
    },
    showDepth() {
      if (this.currentDepth === 0 || this.depth === 0) return true;
      return this.currentDepth < this.depth;
    },
  },
  methods: {
    toggleNode(e) {
      e.preventDefault();
      if (this.isPrimitive) return;
      this.open = !this.open;
    },
    updateData(value) {
      //   console.log("updateData-value", value);
      this.$emit("update-data", value);
    },
    updateChildData(key, value) {
      // // console.log("updateChildData-value", key, ":", value);
      this.data[key] = value;
      this.$emit("update-data", this.data);
    },
    debouncedUpdate(value) {
      clearTimeout(this.debounceTimeout); // Clear the previous timeout
      this.debounceTimeout = setTimeout(() => {
        this.updateData(value); // Update the data after the delay
      }, 300); // 300ms delay
    },
  },
  watch: {
    data: {
      handler(newValue) {
        this.$emit("update-data", newValue);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
* {
  text-align: left;
}
.data__type {
  position: relative;
  font-family: courier;
  font-size: 1rem;
  white-space: pre;
  text-align: left;
}
span.data__no-list {
  padding-left: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
}
.data__type--opened:before {
  content: "";
  position: absolute;
  height: calc(100% - 1rem);
  top: 8px;
  left: 4.3px;
  border-left: 1px dotted #ccc;
}
.data__key {
  color: sandybrown;
  display: inline-block;
  padding-right: 0.5rem;
}
.data__key:after {
  content: ":";
  color: #666;
}
.data__value--string {
  color: darkseagreen;
}
.data__value--string:before,
.data__value--string:after {
  content: '"';
  color: #666;
}
.data__value--number {
  color: royalblue;
}
.data__value--boolean {
  color: violet;
}
.data__value--null {
  color: #ccc;
}
.data__value--object,
.data__value--array {
  color: #666;
}
.data__list-handle:before {
  content: "";
  height: 0;
  border-style: solid;
  border-width: 0.35rem 0.55rem;
  border-color: transparent transparent transparent #666;
  display: inline-block;
  vertical-align: middle;
}
.data__list-handle--opened:before {
  transform: rotate(90deg) translate3d(0.25rem, 0.25rem, 0);
}
.data__list-handle:hover {
  cursor: pointer;
}
.data__list-items {
  margin-left: 1.5rem;
  display: none;
}
.data__list-items--opened {
  display: block;
}
</style>
