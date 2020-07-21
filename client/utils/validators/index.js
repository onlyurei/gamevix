export default {
  required: value => !!value || 'Required.',
  email: value =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    ) || 'Invalid e-mail.',
  password: value =>
    (value && value.length >= 8) || 'Password must be at least 8 characters.'
}
