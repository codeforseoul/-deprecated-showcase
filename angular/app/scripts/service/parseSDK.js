'use strict';

angular
  .module('showcaseApp')
    .factory('parseSDK', ['$q', function ($q) {
      // Parse App Key: showcase
      Parse.initialize("Z0hMb4HRaZMuDtEPRwKKI6qq0hr06bpH6PGFaxQL", "pfWLen1gM2ySvmHkVaNpdRzKjUGskPGtr85AuI5Q");

      };
    }]);
