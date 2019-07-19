const methods = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'activated',
  'deactivated',
  'beforeDestroy',
  'destroyed',
  'errorCaptured'
];

let lifeMethods = {};

methods.map(method => {
  lifeMethods[method] = function () {
    console.log(`[${method}]`);
  };
});

export default lifeMethods;
