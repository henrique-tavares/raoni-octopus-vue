<template>
  <VForm
    ref="userForm"
    class="relative grid grid-cols-[1fr_4fr] items-start gap-4 p-2 text-sm [&>*]:max-w-[1000px] [&>hr]:max-w-none [&>label]:justify-self-end [&>label]:py-2"
    @submit="onSubmit"
    v-slot="{ setFieldValue }"
    :initial-values="{
      authorized: false
    }"
  >
    <Transition name="fade">
      <div
        v-if="isLoading.user"
        class="absolute inset-0 flex !max-w-none flex-grow items-center justify-center rounded-lg bg-white/50"
      >
        <LoadingSvg class="h-16 w-16 animate-spin text-neutral-700" />
      </div>
    </Transition>
    <Field
      name="id"
      class="hidden"
    />
    <Field
      name="name"
      label="Nome"
      rules="required"
      v-slot="{ field, errorMessage }"
    >
      <label class="required">Nome</label>
      <div class="flex flex-col gap-1">
        <InputComponent
          :field="field"
          placeholder="João Silva"
        />
        <span
          class="text-red-600"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </span>
      </div>
    </Field>
    <hr class="col-span-2" />
    <Field
      name="cpf"
      label="CPF"
      rules="required|cpf"
      v-slot="{ field, errorMessage }"
    >
      <label class="required">CPF</label>
      <div class="flex flex-col gap-1">
        <InputComponent
          v-maska
          data-maska="###.###.###-##"
          :field="field"
          placeholder="000.000.000-00"
        />
        <span
          class="text-red-600"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </span>
      </div>
    </Field>
    <hr class="col-span-2" />
    <Field
      name="email"
      label="Email"
      rules="required|email"
      v-slot="{ field, errorMessage }"
    >
      <label class="required">Email</label>
      <div class="flex flex-col gap-1">
        <InputWithIconComponent :icon="emailIcon">
          <InputComponent
            :field="field"
            placeholder="email@email.com"
          />
        </InputWithIconComponent>
        <span
          class="text-red-600"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </span>
      </div>
    </Field>
    <hr class="col-span-2" />
    <Field
      name="password"
      label="Senha"
      rules="required|min:8"
      v-slot="{ field, errorMessage }"
    >
      <label class="required">Senha</label>
      <div class="flex flex-col gap-1">
        <InputComponent
          :field="field"
          placeholder="********"
          type="password"
        />
        <span
          class="text-red-600"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </span>
      </div>
    </Field>
    <hr class="col-span-2" />
    <Field
      name="age"
      label="Idade"
      rules="required"
      v-slot="{ field, errorMessage }"
    >
      <label class="required">Idade</label>
      <div class="flex flex-col gap-1">
        <InputComponent
          :field="field"
          placeholder="35"
          type="number"
        />
        <span
          class="text-red-600"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </span>
      </div>
    </Field>
    <hr class="col-span-2" />
    <label class="required !py-0">Sexo</label>
    <div class="flex flex-col gap-2">
      <Field
        name="sex"
        label="Sexo"
        rules="required"
        v-slot="{ field }"
      >
        <RadioComponent
          :field="field"
          value="M"
          :checked="field.value == 'M'"
        >
          Masculino
        </RadioComponent>
      </Field>
      <Field
        name="sex"
        v-slot="{ field }"
      >
        <RadioComponent
          :field="field"
          value="F"
          :checked="field.value == 'F'"
        >
          Feminino
        </RadioComponent>
      </Field>
      <ErrorMessage
        name="sex"
        class="text-red-600"
      />
    </div>
    <hr class="col-span-2" />
    <label>Telefones</label>
    <div class="flex flex-col gap-4">
      <FieldArray
        name="phones"
        v-slot="{ fields, push, remove }"
      >
        <div
          v-for="(entry, i) in fields"
          :key="entry.key"
          class="flex items-center gap-3"
        >
          <Field
            :name="`phones[${i}]`"
            v-slot="{ field }"
          >
            <InputComponent
              :field="field"
              type="tel"
              v-maska
              data-maska="(##) #####-####"
              placeholder="(00) 00000-0000"
              class="flex-grow"
            />
          </Field>
          <button
            type="button"
            @click="remove(i)"
          >
            <TrashSvg class="h-5 w-5 text-red-600" />
          </button>
        </div>
        <ButtonComponent
          class="self-start border border-sky-600 px-4 py-2 text-sm text-sky-600 hover:bg-sky-50"
          @click="push('')"
        >
          Add
        </ButtonComponent>
      </FieldArray>
    </div>
    <hr class="col-span-2" />
    <Field
      name="address"
      label="Logradouro"
      rules="required"
      v-slot="{ field, errorMessage }"
    >
      <label class="required">Logradouro</label>
      <div class="flex flex-col gap-1">
        <InputComponent
          :field="field"
          placeholder="Av. Tunico e Tinoco"
        />
        <span
          class="text-red-600"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </span>
      </div>
    </Field>
    <hr class="col-span-2" />
    <Field
      name="complement"
      v-slot="{ field }"
    >
      <label>Complemento</label>
      <InputComponent
        :field="field"
        placeholder="Lote 15"
      />
    </Field>
    <hr class="col-span-2" />
    <Field
      name="cep"
      label="CEP"
      rules="required|cep"
      v-slot="{ field, errorMessage }"
    >
      <label class="required">CEP</label>
      <div class="flex flex-col gap-1">
        <InputComponent
          v-maska
          data-maska="#####-###"
          :field="field"
          placeholder="00000-000"
        />
        <span
          class="text-red-600"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </span>
      </div>
    </Field>
    <hr class="col-span-2" />
    <label class="required">Estado</label>
    <Field
      name="state"
      label="Estado"
      rules="required"
      v-slot="{ field, errorMessage }"
    >
      <div class="flex flex-col gap-1">
        <SelectComponent
          @change="() => {
            handleChangeState(field.value as number);
              setFieldValue('city', undefined)
            }"
          :field="field"
          :options="statesAsOptions"
          :disabled="isLoading.states"
        />
        <span
          class="text-red-600"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </span>
      </div>
    </Field>
    <hr class="col-span-2" />
    <label class="required">Cidade</label>
    <Field
      name="city"
      label="Cidade"
      rules="required"
      v-slot="{ field, errorMessage }"
    >
      <div class="flex flex-col gap-1">
        <SelectComponent
          :field="field"
          :options="citiesAsOptions"
          :disabled="isLoading.cities"
        />
        <span
          class="text-red-600"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </span>
      </div>
    </Field>
    <hr class="col-span-2" />
    <label class="self-start">Descrição</label>
    <Field
      name="description"
      v-slot="{ field }"
    >
      <TextareaComponent
        :field="field"
        rows="5"
        placeholder="Descrição sobre João"
      />
    </Field>
    <hr class="col-span-2" />
    <Field
      name="authorized"
      v-slot="{ field }"
      type="checkbox"
      :unchecked-value="false"
      :value="true"
    >
      <label>Permissão</label>
      <div class="py-2">
        <CheckboxComponent
          :field="field"
          :value="true"
        >
          Autorizado
        </CheckboxComponent>
      </div>
    </Field>
    <hr class="col-span-2" />
    <div class="col-span-2 flex flex-row items-center justify-center gap-4">
      <ButtonComponent
        type="submit"
        class="bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-600"
      >
        Submit
      </ButtonComponent>
      <ButtonComponent
        type="reset"
        class="border hover:bg-neutral-100 active:bg-white"
      >
        Reset
      </ButtonComponent>
    </div>
  </VForm>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import { Form, Field, FieldArray, ErrorMessage } from 'vee-validate';
