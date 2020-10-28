import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

//* 已寫好可引入的規則: https://logaretm.github.io/vee-validate/guide/rules.html

//* async-test
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

extend('required', {
  ...required,
  computesRequired: true, //* 會於空值的時候依舊觸發 validate (預設是空值時不會)
  message: name => {
    console.log('[message][name]', name);
    return 'required: error-message';
  },
});

// extend('required', {
//   validate: value => {
//     if (value) {
//       return true;
//     }

//     return 'required: error-message';
//   },
//   computesRequired: true, //* 會於空值的時候依舊觸發 validate (預設是空值時不會)
// });

extend('regex', {
  validate: (value, regex) => {
    if (RegExp(regex).test(value)) {
      return true;
    }

    return 'regex: error-message';
  },
});

extend('password-confirm', {
  params: ['target'],
  validate: (value, { target }) => {
    console.log(value, target);
    if (value === target) {
      return true;
    }

    return 'password-confirm: error-message';
  },
});

extend('async-test', {
  validate: async value => {
    await timeout(3000);
    return `async-test: ${value}`;
  },
});

//* 測試得到此欄位的屬性
extend('server-check', {
  params: ['field'],
  validate: async (value, { field }) => {
    await timeout(2000);
    return `[server-check] ${field}: ${value}`;
  },
});

extend('username-check', {
  params: ['field'],
  validate: async (value, { field }) => {
    await timeout(1000);
    return `[username-check] ${field}: ${value}`;
  },
});

extend('nickname-check', {
  params: ['field'],
  validate: async (value, { field }) => {
    await timeout(1000);
    return `[nickname-check] ${field}: ${value}`;
  },
});
