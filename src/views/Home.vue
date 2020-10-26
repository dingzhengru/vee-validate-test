<template>
  <div class="home">
    <h1>基本測試</h1>
    <ValidationProvider rules="required|regex:^[a-zA-Z]+[a-zA-Z0-9]*$" v-slot="{ errors }">
      <input v-model="value" type="text" />
      <span>{{ errors[0] }}</span>
    </ValidationProvider>

    <h1>測試 Cross Field Validation (密碼確認)</h1>
    <ValidationProvider name="password" rules="" v-slot="{ errors }">
      <input v-model="password" type="text" />
      <span>{{ errors[0] }}</span>
    </ValidationProvider>

    <ValidationProvider name="password-confirm" rules="password-confirm:@password" v-slot="{ errors }">
      <input v-model="passwordConfirm" type="text" />
      <p>{{ errors[0] }}</p>
    </ValidationProvider>

    <h1>Async Test</h1>
    <ValidationProvider name="password-confirm" rules="async-test" v-slot="{ errors }">
      <input v-model="asyncTest" type="text" />
      <p>{{ errors[0] }}</p>
    </ValidationProvider>

    <h1>Form Handle</h1>
    <ValidationObserver v-slot="{ handleSubmit, reset, invalid }">
      <form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset()">
        <ValidationProvider name="E-mail" rules="required" v-slot="{ errors }">
          <input v-model="value" type="text" />
          <p>{{ errors[0] }}</p>
        </ValidationProvider>

        <button type="submit" :disabled="invalid">Submit</button>
        <button type="reset" @click="onReset">Reset</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '@/utils/vee-validate.js';
export default {
  name: 'Home',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      value: '',
      password: '',
      passwordConfirm: '',
      asyncTest: '',
      email: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    onReset() {
      console.log('reset');
      this.value = '';
    },
  },
};
</script>
