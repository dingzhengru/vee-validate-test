import { extend } from 'vee-validate';

//* async-test
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

extend('required', {
  validate: value => {
    if (value) {
      return true;
    }

    return 'required: error-message';
  },
  computesRequired: true, //* 會於空值的時候依舊觸發 validate (預設是空值時不會)
});

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
