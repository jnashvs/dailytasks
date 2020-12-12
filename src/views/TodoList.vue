<template>
  <div>
    <v-card class="mx-auto" v-model="dialog" max-width="500">
      <v-toolbar color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>All Tasks</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="primary" dark @click="newItem">
          <v-icon dark>mdi-plus</v-icon>add todo
        </v-btn>

        <!-- modal call -->
        <ModalForm :active="modalstatus" :item="item"></ModalForm>
      </v-toolbar>

      <v-list two-line>
        <template v-for="(item, index) in items">
          <v-list-item :key="item.titulo">
            <template>
              <v-list-item-action>
                <v-checkbox
                  :input-value="item.completed ? 'ctive' : 'inactive'"
                  v-model="item.completed"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content @dblclick="doubleClick(item)">
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle :id="index" v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn class="mx-2" fab dark x-small color="primary" @click="deleteTodo(item.id)">
                  <v-icon dark>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import ModalForm from "../components/ModalForm";

export default {
  name: "TodoList",
  components: {
    ModalForm
  },
  created() {
    this.items = this.$store.getters.all_todos;
  },
  computed: {
    modalstatus() {
      return this.$store.state.modal_active;
    },
    editingstatus() {
      return this.$store.state.editing;
    }
  },
  data() {
    return {
      items: [],
      item: {},
      dialog: false
    };
  },
  methods: {
    newItem() {
      this.item = {
        id: "",
        title: "",
        subtitle: "",
        action: "",
        completed: false
      };
      this.$store.state.modal_active = true;
    },
    doubleClick(item) {
      this.item = item;
      this.$store.state.modal_active = true;
      this.$store.state.editing = true;
    },
    deleteTodo(id){
      this.$store.dispatch("deleteTodo", id);
    }
  }
};
</script>