import { vMaska } from 'maska';
import type { City, State, User } from '@/types/api';
import api from '@/api';

import InputComponent from '@/components/form/InputComponent.vue';
import InputWithIconComponent from '@/components/form/InputWithIconComponent.vue';
import RadioComponent from '@/components/form/RadioComponent.vue';
import SelectComponent from '@/components/form/SelectComponent.vue';
import TextareaComponent from '@/components/form/TextareaComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import CheckboxComponent from '@/components/form/CheckboxComponent.vue';

import MailSvg from '@/assets/svg/mail.svg?component';
import TrashSvg from '@/assets/svg/trash.svg?component';
import LoadingSvg from '@/assets/svg/loading.svg?component';

type FormData = {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  password: string;
  age: string;
  sex: 'M' | 'F';
  phones?: string[];
  address: string;
  complement?: string;
  cep: string;
  state: number;
  city: number;
  description?: string;
  authorized: boolean;
};

export default defineComponent({
  components: {
    VForm: Form,
    Field,
    FieldArray,
    InputComponent,
    InputWithIconComponent,
    RadioComponent,
    TrashSvg,
    SelectComponent,
    TextareaComponent,
    ButtonComponent,
    ErrorMessage,
    CheckboxComponent,
    LoadingSvg
  },
  directives: {
    maska: vMaska
  },
  emits: ['submit'],
  data: () => ({
    emailIcon: shallowRef(MailSvg),
    states: [] as State[],
    cities: [] as City[],
    isLoading: {
      states: false,
      cities: false,
      user: false
    }
  }),
  computed: {
    statesAsOptions() {
      return this.states.map((state) => ({
        name: state.name,
        value: state.id
      }));
    },
    citiesAsOptions() {
      return this.cities.map((city) => ({
        name: city.name,
        value: city.id
      }));
    },
    userForm() {
      return this.$refs.userForm as InstanceType<typeof Form>;
    }
  },
  methods: {
    async onSubmit(partialValues: Partial<FormData>) {
      const values = partialValues as FormData;
      const selectedCity = this.cities.find((city) => city.id == values.city)! as City;
      try {
        this.isLoading.user = true;
        await api.user.create({
          id: values.id,
          address: {
            cep: values.cep,
            city: selectedCity,
            place: values.address,
            complement: values.complement
          },
          age: Number(values.age),
          authorized: values.authorized,
          cpf: values.cpf,
          description: values.description ?? '',
          email: values.email,
          name: values.name,
          password: values.password,
          phones: values.phones ?? [],
          sex: values.sex
        });

        this.$emit('submit');
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading.user = false;
      }
    },
    async fillUser(user: User) {
      this.isLoading.user = true;
      this.userForm.setValues({
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
        age: user.age.toString(),
        sex: user.sex,
        phones: user.phones,
        address: user.address.place,
        authorized: user.authorized,
        cep: user.address.cep,
        complement: user.address.complement,
        description: user.description,
        state: user.address.city.state.id
      } as Partial<FormData>);

      await this.handleChangeState(user.address.city.state.id);

      this.userForm.setFieldValue('city', user.address.city.id);
      this.isLoading.user = false;
    },
    async loadStates() {
      try {
        this.isLoading.states = true;
        const res = await api.state.list();
        return res.data;
      } catch (error) {
        console.error(error);
        return [];
      } finally {
        this.isLoading.states = false;
      }
    },
    async loadCities(stateId: number) {
      try {
        this.isLoading.cities = true;
        const res = await api.city.get(stateId);
        return res.data;
      } catch (error) {
        console.error(error);
        return [];
      } finally {
        this.isLoading.cities = false;
      }
    },
    async handleChangeState(stateId: number) {
      this.cities = await this.loadCities(stateId);
    }
  },
  expose: ['fillUser'],
  async mounted() {
    this.states = await this.loadStates();
  }
});
</script>

<style scoped></style>
