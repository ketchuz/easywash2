var app;

app = angular.module('easyWash', ['ngCookies', 'pascalprecht.translate', 'tmh.dynamicLocale', 'ngRoute']);

app.config([
  '$translateProvider', 'tmhDynamicLocaleProvider', function($translateProvider, tmhDynamicLocaleProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('es-MX');
    $translateProvider.useLocalStorage();
    return tmhDynamicLocaleProvider.localeLocationPattern('assets/bower_components/angular-i18n/angular-locale_{{locale}}.js');
  }
]);

var app;

app = angular.module('easyWash');

app.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: './app/+home/home.html',
      controller: 'HomeCtrl'
    }).when('/philosophy', {
      templateUrl: './app/+philosophy/philosophy.html'
    }).when('/company', {
      templateUrl: './app/+company/company.html'
    }).when('/services', {
      templateUrl: './app/+services/services.html'
    }).when('/servicepoints', {
      templateUrl: './app/+service-points/servicePoints.html'
    }).when('/franchise', {
      templateUrl: './app/+franchise/franchise.html'
    }).when('/contact', {
      templateUrl: '../app/+contact/contact.html'
    }).otherwise({
      redirectTo: '/'
    });
    return $locationProvider.html5Mode(false);
  }
]);

var app;

app = angular.module('easyWash');

app.controller('HomeCtrl', [
  '$scope', function($scope) {
    $scope.contact = 'This is an Tommy';
    return $scope.sayHi = function() {
      return alert('hello tomy');
    };
  }
]);

var app;

app = angular.module('easyWash');

app.controller('contactFormCtrl', [
  '$scope', '$http', function($scope, $http) {
    $scope.contact;
    return $scope.sendForm = function(contact) {
      console.log(contact);
      $http.post("https://blueberry-tart-78676.herokuapp.com/sendEmail", {
        myContact: contact
      }).success(function(data, status) {
        return console.log(data);
      });
      alert('Muchas gracias! Pronto nos pondremos en conacto con usted.');
      return $scope.contact = null;
    };
  }
]);

var app;

app = angular.module('easyWash');

app.directive('contactForm', [
  function() {
    return {
      templateUrl: './app/shared/contact/contactForm.html'
    };
  }
]);

var app;

app = angular.module('easyWash');

app.directive('myDirectory', [
  function() {
    return {
      templateUrl: './app/shared/directory/directory.html'
    };
  }
]);

var app;

app = angular.module('easyWash');

app.directive('ngTranslateLanguageSelect', [
  'LocaleService', function(LocaleService) {
    'use strict';
    return {
      restrict: 'A',
      replace: true,
      controller: 'TranslateLanguageSelectCtrl',
      templateUrl: './app/shared/translations/languageSelectTemplate.html'
    };
  }
]);

var app;

app = angular.module('easyWash');

app.service('LocaleService', [
  '$translate', 'LOCALES', '$rootScope', 'tmhDynamicLocale', function($translate, LOCALES, $rootScope, tmhDynamicLocale) {
    var _LOCALES, _LOCALES_DISPLAY_NAMES, checkLocaleIsValid, currentLocale, localesObj, setLocale;
    localesObj = LOCALES.locales;
    _LOCALES = Object.keys(localesObj);
    if (!_LOCALES || _LOCALES.length === 0) {
      console.error('No locales provided');
    }
    _LOCALES_DISPLAY_NAMES = [];
    _LOCALES.forEach(function(locale) {
      return _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
    });
    currentLocale = $translate.proposedLanguage();
    checkLocaleIsValid = function(locale) {
      return _LOCALES.indexOf(locale !== -1);
    };
    setLocale = function(locale) {
      if (!checkLocaleIsValid(locale)) {
        console.error('Locale name ' + locale + ' is invalid');
        return;
      }
      currentLocale = locale;
      return $translate.use(locale);
    };
    $rootScope.$on('$translateChangeSuccess', function(event, data) {
      document.documentElement.setAttribute('lang', data.language);
      return tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
    });
    return {
      getLocaleDisplayName: function() {
        return localesObj[currentLocale];
      },
      setLocaleByDisplayName: function(localeDisplayName) {
        return setLocale(_LOCALES[_LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)]);
      },
      getLocalesDisplayNames: function() {
        return _LOCALES_DISPLAY_NAMES;
      }
    };
  }
]);

var app;

app = angular.module('easyWash');

app.constant('LOCALES', {
  'locales': {
    'es-MX': 'Español',
    'en-US': 'English'
  },
  'preferredLocale': 'es-MX'
});

var app;

app = angular.module('easyWash');

app.controller('TranslateLanguageSelectCtrl', [
  '$scope', 'LocaleService', function($scope, LocaleService) {
    $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
    $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
    $scope.visible = $scope.localesDisplayNames && $scope.localesDisplayNames.length > 1;
    return $scope.changeLanguage = function(locale) {
      return LocaleService.setLocaleByDisplayName(locale);
    };
  }
]);
