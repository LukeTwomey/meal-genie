const fs = require("fs");

module.exports = {
  prettify: function prettify(str) {
    return str.replace(/(-|^)([^-]?)/g, function (_, prep, letter) {
      return (prep && " ") + letter.toUpperCase();
    });
  },
};
