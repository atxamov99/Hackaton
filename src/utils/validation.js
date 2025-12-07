export const isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const isPhone = (phone) => {
  const regex = /^\+998[0-9]{9}$/
  return regex.test(phone)
}

export const isPassword = (password) => {
  return password.length >= 6
}

export const isRequired = (value) => {
  return value !== undefined && value !== null && value !== ''
}

export const minLength = (value, min) => {
  return value.length >= min
}

export const maxLength = (value, max) => {
  return value.length <= max
}

export const validateForm = (values, rules) => {
  const errors = {}

  Object.keys(rules).forEach((field) => {
    const value = values[field]
    const fieldRules = rules[field]

    fieldRules.forEach((rule) => {
      if (errors[field]) return

      if (rule.required && !isRequired(value)) {
        errors[field] = rule.message || `${field} is required`
      }
      if (rule.email && !isEmail(value)) {
        errors[field] = rule.message || 'Invalid email format'
      }
      if (rule.minLength && !minLength(value, rule.minLength)) {
        errors[field] = rule.message || `Minimum ${rule.minLength} characters required`
      }
      if (rule.maxLength && !maxLength(value, rule.maxLength)) {
        errors[field] = rule.message || `Maximum ${rule.maxLength} characters allowed`
      }
      if (rule.custom && !rule.custom(value, values)) {
        errors[field] = rule.message || 'Invalid value'
      }
    })
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
