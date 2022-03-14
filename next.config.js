/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
module.exports = removeImports({
images: {
    domains: ['http://151.80.155.65:3000']
  }
});
