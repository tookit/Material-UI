<template>
  <div class="rule-form">
    <v-form ref="form" lazy-validation v-model="valid">
      <v-card>
        <v-toolbar color="primary" dark>
          {{ formTitle }}
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="formModel.label"
            label="Label"
            :rules="formRules.label"
            required
          ></v-text-field>
          <!-- <v-textarea
            name="input-7-1"
            label="Query"
            v-model="formModel.query"
            hint="Json String"
          ></v-textarea> -->
          <div class="mt-3">
            <ace-editor
              v-model="queryString"
              :fontSize="14"
              width="100%"
              :showPrintMargin="true"
              :showGutter="true"
              :highlightActiveLine="true"
              mode="json"
              theme="monokai"
              name="editor"
              :onChange="handleEditor"
              :editorProps="{ $blockScrolling: true }"
            />
          </div>
          <v-divider></v-divider>
        </v-card-text>

        <v-card-actions class="py-3">
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-4" @click="submitForm">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { createRule, updateRule } from "@/api/service";
import { Ace as AceEditor } from "vue2-brace-editor";

import "brace/mode/json";
import "brace/theme/monokai";
export default {
  name: "RuleForm",
  components: {
    AceEditor
  },
  props: {
    projectId: {
      type: [Number, String],
      default: 0
    },
    ruleId: {
      type: [Number, String],
      default: 0
    },
    origin: {
      type: Object,
      default: null
    }
  },
  watch: {
    ruleId: {
      handler(n, o) {
        if (n !== 0) {
          this.formModel.label = this.origin._source.label;
          this.formModel.query = this.queryString = JSON.stringify(
            this.origin._source.query,
            null,
            "\t"
          );
        } else {
          this.formModel = {
            label: null,
            query: null
          };
          this.queryString = "";
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      valid: true,
      formModel: {
        label: null,
        query: null
      },
      queryString: "",
      formRules: {
        label: [v => !!v || "Label is required"]
      }
    };
  },
  computed: {
    formTitle() {
      return this.ruleId === 0 ? "Create Project Rule" : "Edit Project Rule";
    }
  },

  methods: {
    submitForm() {
      //
      if (this.$refs.form.validate()) {
        const data = {
          label: this.formModel.label,
          query: this.queryString ? JSON.parse(this.queryString) : {}
        };
        if (this.ruleId === 0) {
          createRule(this.projectId, data).then(resp => {
            window.ELEPHANT.$emit("SHOW_SNACKBAR", {
              text: "Project rule created",
              color: "success"
            });
            this.$emit("formSuccess");
          });
        } else {
          updateRule(this.projectId, this.ruleId, data).then(resp => {
            this.$emit("formSuccess");
            window.ELEPHANT.$emit("SHOW_SNACKBAR", {
              text: "Project rule updated",
              color: "success"
            });
          });
        }
      }
    },
    handleEditor(val) {
      // this.formModel.query = JSON.parse(val);
      this.queryString = val;
    }
  }
};
</script>
