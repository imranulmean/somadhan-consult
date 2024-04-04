import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { QBUser } from '@qc/quickblox'

import { createUseComponent, useActions, useForm } from '../../hooks'
import useIsOffLine from '../../hooks/useIsOffLine'
import { validateEmail } from '../../utils/validate'
import { emailLogin, clearAuthError, clearQBError, createAccount } from '../../actionCreators'
import { createMapStateSelector } from '../../utils/selectors'
import {
  authErrorSelector,
  authLoadingSelector,
  qbErrorSelector,
  qbLoadingSelector,
} from '../../selectors'
import { values } from 'lodash'

type FormValues = Required<Pick<QBUser, 'email' | 'password'>>

type FormErrors = Partial<DictionaryByKey<FormValues, string>>

const selector = createMapStateSelector({
  qbError: qbErrorSelector,
  authError: authErrorSelector,
  authLoading: authLoadingSelector,
  qbLoading: qbLoadingSelector,
})

export default createUseComponent(() => {
  const store = useSelector(selector)
  const actions = useActions({ emailLogin, clearAuthError, clearQBError, createAccount })
  const isOffLine = useIsOffLine()
  const location = useLocation() as { state: { referrer?: string } }
  const { qbLoading, authLoading, qbError, authError } = store

  const loading = qbLoading || authLoading
  const error = qbError || authError

  const handleValidate = (values: FormValues) => {
    const errors: FormErrors = {}
    const requiredFields: Array<keyof FormValues> = ['email', 'password']

    requiredFields.forEach((name) => {
      if (!values[name]) errors[name] = 'REQUIRED'
    })

    if (!errors.email && !validateEmail(values.email)) {
      errors.email = 'INVALID_FORMAT'
    }

    return errors
  }

  const handleSubmit = (values: FormValues) => {
    actions.emailLogin(values)
  }

  const handleCreate = (values: FormValues) => {
    const userData = {
      email: values.email,
      password: values.password,
      full_name: values.email ,
      custom_data: {
        address: "null",
        gender: "null",    
    }
  }
    actions.createAccount(userData, () => {
      handleSubmit(userData);
    })    
  }

  const loginForm = useForm<FormValues, FormErrors>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: handleValidate,
    onSubmit: handleSubmit,
  })

  useEffect(
    () => () => {
      actions.clearAuthError()
      actions.clearQBError()
    },
    [],
  )

  return {
    store,
    forms: { loginForm },
    data: {
      isOffLine,
      loading,
      error,
      location,
      handleSubmit,
      handleCreate
    },
    
  }
})
