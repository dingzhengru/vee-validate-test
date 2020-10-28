# vee-validate-test

目前把規則都放 utils/vee-validate.js 中(extend)

## 基本測試

## 測試 Cross Field Validation

- 像是密碼與密碼確認的比較
- 可以用 name 或是 vid 來取目標的值來比較，參考: https://logaretm.github.io/vee-validate/advanced/cross-field-validation.html#targeting-other-fields

## Async Test

- 直接使用 async/await 沒有問題

## Form Handle

- invalid，可用於 submit 按鈕的 disabled 屬性
- handleSubmit，接收 submit 事件
- reset，是重置錯誤訊息，清除欄位則需自行處理

## Available Rules

已寫好可直接使用、引入的規則，參考: https://logaretm.github.io/vee-validate/guide/rules.html  
像是 required、email，這個是填入 validate 的部分，其他屬性還是得自行填入

```js
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  computesRequired: true, //* 會於空值的時候依舊觸發 validate (預設是空值時不會)
  message: 'required: error-message',
});
```

## Validation Provider

所有 slot 參數，參考: https://logaretm.github.io/vee-validate/api/validation-provider.html

## Validation Observer

所有 slot 參數，參考: https://logaretm.github.io/vee-validate/api/validation-observer.html

## Extend

### message

message 可以放方法，且第一參數會是 name

```js
extend('required', {
  ...required,
  computesRequired: true, //* 會於空值的時候依舊觸發 validate (預設是空值時不會)
  message: name => {
    console.log('[message][name]', name);
    return 'required: error-message';
  },
});
```
