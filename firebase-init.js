// Firebase configuration and initialization
// This file should be loaded after Firebase SDK scripts

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiSDnYJ7ZkPSaWWOJgE2saAvBfvi_7hJQ",
  authDomain: "pickformula.firebaseapp.com",
  projectId: "pickformula",
  storageBucket: "pickformula.firebasestorage.app",
  messagingSenderId: "135057798465",
  appId: "1:135057798465:web:35d58f7d5a2325206f1dc0",
  measurementId: "G-2DTQ8NDYJ5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = firebase.analytics();

console.log('Firebase Analytics initialized successfully');

// Analytics Helper Functions
const AnalyticsTracker = {
  // Track page views
  trackPageView: function(pageName) {
    analytics.logEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
    console.log('Page view tracked:', pageName);
  },

  // Track button clicks
  trackButtonClick: function(buttonName, buttonCategory) {
    analytics.logEvent('button_click', {
      button_name: buttonName,
      button_category: buttonCategory || 'general',
      page_path: window.location.pathname
    });
    console.log('Button click tracked:', buttonName);
  },

  // Track external links
  trackExternalLink: function(linkName, destination) {
    analytics.logEvent('external_link_click', {
      link_name: linkName,
      link_destination: destination,
      page_path: window.location.pathname
    });
    console.log('External link tracked:', linkName, '→', destination);
  },

  // Track navigation
  trackNavigation: function(section) {
    analytics.logEvent('navigation', {
      nav_section: section,
      page_path: window.location.pathname
    });
    console.log('Navigation tracked:', section);
  },

  // Track music releases
  trackReleaseClick: function(releaseName) {
    analytics.logEvent('release_click', {
      release_name: releaseName,
      page_path: window.location.pathname
    });
    console.log('Release click tracked:', releaseName);
  },

  // Track form submissions
  trackFormSubmission: function(formName) {
    analytics.logEvent('form_submission', {
      form_name: formName,
      page_path: window.location.pathname
    });
    console.log('Form submission tracked:', formName);
  },

  // Track catalog item views
  trackCatalogView: function(itemName) {
    analytics.logEvent('catalog_view', {
      item_name: itemName,
      page_path: window.location.pathname
    });
    console.log('Catalog view tracked:', itemName);
  },

  // Track modal opens
  trackModalOpen: function(modalName) {
    analytics.logEvent('modal_open', {
      modal_name: modalName,
      page_path: window.location.pathname
    });
    console.log('Modal open tracked:', modalName);
  }
};
