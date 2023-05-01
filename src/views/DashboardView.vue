<template>
  <section class="flex flex-grow flex-col gap-4 overflow-auto bg-slate-100 p-4">
    <div class="flex flex-col divide-y rounded-lg border bg-white shadow-md [&>*]:p-4">
      <span class="text-xl">Cadastro de usuários</span>
      <UserForm
        ref="userForm"
        @submit="handleUserSubmit"
      />
    </div>

    <div class="flex flex-col divide-y rounded-lg border bg-white shadow-md [&>*]:p-4">
      <span class="text-xl">Tabela de usuários</span>
      <UserPagedTable
        ref="userTable"
        @edit="handleEditUser"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import api from '@/api';
import UserPagedTable from '@/components/views/dashboard/UserPagedTable.vue';
import UserForm from '@/components/views/dashboard/UserForm.vue';

export default defineComponent({
  components: {
    UserPagedTable,
    UserForm
  },
  data: () => ({}),
  computed: {
    userTable() {
      return this.$refs.userTable as InstanceType<typeof UserPagedTable>;
    },
    userForm() {
      return this.$refs.userForm as InstanceType<typeof UserForm>;
    }
  },
  methods: {
    async handleEditUser(userId: number) {
      try {
        const res = await api.user.get(userId);
        const user = res.data;
        (this.userForm.$el as HTMLFormElement).scrollIntoView({
          behavior: 'smooth'
        });
        await this.userForm.fillUser(user);
      } catch (error) {
        console.error(error);
      }
    },
    async handleUserSubmit() {
      await this.userTable.reload();
    }
  }
});
</script>

<style scoped></style>
