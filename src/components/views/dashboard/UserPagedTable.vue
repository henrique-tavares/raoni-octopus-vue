<template>
  <Transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="userPage && !loading"
      class="flex flex-col gap-4"
    >
      <VForm
        class="flex w-full max-w-sm flex-row gap-0 self-end"
        ref="searchForm"
        @submit="searchUsers"
      >
        <Field
          name="search"
          v-model="search"
          v-slot="{ field }"
        >
          <InputComponent
            :field="field"
            class="flex-grow rounded-r-none text-sm"
            placeholder="Search"
            rules="required"
          />
        </Field>
        <ButtonComponent
          class="rounded-l-none bg-sky-600"
          type="submit"
        >
          <SearchSvg class="h-4 w-4 text-white" />
        </ButtonComponent>
      </VForm>

      <table class="table-auto border-collapse border-spacing-0 text-left text-neutral-600">
        <thead class="">
          <tr>
            <th class="table-cell">Nome</th>
            <th class="table-cell">Email</th>
            <th class="table-cell">CPF</th>
            <th class="table-cell">Idade</th>
            <th class="table-cell">Sexo</th>
            <th class="table-cell">Autorizado</th>
            <th class="table-cell">Ações</th>
          </tr>
        </thead>
        <tbody v-if="userPage">
          <tr
            v-for="user in userPage.content"
            :key="user.id!"
            class="odd:bg-slate-50"
          >
            <td class="table-cell">{{ user.name }}</td>
            <td class="table-cell">{{ user.email }}</td>
            <td class="table-cell">{{ user.cpf }}</td>
            <td class="table-cell">{{ user.age }}</td>
            <td class="table-cell">{{ user.sex }}</td>
            <td class="table-cell">{{ user.authorized ? 'Sim' : 'Não' }}</td>
            <td class="table-cell">
              <div class="flex items-center gap-2">
                <button @click="$emit('edit', user.id!)">
                  <EditPencilSvg class="h-4 w-4" />
                </button>
                <button @click="deleteUser(user.id!)">
                  <TrashSvg class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="flex flex-row justify-between"
        v-if="userPage"
      >
        <span class="text-xs text-neutral-400">
          Showing {{ elementsOffset + 1 }} to {{ elementsOffset + userPage.numberOfElements }} of
          {{ userPage.totalElements }}
        </span>
        <div class="flex flex-row divide-x rounded-md border text-sky-600">
          <button
            :disabled="userPage.first"
            class="page-button rounded-l-md disabled:bg-neutral-50 disabled:text-neutral-600"
            @click="changePage('prev')"
          >
            <ChevronLeftSvg class="h-4 w-4" />
          </button>
          <button
            v-for="page in getPageRange(userPage.number, userPage.totalPages)"
            :key="page"
            :class="['page-button', page == userPage.number && 'bg-sky-600 text-white']"
            :disabled="page == userPage.number"
            @click="changePage(page)"
          >
            {{ page + 1 }}
          </button>
          <button
            :disabled="userPage.last"
            class="page-button rounded-r-md disabled:bg-neutral-50 disabled:text-neutral-600"
            @click="changePage('next')"
          >
            <ChevronRightSvg class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    <div
      v-else-if="!loadError"
      class="flex justify-center p-4"
    >
      <LoadingSvg class="h-16 w-16 animate-spin text-neutral-700" />
    </div>
    <div
      v-else
      class="flex flex-col items-center text-neutral-700"
    >
      <span>Ocorreu um erro!</span>
      <span>Recarregue a página e tente novamente.</span>
    </div>
  </Transition>
</template>

<script lang="ts">
import api from '@/api';
import type { Page, User } from '@/types/api';
import { defineComponent } from 'vue';
import { Form, Field } from 'vee-validate';

import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/form/InputComponent.vue';

import ChevronLeftSvg from '@/assets/svg/chevron-left.svg?component';
import ChevronRightSvg from '@/assets/svg/chevron-right.svg?component';
import LoadingSvg from '@/assets/svg/loading.svg?component';
import EditPencilSvg from '@/assets/svg/edit-pencil.svg?component';
import TrashSvg from '@/assets/svg/trash.svg?component';
import SearchSvg from '@/assets/svg/search.svg?component';

export default defineComponent({
  components: {
    ChevronLeftSvg,
    ChevronRightSvg,
    LoadingSvg,
    EditPencilSvg,
    TrashSvg,
    VForm: Form,
    Field,
    ButtonComponent,
    InputComponent,
    SearchSvg
  },
  data: () => ({
    userPage: null as Page<User> | null,
    loading: false,
    loadError: false,
    search: ''
  }),
  computed: {
    elementsOffset() {
      if (!this.userPage) {
        return 0;
      }

      return this.userPage.number * this.userPage.size;
    }
  },
  methods: {
    getPageRange(currentPage: number, totalPages: number) {
      const size = Math.min(5, totalPages);

      let start = Math.max(currentPage - 2, 0);
      let end = Math.min(start + size, totalPages - 1);

      const diff = end - start + 1;
      if (diff < size) {
        start = start - (size - diff);
      }

      return Array.from({ length: size }, (_value, index) => index + start);
    },
    async loadUserPage(page: number, search?: string) {
      try {
        this.loading = true;
        const res = await api.user.list(page, search);
        return res.data;
      } catch (error) {
        console.error(error);
        this.loadError = true;
        return null;
      } finally {
        this.loading = false;
      }
    },
    async changePage(page: number | 'next' | 'prev') {
      const handleRelativePage = {
        next: this.userPage!.number + 1,
        prev: this.userPage!.number - 1
      };
      page = typeof page == 'number' ? page : handleRelativePage[page];

      this.userPage = await this.loadUserPage(page, this.search);
    },
    async deleteUser(userId: number) {
      try {
        this.loading = true;
        await api.user.remove(userId);
        this.reload();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async searchUsers() {
      this.userPage = await this.loadUserPage(0, this.search);
    },
    async reload() {
      if (!this.userPage) {
        return;
      }

      this.userPage = await this.loadUserPage(this.userPage.number);
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    edit: (userId: number) => true
  },
  expose: ['reload'],
  async mounted() {
    this.userPage = await this.loadUserPage(0);
  }
});
</script>

<style scoped>
.table-cell {
  @apply border p-2;
}

.page-button {
  @apply flex h-8 w-8 items-center justify-center transition-all disabled:cursor-not-allowed hover:[&:not(:disabled)]:bg-sky-50;
}
</style>
