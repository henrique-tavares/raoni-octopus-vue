<script setup lang="ts">
import { RouterView } from 'vue-router';
import { defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import { cpf } from 'cpf-cnpj-validator';
import ptBR from '@vee-validate/i18n/dist/locale/pt_BR.json';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('cpf', (value: string) => {
  if (!cpf.isValid(value)) {
    return false;
  }

  return true;
});
defineRule('cep', (value: string) => {
  if (!value.match(/\d{5}-\d{3}/)) {
    return false;
  }

  return true;
});

configure({
  generateMessage: localize({
    ptBR: {
      ...ptBR,
      messages: {
        ...ptBR.messages,
        cpf: 'Este cpf é invalido',
        cep: 'Este cep é inválido'
      }
    }
  })
});

setLocale('ptBR');
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      name="fade"
      mode="out-in"
    >
      <component :is="route.meta?.layout ? `${route.meta?.layout}Layout` : 'section'">
        <Transition
          name="fade"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="route.path"
          />
        </Transition>
      </component>
    </Transition>
  </RouterView>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
