const CookieManager = {
  banner: document.querySelector('.govuk-cookie-banner'),
  buttons: document.querySelectorAll('.govuk-cookie-banner .govuk-button'),
  banner_name: 'cookie_banner_seen',
  preference_name: 'cookie_preferences',
  cookie_preferences: {
    analytics: false,
    seen: false,
    essential: true,
  },
  init: function () {
    if (!this.hasCookie(this.preference_name)) {
      this.setCookie(this.preference_name, this.cookie_preferences, {
        expires: 0,
      });
    }

    const self = this;
    this.buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const userResponse = e.target.value;

        if (e.target.value == 'hide') {
          self.banner.remove();
          return;
        }

        if (self.hasOwnProperty(userResponse)) {
          self[`${userResponse}`](self);
        }
      });
    });
  },

  /**
   * Accept analytical cookies
   */
  accept: (scope) => {
    const value = scope.getCookie(scope.preference_name);
    value.analytics = true;
    value.seen = true;

    scope.setCookie(scope.preference_name, value, { expires: 0 });
    scope.banner
      .querySelector('#cookie-banner-message')
      .setAttribute('hidden', true);
    scope.banner
      .querySelector('#cookie-banner-accept')
      .removeAttribute('hidden');
  },

  /**
   * Reject analytical cookies
   */
  reject: (scope) => {
    const value = scope.getCookie(scope.preference_name);
    value.analytics = false;
    value.seen = true;

    scope.setCookie(scope.preference_name, value, { expires: 0 });
    scope.banner
      .querySelector('#cookie-banner-message')
      .setAttribute('hidden', true);
    scope.banner
      .querySelector('#cookie-banner-reject')
      .removeAttribute('hidden');
  },

  /**
   * Check if a cookie to allow analytics has been set to true
   * @returns {boolean}
   */
  allowAnalytics: () => {
    if (!this.hasCookie(this.cookie_preferences)) {
      return false;
    }

    return (this.getCookie(this.preference_name).analytics = true);
  },

  /**
   * Set a cookie with the given name and value and other optional parameters.
   */
  setCookie: (name, value, options = {}) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    options = {
      path: '/', // add other defaults here if necessary
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  },

  /**
   * Get the value of the cookie with the given name.
   */
  getCookie: (name) => {
    let matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)',
      ),
    );
    return matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
  },

  /**
   * Determine if a cookie with the given name exists.
   */
  hasCookie: (name) => {
    return document.cookie.indexOf(name + '=') !== -1;
  },
};

const UploadManager = {
  init: function () {
    const self = this;
    document.querySelectorAll('.upload').forEach((upload) => {
      console.log(upload);
      upload.addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
          console.log(e.target.result);
          const data = e.target.result;
          const name = e.target.result.name;
          const type = e.target.result.type;
          const size = e.target.result.size;
          const lastModified = e.target.result.lastModified;
          const lastModifiedDate = e.target.result.lastModifiedDate;

          self.uploadFile(
            data,
            name,
            type,
            size,
            lastModified,
            lastModifiedDate,
          );
        });
        reader.readAsDataURL(file);
      });
    });
  },

  uploadFile: function (url, data) {
    const form = new FormData();
    form.append('file', data);

    console.log('Uploading.....');

    fetch(url, {
      method: 'POST',
      body: form,
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },
};

document
  .querySelectorAll('input[type="checkbox"][value="any"]')
  .forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.parentElement.parentElement
        .querySelectorAll('input[type="checkbox"]:not([value="any"])')
        .forEach((child) => {
          child.checked = false;
          child.disabled = true;
        });
    }

    checkbox.addEventListener('change', (e) => {
      const { checked, name, value } = e.target;
      document.querySelectorAll(`input[name="${name}"]`).forEach((checkbox) => {
        if (checkbox.value !== 'any') {
          checkbox.disabled = checked;
          checkbox.checked = false;
        }
      });
    });
  });

CookieManager.init();
UploadManager.init();
