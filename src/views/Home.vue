<template>
  <div class="home">
    <h1>基本測試</h1>
    <ValidationProvider name="base-test" rules="required|regex:^[a-zA-Z]+[a-zA-Z0-9]*$" v-slot="{ errors }">
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

    <h1>測試 computed 的 getter & setter</h1>
    <ValidationProvider rules="required" v-slot="{ errors }">
      <input v-model="fullName" type="text" />
      <p>firstName: {{ firstName }} lastName: {{ lastName }}</p>
      <p>{{ errors[0] }}</p>
    </ValidationProvider>

    <h1>測試屬性都用變數填入 & 傳入</h1>
    <ValidationProvider :name="field.name" :rules="field.rules" v-slot="{ errors }">
      <input v-model="field.value" type="text" />
      <p>{{ errors[0] }}</p>
    </ValidationProvider>

    <h1>測試用列表 & v-for</h1>
    <ValidationProvider
      :class="item.class"
      tag="div"
      :name="item.name"
      :rules="item.rules"
      v-slot="{ errors }"
      v-for="item in list"
      :key="item.name"
    >
      <input v-model="item.value" type="text" />
      <p>{{ errors[0] }}</p>
    </ValidationProvider>
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
  computed: {
    fullName: {
      get() {
        if (this.lastName === undefined) {
          return this.firstName;
        }

        return this.firstName + ' ' + this.lastName;
      },
      set(value) {
        const names = value.split(' ');
        console.log(names);
        this.firstName = names[0];
        this.lastName = names.length === 1 ? undefined : names[1];
      },
    },
  },
  data() {
    return {
      value: '',
      password: '',
      passwordConfirm: '',
      asyncTest: '',
      email: '',
      firstName: '',
      lastName: undefined,
      field: {
        name: 'username',
        rules: { required: true, 'server-check': 'username' },
        value: '',
      },
      list: [
        {
          name: 'username',
          rules: { required: true, 'username-check': 'username' },
          class: 'field--username',
        },
        {
          name: 'nickname',
          rules: { required: true, 'nickname-check': 'nickname' },
          class: 'field--nickname',
        },
      ],
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
